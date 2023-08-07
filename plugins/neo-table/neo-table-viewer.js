import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.6.1/all/lit-all.min.js';
import { parseISO, format } from 'https://cdn.jsdelivr.net/npm/date-fns@2.30.0/+esm/index.js';

export class MyTable extends LitElement {
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
          description: 'Test'
        },
        replaceKeys:{
          type: 'string',
          title: 'List keys to rename',
          description: 'Use key-value pairs to rename columns separating by colon e.g. oldKey1:newKey1,oldKey2:newKey2'
        },
        pageItemLimit: {
          type: 'string',
          enum: ['5','10','15', '30', '50', '100'],
          title: 'Page Item Limit',
          description: 'Number of items to show per page',
          defaultValue: '5',
        },
        prefDateFormat: {
          type: 'string',
          title: 'Date format',
          description: 'enter a preferred date format such as DD/MM/YYYY HH:mm:ss zz',
          defaultValue: 'dd/MM/yyyy',
        },
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
    this.prefDateFormat= 'dd/MM/yyyy';
    this.pageItemLimit = "5";
    this.currentPage = 1;
  }

    parseDataObject() {
      let data;

      try {
        data = JSON.parse(this.dataobject);
        data = this.replaceUnicodeRegex(data);
      } catch (e) {
        console.log("XML detected");
        try {
          data = this.parseXmlDataObject();
          console.log('XML converted to JSON:', data);
        } catch (e) {
          console.error(e);
          data = null;
        }
      }

      data = data.map(item => this.replaceKeysAndFormatDates(item));

      return data;
  }

  replaceKeysAndFormatDates(item) {
    const keyPairs = this.replaceKeys.split(';').map(pair => pair.split(':'));
    const newItem = {...item};  // copy all properties of the item

    for (const [oldKey, newKey] of keyPairs) {
      if (item.hasOwnProperty(oldKey)) {
        let value = item[oldKey];
        
        // Check if the value looks like a date
        if (this.isIso8601Date(value)) {
          // Parse and format the date
          const date = parseISO(value);
          value = format(date, this.prefDateFormat);
        }
        
        newItem[newKey] = value;
        delete newItem[oldKey];
      }
    }

    return newItem;
}

  isIso8601Date(value) {
    const iso8601DatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    return iso8601DatePattern.test(value);
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
  
      data.push(this.replaceKeysAndFormatDates(row));
    }
  
    return data;
}

  changePage(newPage) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.requestUpdate();
    }
  }

  render() {
    const data = this.parseDataObject();
  
    if (!data || data.length === 0) {
      return html`
        <p>No Data Found</p>
      `;
    }
  
    const startIndex = (this.currentPage - 1) * parseInt(this.pageItemLimit, 10);
    const endIndex = startIndex + parseInt(this.pageItemLimit, 10);
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / parseInt(this.pageItemLimit, 10));
    this.totalPages = totalPages; // Assign to component property
  
    const rows = paginatedData.map(row => html`
      <tr>
        ${Object.keys(row).map(key => html`<td class="text-nowrap">${row[key]}</td>`)}
      </tr>
    `);
  
    const headers = Object.keys(data[0]).map(header => html`<th class="text-nowrap">${header}</th>`);
  
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
      </style>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="table-responsive-md overflow-auto">
        <table class="table table-striped">
          <thead>
            <tr>
              ${headers}
            </tr>
          </thead>
          <tbody>
            ${rows}
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
    `;
  }

  
}

customElements.define('neo-table-viewer', MyTable);