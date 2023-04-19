import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyTable extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-table',
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
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }
  
  static properties = {
    dataobject: ''
  }

  constructor() {
    super();
  }

  render() {
    let data;
    console.log(this.dataobject);
    try {
      // Try to parse dataobject as JSON
      data = JSON.parse(this.dataobject);
      // Convert Unicode escape sequences if present
      const unicodeRegex = /\\u([\dA-F]{4})/gi;
      data = JSON.parse(JSON.stringify(data).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
    } catch (e) {
      // If parsing as JSON fails, assume it's XML
      console.log("XML detected");
      const xmlString = this.dataobject.replace(/&quot;/g, '"');
      const parser = new DOMParser();
      const xmlDocument = parser.parseFromString(xmlString, 'text/xml');
      const items = xmlDocument.getElementsByTagName('Item');
      data = [];
  
      for (let i = 0; i < items.length; i++) {
        const row = {};
        const item = items[i];
        const fields = item.children;
  
        for (let j = 0; j < fields.length; j++) {
          const field = fields[j];
          const fieldName = field.nodeName;
          let fieldValue = field.textContent;
  
          // Convert Unicode escape sequences if present
          const unicodeRegex = /_x([0-9A-F]{4})_/g;
          fieldValue = fieldValue.replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16)));
  
          row[fieldName] = fieldValue;
        }
  
        data.push(row);
      }
  
      console.log('XML converted to JSON:', data);
    }
  
    if (!data || data.length === 0) {
      return html`
        <p>No Data Found</p>
      `;
    }
  
    const rows = data.map(row => html`
      <tr>
        ${Object.values(row).map(cell => html`<td class="text-nowrap">${cell}</td>`)}
      </tr>
    `);
  
    const headers = Object.keys(data[0]).map(header => html`<th class="text-nowrap">${header}</th>`);
  
    return html`
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
    `;
  }
}

customElements.define('neo-table', MyTable);
