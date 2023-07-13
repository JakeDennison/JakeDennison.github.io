import { LitElement, html, css } from 'lit';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

class listviewElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-listviewer',
      fallbackDisableSubmit: false,
      description: 'Display a list of records',
      iconUrl: "group-control",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dataobject: {
          type: 'string',
          title: 'DSV Object JSON',
          description: 'Insert the DSV JSON string for your list of records.'
        },
        listURL: {
          type: 'string',
          title: 'List URL',
          description: 'The URL of the list used in the DSV, for this to work you need to ensure ID is returned in the DSV data'
        },
        pageItemLimit: {
          type: 'string',
          enum: ['5', '10', '15', '30', '50', '100'],
          title: 'Page Item Limit',
          description: 'Number of items to show per page',
          defaultValue: '5',
        },
        ignoredKeys:{
          type: 'string',
          title: 'Keys to ignore',
          description: 'Insert a comma separated list of keys to ignore.'
        },
        renamedKeys:{
          type: 'string',
          title: 'Keys to Rename',
          description: 'Use key-value pairs to rename columns separating by colon e.g. oldKey1:newKey1,oldKey2:newKey2'
        },
        dateFormat:{
          type: 'string',
          title: 'Preferred date format',
          description: 'Enter a common data format to set the dates returned accordingly e.g. YYYY-MM-DD HH:mm:ss'
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static styles = css`
    .tabulator-page-size{
      display:inline-block;
      margin: 5px;
      padding: 8px 12px;
      border:1px solid #dee2e6;
      border-radius:3px;
    }
    /* Custom styles for the filter bar */
    #filter-value {
      padding: 4px;
      border: 1px solid #000;
      border-radius: 4px;
    }

    #filter-field {
      padding: 4px;
      border: 1px solid #000;
      border-radius: 4px;
    }

    .fltr-btn {
      padding: 4px 8px;
      background-color: #999;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .fltr-btn:hover {
      background-color: #666;
    }

    .fltr-btn:active {
      background-color: #666;
    }
    .choices-container {
      display: flex;
      flex-wrap: wrap;
    }

    .choice-pill {
      display: inline-flex;
      align-items: center;
      background-color: #e1e1e1;
      color: #333;
      border-radius: 10px;
      padding: 4px 8px;
      margin-right: 4px;
      margin-bottom: 4px;
      font-size: 12px;
    }
    .neo-lv-table {
      border: 1px solid var(--ntx-form-theme-color-border);
      border-radius: var(--ntx-form-theme-border-radius);
    } 
  `;

  static get properties() {
    return {
      dataobject: { type: String },
      pageItemLimit: { type: Number },
      currentPage: { type: Number },
      listURL: { type: String },
      headersElement: { type: String },
      table: { type: Object },
      keys: { type: Array },
      ignoredKeys: { type: String },
      renamedKeys: { type: String },
      dateFormat: { type: String },
    };
  }

  constructor() {
    super();
    this.dataobject = '';
    this.listURL = '';
    this.pageItemLimit = 5;
    this.currentPage = 0;
    this.table = null;
    this.keys = [];
    this.listdata = [];
    this.ignoredKeys = '';
    this.renamedKeys = '';
    this.dateFormat = '';
  }

  connectedCallback() {
    super.connectedCallback();
  
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/tabulator/5.5.0/css/tabulator_bootstrap5.min.css');  // replace with the actual path to CSS
  
    this.shadowRoot.appendChild(linkElem);
  }
  
  parseDataObject() {
    let tabledata, keys;

    try {
      tabledata = JSON.parse(this.dataobject);
      tabledata = this.replaceUnicodeRegex(tabledata);
      keys = tabledata.length > 0 ? Object.keys(tabledata[0]) : [];
    } catch (e) {
      console.error(e);
      tabledata = null;
      keys = [];
    }

    return { data: tabledata, keys };
  }

  constructUrl(baseUrl, endpoint) {
    return baseUrl.endsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
  }


  replaceUnicodeRegex(input) {
    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    return JSON.parse(JSON.stringify(input).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  preprocessData() {
    // The list of default keys to ignore
    const defaultIgnoredKeys = [
      'FileSystemObjectType',
      'ServerRedirectedEmbedUri',
      'ServerRedirectedEmbedUrl',
      'ComplianceAssetId',
      '_ColorTag',
      'FileLeafRef',
      'GUID',
      'Attachments',
      'OData__UIVersionString'
    ];

    // Convert the ignoredKeys property to an array, removing any whitespace
    const additionalIgnoredKeys = this.ignoredKeys ? this.ignoredKeys.split(',').map(key => key.trim()) : [];

    // Combine the default keys with the ones specified by the property
    const ignoredKeys = defaultIgnoredKeys.concat(additionalIgnoredKeys);

    this.listdata = this.listdata.map((item, index) => {
      // Check if item is null or not an object
      if (!item || typeof item !== 'object') {
        return item;
      }
  
      let newItem = { ...item };

      for (const key of ignoredKeys) {
        delete newItem[key];
      }

      // Handle objects with the "Person" field data structure
      for (const [key, value] of Object.entries(item)) {
        // Check if value is null or not an object
        if (!value || typeof value !== 'object') {
          continue;
        }

        if (Object.keys(value).includes('EMail')) {
          let parentKeyName = key.endsWith('_Email') ? key.slice(0, -6) : key;
          const emailKey = `${parentKeyName}_Email`;
          const usernameKey = `${parentKeyName}_Username`;
          const displayNameKey = `${parentKeyName}_DisplayName`;

          newItem[parentKeyName] = value.EMail; // Replace the parent key field with the email property
          delete newItem[emailKey]; // Remove the _Email field
          delete newItem[usernameKey]; // Remove the _Username field
          delete newItem[displayNameKey]; // Remove the _DisplayName field
        }
      }

      // Handle flat keys ending with "_Email" and delete corresponding "_Id" and "_StringId" keys
      const emailsItem = {};
      for (const [key, value] of Object.entries(item)) {
        if (key.endsWith('_Email')) {
          let name = key.slice(0, -6); // Remove "_Email" to get the name
          emailsItem[name] = value; // Replace the key field with the email value

          // If corresponding "_Id" and "_StringId" keys exist, delete them
          let idKey = `${name}Id`;
          let stringIdKey = `${name}StringId`;
          if (item.hasOwnProperty(idKey)) {
            delete item[idKey];
          }
          if (item.hasOwnProperty(stringIdKey)) {
            delete item[stringIdKey];
          }
        } else {
          emailsItem[key] = value; // Copy other properties to the new object
        }
      }

      // Process each property of the item
      for (const [key, value] of Object.entries(newItem)) {
        // Handle JSON-encoded fields
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          try {
            const jsonObj = JSON.parse(value);
            
            // Handle location field
            if (
              jsonObj.Address &&
              jsonObj.Address.Street &&
              jsonObj.Address.City &&
              jsonObj.Address.CountryOrRegion
            ) {
              newItem[key] = `${jsonObj.Address.Street}, ${jsonObj.Address.City}, ${jsonObj.Address.CountryOrRegion}`;
            }
  
            // Handle image field
            if (jsonObj.serverUrl && jsonObj.serverRelativeUrl) {
              newItem[key] = `<img height="42px" width="42px" src="${jsonObj.serverUrl}${jsonObj.serverRelativeUrl}" alt="Image">`;
            }
          } catch (error) {
            // Invalid JSON, leave the value as it is
          }
        }
  
        // Handle date and time fields
        if (typeof value === 'string') {
          const dateFormat = this.dateFormat;
          let formattedDate = null;

          if (dateFormat) {
            // Check if the value matches the ISO format
            if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
              const date = new Date(value);
              formattedDate = this.formatDate(date, dateFormat);
            }
          }

          if (formattedDate) {
            newItem[key] = formattedDate;
          }
        }

        // Handle hyperlink field
        if (typeof value === 'string') {
          const regex = /^https?:\/\/[^\s,]+, .+$/;
          if (regex.test(value)) {
            const [url, label] = value.split(', ');
            newItem[key] = url; // Store only the URL part
          }
        }
  
      // Handle semicolon-separated values
        if (
          typeof value === 'string' && 
          value.includes(';') &&
          !value.toLowerCase().includes('<div') // Ignore the value if it contains "<div"
        ) {
          const choices = value.split(';').map(choice => choice.trim().replace('#', ''));
          newItem[key] = choices.map(choice => `<span class="choice-pill">${choice}</span>`).join('');
        }
      }
  
      return newItem;
    });
  }
  
  firstUpdated() {
    super.firstUpdated();
  
    // Preprocess the data and rename keys
    const updatedData = this.listdata.map(item => {
      const renamedItem = { ...item };
  
      // Rename the keys based on the this.renamedKeys property
      if (this.renamedKeys) {
        const keyValuePairArray = this.renamedKeys.split(',').map(pair => pair.trim());
        keyValuePairArray.forEach(pair => {
          const [oldKey, newKey] = pair.split(':');
          if (renamedItem.hasOwnProperty(oldKey)) {
            renamedItem[newKey] = renamedItem[oldKey];
            delete renamedItem[oldKey];
          }
        });
      }
  
      return renamedItem;
    });
  
    const { data: tabledata, keys } = this.parseDataObject();
  
    if (!tabledata) {
      console.error('Invalid data object');
      return;
    }
  
    this.keys = keys;
  
    // Preprocess the data
    this.listdata = tabledata.map(item => ({ ...item })); // Make a copy of the tabledata array
  
    this.preprocessData();
  
    // Replace Unicode regex
    const processedData = this.replaceUnicodeRegex(this.listdata);
  
    // Handle formatting
    const columns = Object.keys(processedData[0]).map(key => {
      return {
        title: key,
        field: key,
        formatter: (cell) => {
          const value = cell.getValue();
          if (value === null || value === undefined) {
            return ''; // Return an empty string for null or undefined values
          } else if (typeof value === 'string' && value.startsWith('http')) {
            return html`<a href="${value}" target="_blank">${value}</a>`;
          }
          return value;
        }
      };
    });
  
    const tableDiv = this.shadowRoot.querySelector('#table'); // Get the table div
    tableDiv.classList.add("neo-lv-table");
  
    // Keep a reference to the Tabulator instance
    this.table = new Tabulator(tableDiv, {
      data: processedData, // Use the preprocessed and parsed data
      layout: 'fitDataFill',
      pagination: 'local',
      paginationSize: this.pageItemLimit,
      paginationSizeSelector: [5, 10, 15, 30, 50, 100],
      movableColumns: true,
      height: 'auto',
      columns: columns,
    });
  
    this.table.updateData(updatedData);
  
    this.table.on("rowDblClick", (e, row) => {
      // Double-click event handler
      const id = row.getData().ID; // Get the ID value from the double-clicked row
      const url = `${this.listURL}/DispForm.aspx?ID=${id}`; // Combine the list URL and ID to form the SharePoint item URL
      window.open(url, "_blank");
    });
  
    this.table.on("rowClick", (e, row) => {
      // Row click event handler
      e.preventDefault(); // Prevent default row selection behavior
    });
  }
  
  handleFilterClick() {
    const filterField = this.shadowRoot.querySelector('#filter-field').value;
    const filterValue = this.shadowRoot.querySelector('#filter-value').value;
    this.table.setFilter(filterField, "like", filterValue);
  }

  handleResetClick() {
    this.table.clearFilter();
  }

  render() {
    return html`
    <div style="margin-bottom:5px">
      <select id="filter-field">
        ${this.keys.map(key => html`<option value="${key}">${key}</option>`)}
      </select>
      <input id="filter-value" type="text" placeholder="Filter value"/>
      <button id="filter-btn" class="fltr-btn" @click="${this.handleFilterClick}">Filter</button>
      <button id="reset-btn" class="fltr-btn" @click="${this.handleResetClick}">Reset</button>
    </div>
    <div id="table"></div>
`;
  }
}

customElements.define('neo-listviewer', listviewElement);