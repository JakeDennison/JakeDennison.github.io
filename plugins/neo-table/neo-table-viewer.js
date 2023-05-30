import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.6.1/all/lit-all.min.js';

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
  }

  static get properties() {
    return {
      itemsPerPage: { type: Number },
      currentPage: { type: Number },
    };
  }

  constructor() {
    super();
    this.dataobject = '';
    this.itemsPerPage = 5;
    this.currentPage = 1;
  }

  updated(changedProperties) {
    if (changedProperties.has('dataobject')) {
      this.itemsPerPage = 5;
      this.currentPage = 1;
    }
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

    return data;
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
  
    return data;
  }
  
  changePage(newPage) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.requestUpdate();
    }
  }

  changeItemsPerPage(event) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.requestUpdate();
  }

  render() {
    const data = this.parseDataObject();

    if (!data || data.length === 0) {
      return html`
        <p>No Data Found</p>
      `;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / this.itemsPerPage);
    this.totalPages = totalPages; // Assign to component property

    const rows = paginatedData.map(row => html`
      <tr>
        ${Object.values(row).map(cell => html`<td class="text-nowrap">${cell}</td>`)}
      </tr>
    `);

    const headers = Object.keys(data[0]).map(header => html`<th class="text-nowrap">${header}</th>`);

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="d-flex justify-content-between mb-2">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-start">
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
              <a class="page-link" href="#" @click="${() => this.changePage(this.currentPage - 1)}">Previous</a>
            </li>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => html`
              <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                <a class="page-link" href="#" @click="${() => this.changePage(page)}">${page}</a>
              </li>
            `)}
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
              <a class="page-link" href="#" @click="${() => this.changePage(this.currentPage + 1)}">Next</a>
            </li>
          </ul>
        </nav>
        <div class="form-inline">
          <label for="itemsPerPage">Items Per Page:</label>
          <select id="itemsPerPage" class="form-control ml-2" @change="${this.changeItemsPerPage}">
            <option value="5" ?selected="${this.itemsPerPage === 5}">5</option>
            <option value="15" ?selected="${this.itemsPerPage === 15}">15</option>
            <option value="30" ?selected="${this.itemsPerPage === 30}">30</option>
          </select>
        </div>
      </div>
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
    `;
  }
  
}

customElements.define('neo-table-viewer', MyTable);