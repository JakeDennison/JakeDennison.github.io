import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyTable extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'nac-table',
      fallbackDisableSubmit: false,
      description: 'Display object as a table',
      iconUrl: "group-control",
      groupName: 'Visual',
      version: '1.3',
      properties: {
        dataobject: {
          type: 'string',
          title: 'Object',
          description: 'Test'
        },
      },
      standardProperties: {
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }
  
  static properties = {
    dataobject: 'test'
  }

  constructor() {
    super();
  }

  render() {
    if (!this.dataobject) {
      return html`
      <p>No Data Loaded</p>
      `;
    }

    const data = JSON.parse(this.dataobject);
    const rows = data.map(row => html`
      <tr>
        ${Object.values(row).map(cell => html`<td>${cell}</td>`)}
      </tr>
    `);

    const headers = Object.keys(data[0]).map(header => html`<th>${header}</th>`);

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
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
    `;
  }
}

const elementName = 'nac-table';
customElements.define('nac-table', MyTable);