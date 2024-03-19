import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.6.1/all/lit-all.min.js';

export class MyTable extends LitElement {

  static get properties() {
    return {
      errorMessage: { type: String },
    };
  }

  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-table-viewer',
      fallbackDisableSubmit: false,
      description: 'Display object as a table',
      iconUrl: "group-control",
      groupName: 'Visual Data',
      version: '1.3',
      properties: {
        dataobject: {
          type: 'string',
          title: 'Object',
          description: 'JSON or XML data variable'
        },
        datatype: {
          title: 'Object Data Type',
          type: 'string',
          enum: ['JSON', 'XML'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'JSON',
        },
        replaceKeys: {
          type: 'string',
          title: 'Rename keys JSON',
          description: 'Use key-value pairs to rename columns e.g. {"keyMappings": {"oldKey1": "newKey1","oldKey2": "newKey2"}}'
        },
        pageItemLimit: {
          type: 'string',
          enum: ['5', '10', '15', '30', '50', '100'],
          title: 'Page Item Limit',
          description: 'Number of items to show per page',
          defaultValue: '5',
        }
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
      },
    };
  }

  static properties = {
    dataobject: '',
    datatype: '',
    replaceKeys: '',
    prefDateFormat: '',
    pageItemLimit: { type: Number },
    currentPage: { type: Number },
  };

  static get properties() {
    return {
      itemsPerPage: { type: Number },
      currentPage: { type: Number },
    };
  }

  constructor() {
    super();
    this.dataobject = '';
    this.replaceKeys = '';
    this.prefDateFormat = '';
    this.pageItemLimit = "5";
    this.currentPage = 1;
    this.errorMessage = '';
  }

  preprocessDoubleEscapedJson(jsonString) {
    // Replace double-escaped sequences with single-escaped sequences
    let normalizedJsonString = jsonString.replace(/\\\\/g, '\\');
    normalizedJsonString = normalizedJsonString.replace(/&quot;/ig, '"');

    // Normalize the key names by removing extra spaces after colons in the keys
    normalizedJsonString = normalizedJsonString.replace(/:\\"/g, ': \\"');

    return normalizedJsonString;
  }

  parseDataObject() {
    let data;
    this.errorMessage = '';

    if (!this.datatype) {
      this.errorMessage = "Object data type not configured, please update the plugin properties and specify the data type.";
      console.error(this.errorMessage);
      return null;
    }

    // Check if dataobject is empty or undefined
    if (!this.dataobject) {
      console.error("No JSON data provided.");
      return null;
    }

    if (this.datatype === 'JSON') {
      try {
        // Preprocess the JSON string to handle double escaping and normalize key names
        const processedData = this.preprocessDoubleEscapedJson(this.dataobject);
        data = JSON.parse(processedData);

        // Additional check if data is still a string indicating further encoding
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }

        data = this.replaceUnicodeRegex(data); // Apply Unicode replacements
      } catch (e) {
        this.errorMessage = "Error parsing JSON data.";
        console.error(this.errorMessage, e);
        data = null;
      }
    } else if (this.datatype === 'XML') {
      try {
        data = this.parseXmlDataObject();
      } catch (e) {
        this.errorMessage = "Error parsing XML data.";
        console.error(this.errorMessage, e);
        data = null;
      }
    } else {
      this.errorMessage = `Unsupported data type: ${this.datatype}.`;
      console.error(this.errorMessage);
      data = null;
    }

    if (this.replaceKeys && data) {
      data = this.renameKeys(data);
    }

    return data;
  }



  renameKeys(data) {
    // Parse the JSON string to get the key mappings
    const keyMappings = JSON.parse(this.replaceKeys).keyMappings;

    // Map over each object in data array and replace keys as necessary
    const newData = data.map(obj => {
      const newObj = {};
      for (const key in obj) {
        const newKey = keyMappings[key] || key; // Get the new key if it exists in the map, otherwise use the old key
        newObj[newKey] = obj[key];
      }
      return newObj;
    });

    // Check for any old keys left unmapped
    const unmappedKeys = Object.keys(keyMappings).filter(oldKey => !Object.values(data).some(obj => obj.hasOwnProperty(oldKey)));

    if (unmappedKeys.length > 0) {
      console.warn('The following old keys are not found in the data and will not be renamed:', unmappedKeys);
    }

    return newData;
  }

  replaceUnicodeRegex(input) {
    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    return JSON.parse(JSON.stringify(input).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  parseXmlDataObject() {
    let xmlString = this.dataobject.replace(/&quot;/g, '"').replace(/_x([\dA-F]{4})_/gi, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

    // Remove XML declaration if present
    xmlString = xmlString.replace(/<\?xml.*?\?>/, '');

    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xmlString, 'text/xml');
    const items = xmlDocument.querySelector('RepeaterData > Items').children;
    const data = [];

    for (let i = 0; i < items.length; i++) {
      const row = {};
      const fields = items[i].children;

      for (let j = 0; j < fields.length; j++) {
        const field = fields[j];
        const fieldName = field.nodeName;
        let fieldValue = field.textContent;
        fieldValue = fieldValue.replace(/_x([\dA-F]{4})_/gi, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

        row[fieldName] = fieldValue;
      }

      data.push(row);
    }

    if (this.replaceKeys && data) {
      return this.renameKeys(data);
    }

    return data;
  }

  changePage(newPage) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.requestUpdate();
    }
  }

  renderField(field) {
    if (Array.isArray(field)) {
      return html`
        <table class="table mb-2 p-1">
          <tbody>
            ${field.map(item => html`
              <tr>
                <td>${this.renderField(item)}</td>
              </tr>
            `)}
          </tbody>
        </table>
      `;
    } else if (typeof field === 'object' && field !== null) {
      // Check if the object contains nested JSON
      if (Object.values(field).some(value => Array.isArray(value))) {
        return html`
          ${Object.entries(field).map(([key, value]) => {
          if (Array.isArray(value)) {
            return html`
                <tr>
                  <td class="nested-table">
                    <table class="table mb-2 p-1">
                      <tbody>
                        <tr>
                          <th>${key}</th>
                        </tr>
                        ${value.map(item => html`
                          <tr>
                            <td>${this.renderField(item)}</td>
                          </tr>
                        `)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              `;
          } else {
            return html`
                <tr>
                  <th>${key}</th>
                  <td>${this.renderField(value)}</td>
                </tr>
              `;
          }
        })}
        `;
      } else {
        // Render simple object
        return html`
          <ul class="nested-list">
            ${Object.entries(field).map(([key, value]) => html`
              <li>${value !== null ? value : '-'}</li>
            `)}
          </ul>
        `;
      }
    } else {
      return field !== null ? field : '-';
    }
  }

  render() {
    const data = this.parseDataObject();
  
    // Display error message if present
    if (this.errorMessage) {
      return html`<p class="error-message">${this.errorMessage}</p>`;
    }
  
    if (!data || data.length === 0) {
      return html`
        <div class="alert alert-secondary" role="alert">
          No Data Found
        </div>
      `;
    }
  
    const startIndex = (this.currentPage - 1) * parseInt(this.pageItemLimit, 10);
    const endIndex = startIndex + parseInt(this.pageItemLimit, 10);
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / parseInt(this.pageItemLimit, 10));
    this.totalPages = totalPages; // Assign to component property
  
    // Calculate the range of pages to display
    const maxPagesToShow = 5;
    const pageRange = Math.min(totalPages, maxPagesToShow);
    let startPage = Math.max(1, this.currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);
  
    // Adjust startPage if it exceeds the valid range
    if (endPage - startPage + 1 < pageRange) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }
  
    return html`
      <style>
        .page-txt-link {
          width: 100px;
          text-align:center;
        }
        .page-num-link {
          width: 45px;
          text-align:center;
        }
        .nested-table{
          column-span: all;
        }
        .nested-list {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        .neo-table {
          -moz-user-select: text;
          -khtml-user-select: text;
          -webkit-user-select: text;
          -ms-user-select: text;
          user-select: text;
        }
      </style>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="table-responsive-md overflow-auto">
        <table class="neo-table table table-striped">
          <thead>
            <tr>
              ${Object.keys(data[0]).map(header => html`<th class="text-nowrap">${header}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${paginatedData.map(row => html`
              <tr>
                ${Object.values(row).map(value => html`<td>${this.renderField(value)}</td>`)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
      <div class="row">
        ${totalPages > 1 ? html`
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(1)}">First</a>
              </li>
              <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(this.currentPage - 1)}">Previous</a>
              </li>
              ${Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map(page => html`
                <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                  <a class="page-link page-num-link" href="#" @click="${() => this.changePage(page)}">${page}</a>
                </li>
              `)}
              <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(this.currentPage + 1)}">Next</a>
              </li>
              <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(totalPages)}">Last</a>
              </li>
            </ul>
          </nav>
        ` : ''}
      </div>
      ${paginatedData.map(row => this.renderNestedTables(row))}
    `;
  }
  
  renderNestedTables(row) {
    const nestedTables = Object.entries(row)
      .filter(([key, value]) => Array.isArray(value))
      .map(([key, value]) => html`
        <div>
          <h5>${key}</h5>
          <table class="table mb-2 p-1">
            <tbody>
              ${value.map(item => html`
                <tr>
                  <td>${this.renderField(item)}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      `);
  
    return html`${nestedTables}`;
  }
  
  

}

customElements.define('neo-table-viewer', MyTable);