import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {DataGrid} from 'https://unpkg.com/@claviska/jquery-datagrid@2.2.0/dist/jquery.datagrid.js';

export class MyTable extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'nac-grid',
      fallbackDisableSubmit: false,
      description: 'Display object as an editable table',
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

  firstUpdated() {
    const data = JSON.parse(this.dataobject) || [];
    const headers = Object.keys(data[0] || {});

    this.grid = new DataGrid('#grid', {
      data,
      columns: headers.map(header => ({
        header,
        field: header,
        editor: 'text',
        sortable: true
      })),
      primaryKey: headers[0],
      editable: true,
      sortable: true,
      filterable: true,
      pagination: {
        limit: 10,
        sizes: [10, 20, 50, 100, 0]
      }
    });
  }

  render() {
    return html`
      <link href="https://unpkg.com/@claviska/jquery-datagrid@2.2.0/dist/jquery.datagrid.css" rel="stylesheet">
      <div id="grid"></div>
    `;
  }
}

const elementName = 'nac-grid';
customElements.define('nac-grid', MyGrid);
