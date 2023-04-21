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

  constructor() {
    super();
  }

  parseDataObject() {
    let data = JSON.parse(this.dataobject);
    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    data = JSON.parse(JSON.stringify(data).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
    return data;
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
  
  render() {
    let data;

    try {
      data = this.parseDataObject();
    } catch (e) {
      // If parsing as JSON fails, assume it's XML
      console.log("XML detected");
      try {
        data = this.parseXmlDataObject();
        console.log('XML converted to JSON:', data);
      } catch (e) {
        console.error(e);
        return html`
          <p>Failed to parse dataobject</p>
        `;
      }
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

    const table = html`
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

    return table;
  }
}

customElements.define('neo-table-viewer', MyTable);