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
    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(this.dataobject, 'text/xml');

    const traverse = (node) => {
      const obj = {};

      for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];

        if (childNode.nodeType === Node.ELEMENT_NODE) {
          if (childNode.childNodes.length > 0) {
            obj[childNode.nodeName] = traverse(childNode);
          } else {
            obj[childNode.nodeName] = childNode.textContent;
          }
        }
      }

      return obj;
    };

    const records = traverse(xmlDocument.documentElement);
    const data = Array.isArray(records) ? records : [records];

    return data;
  }

  renderTableSection(section) {
    const headers = Object.keys(section[0]).map(header => html`<th class="text-nowrap">${header}</th>`);

    const rows = section.map(record => {
      const cells = Object.values(record).map(value => {
        if (typeof value === 'object' && value !== null) {
          return html`<td>${this.renderTableSection([value])}</td>`;
        } else {
          return html`<td class="text-nowrap">${value}</td>`;
        }
      });
      return html`<tr>${cells}</tr>`;
    });

    const table = html`
      <table class="table table-bordered table-striped">
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

    return table;
  }

  render() {
    let data;
  
    try {
      data = this.parseDataObject();
    } catch (e) {
      // If parsing as JSON fails, assume it's XML
      try {
        data = this.parseXmlDataObject();
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
  
    const tableSections = [];
  
    const sectionKeys = Object.keys(data[0]);
    sectionKeys.forEach(sectionKey => {
      const sectionData = data.map(record => record[sectionKey]);
      const section = {
        title: sectionKey,
        data: sectionData
      };
      tableSections.push(section);
    });
  
    const table = html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="table-responsive-md overflow-auto">
        <table class="table table-striped">
          ${tableSections.map(section => this.renderTableSection(section))}
        </table>
      </div>
    `;
  
    return table;
  }
  
}

customElements.define('neo-table-viewer', MyTable);