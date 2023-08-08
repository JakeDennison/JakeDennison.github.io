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
        selectedItems:{
          type: 'string',
          title: 'Selected Items',
          description: 'Store selected item IDs, ID must be available in JSON to work.',
          isValueField: true,
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
        orderKeys:{
          type: 'string',
          title: 'Specify the order of keys',
          description: 'Semicolon separate a list of keys to define the order e.g. Key1;Key2;Key3'
        },
        editableKeys:{
          type: 'string',
          title: 'Specify the columns that should be editable',
          description: 'Semicolon separate a list of keys (column names) to define the order e.g. Key1;Key2;Key3'
        },
        dateFormat:{
          type: 'string',
          title: 'Preferred date format',
          description: 'Enter a common data format to set the dates returned accordingly e.g. YYYY-MM-DD HH:mm:ss'
        },
        boolFilter: {
          title: 'Show filter options?',
          type: 'boolean',
          defaultValue: true,
        },
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
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
      orderKeys: { type: String },
      dateFormat: { type: String },
      boolFilter: { type: Boolean },
      filteredKeys: { type: Array },
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
    this.orderKeys = '';
    this.dateFormat = '';
    this.filteredKeys= [];
    this.boolFilter = true;
  }

  connectedCallback() {
    super.connectedCallback();
  
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/tabulator/5.5.1/css/tabulator_semanticui.min.css');
  
    this.shadowRoot.appendChild(linkElem);

    if (this.renamedKeys) {
      this.renamedKeysObject = {};
      const pairs = this.renamedKeys.split(',');
      for (const pair of pairs) {
        const [oldKey, newKey] = pair.split(':').map(k => k.trim());
        this.renamedKeysObject[oldKey] = newKey;
      }
    }
  }
  
  parseDataObject() {
    let tabledata, keys;

    try {
        tabledata = JSON.parse(this.dataobject);
        tabledata = this.replaceUnicodeRegex(tabledata);

        // Split renamed keys into an array of oldKey:newKey pairs
        const renamedKeyPairs = this.renamedKeys.split(',').map(pair => pair.trim().split(':'));
        
        // Create a map of oldKey:newKey pairs
        const keyMap = renamedKeyPairs.reduce((result, [oldKey, newKey]) => {
            result[oldKey] = newKey;
            return result;
        }, {});

        // Map over each object in data array and replace keys as necessary
        tabledata = tabledata.map(item => {
            const newItem = {};
            for (const [oldKey, value] of Object.entries(item)) {
                const newKey = keyMap[oldKey] || oldKey;
                newItem[newKey] = value;
            }
            return newItem;
        });

        keys = tabledata.length > 0 ? Object.keys(tabledata[0]) : [];

        // Rearrange data based on the orderKeys property
        const columnOrder = this.orderKeys ? this.orderKeys.split(';').map(key => key.trim()) : [];
        tabledata = this.rearrangeData(tabledata, columnOrder);

    } catch (e) {
        console.error(e);
        tabledata = null;
        keys = [];
    }

    return { data: tabledata, keys };
}

  
  rearrangeData(data, columnOrder) {
    return data.map(item => {
      const reorderedItem = {};
      columnOrder.forEach(key => {
        if (item.hasOwnProperty(key)) {
          reorderedItem[key] = item[key];
        }
      });
      return reorderedItem;
    });
  }

  constructUrl(baseUrl, endpoint) {
    return baseUrl.endsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
  }


  replaceUnicodeRegex(input) {
    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    return JSON.parse(JSON.stringify(input).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  preprocessData() {
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

    const additionalIgnoredKeys = this.ignoredKeys ? this.ignoredKeys.split(',').map(key => key.trim()) : [];
    const ignoredKeys = defaultIgnoredKeys.concat(additionalIgnoredKeys);

    this.listdata = this.listdata.map(item => {
      if (!item || typeof item !== 'object') {
        return item;
      }

      let newItem = { ...item };

      for (const key of ignoredKeys) {
        delete newItem[key];
      }

      newItem = this.handlePersonField(newItem);
      newItem = this.handleEmailFields(newItem);
      newItem = this.handleJSONFields(newItem);
      newItem = this.handleDateFields(newItem);
      newItem = this.handleHyperlinkFields(newItem);
      newItem = this.handleSemicolonSeparatedValues(newItem);

      return newItem;
    });
  }

  handlePersonField(item) {
      for (const [key, value] of Object.entries(item)) {
          if (!value || typeof value !== 'object') {
              continue;
          }

          if (Object.keys(value).includes('EMail')) {
              let parentKeyName = key.endsWith('_Email') ? key.slice(0, -6) : key;
              const emailKey = `${parentKeyName}_Email`;
              const usernameKey = `${parentKeyName}_Username`;
              const displayNameKey = `${parentKeyName}_DisplayName`;

              item[parentKeyName] = value.EMail;
              delete item[emailKey];
              delete item[usernameKey];
              delete item[displayNameKey];
          }
      }
      return item;
  }

  handleEmailFields(item) {
      const emailsItem = {};
      for (const [key, value] of Object.entries(item)) {
          if (key.endsWith('_Email')) {
              let name = key.slice(0, -6);
              emailsItem[name] = value;

              let idKey = `${name}Id`;
              let stringIdKey = `${name}StringId`;
              if (item.hasOwnProperty(idKey)) {
                  delete item[idKey];
              }
              if (item.hasOwnProperty(stringIdKey)) {
                  delete item[stringIdKey];
              }
          } else {
              emailsItem[key] = value;
          }
      }
      return emailsItem;
  }

  handleJSONFields(item) {
      for (const [key, value] of Object.entries(item)) {
          if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
              try {
                  const jsonObj = JSON.parse(value);
                  if (
                      jsonObj.Address &&
                      jsonObj.Address.Street &&
                      jsonObj.Address.City &&
                      jsonObj.Address.CountryOrRegion
                  ) {
                      item[key] = `${jsonObj.Address.Street}, ${jsonObj.Address.City}, ${jsonObj.Address.CountryOrRegion}`;
                  }

                  if (jsonObj.serverUrl && jsonObj.serverRelativeUrl) {
                      item[key] = `<img height="42px" width="42px" src="${jsonObj.serverUrl}${jsonObj.serverRelativeUrl}" alt="Image">`;
                  }
              } catch (error) {
                  // Invalid JSON, leave the value as it is
              }
          }
      }
      return item;
  }

  handleDateFields(item) {
      const dateFormat = this.dateFormat;
      for (const [key, value] of Object.entries(item)) {
          if (typeof value === 'string') {
              if (dateFormat && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
                  const date = new Date(value);
                  const formattedDate = this.formatDate(date, dateFormat);
                  item[key] = formattedDate;
              }
          }
      }
      return item;
  }

  handleHyperlinkFields(item) {
      const regex = /^https?:\/\/[^\s,]+, .+$/;
      for (const [key, value] of Object.entries(item)) {
          if (typeof value === 'string') {
              if (regex.test(value)) {
                  const [url, label] = value.split(', ');
                  item[key] = url;
              }
          }
      }
      return item;
  }

  handleSemicolonSeparatedValues(item) {
      for (const [key, value] of Object.entries(item)) {
          if (
              typeof value === 'string' &&
              value.includes(';') &&
              !value.toLowerCase().includes('<div')
          ) {
              const choices = value.split(';').map(choice => choice.trim().replace('#', ''));
              item[key] = choices.map(choice => `<span class="choice-pill">${choice}</span>`).join('');
          }
      }
      return item;
  }
  
  firstUpdated() {
    super.firstUpdated();
  
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
        editor: false,
        formatter: (cell) => {
          const value = cell.getValue();
          if (value === null || value === undefined) {
            return '';
          } else if (typeof value === 'string' && value.startsWith('http')) {
            return html`<a href="${value}" target="_blank">${value}</a>`;
          }
          return value;
        }
      };
    });

    // Parse editableKeys property and split into an array
    const editableKeysList = this.editableKeys ? this.editableKeys.split(';').map(key => key.trim()) : [];

    // Iterate through columns and set editor property for matching keys
    columns.forEach(column => {
      if (editableKeysList.includes(column.field)) {
        column.editor = true; // Set editor property for editable columns
      }
    });
  
    const tableDiv = this.shadowRoot.querySelector('#table'); // Get the table div
    tableDiv.classList.add("neo-lv-table");

    // Keep a reference to the Tabulator instance
    this.table = new Tabulator(tableDiv, {
      data: processedData,
      layout: 'fitDataFill',
      history:true,
      pagination: 'local',
      paginationSize: this.pageItemLimit,
      paginationSizeSelector: [5, 10, 15, 30, 50, 100],
      movableColumns: true,
      height: 'auto',
      rowHeight:'41',
      columns: columns,
    });
  
    this.table.updateData(processedData);
  
    this.table.on("rowDblClick", (e, row) => {
      const id = row.getData().ID;
      const url = `${this.listURL}/DispForm.aspx?ID=${id}`;
      window.open(url, "_blank");
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

  handleUndo() {
    table.undo();
  }

  handleRedo() {
    table.redo();
  }

  render() {
    let filterOptions = this.keys.map(key => this.renamedKeysObject[key] || key); // Use renamed keys if available
  
    if (this.boolFilter) {
      return html`
        <div style="margin-bottom:5px">
          <select id="filter-field">
            ${filterOptions.map(key => html`<option value="${key}">${key}</option>`)}
          </select>
          <input id="filter-value" type="text" placeholder="Filter value"/>
          <button id="filter-btn" class="fltr-btn" @click="${this.handleFilterClick}">Filter</button>
          <button id="reset-btn" class="fltr-btn" @click="${this.handleResetClick}">Reset</button>
        </div>
        <div>
          <button id="history-undo" @click="${this.handleUndo}">Undo Edit</button>
          <button id="history-redo" @click="${this.handleRedo}">Redo Edit</button>
        </div>
        <div id="table"></div>
      `;
    } else {
      return html`
      <div>
          <button id="history-undo">Undo Edit</button>
          <button id="history-redo">Redo Edit</button>
      </div>
        <div id="table"></div>
      `;
    }
  }
  
}

customElements.define('neo-listviewer', listviewElement);