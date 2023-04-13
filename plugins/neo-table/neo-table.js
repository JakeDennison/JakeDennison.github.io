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
    if (!this.dataobject) {
      return html`
        <p>No Data Loaded</p>
      `;
    }
  
    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    const data = JSON.parse(this.dataobject.replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
    const rows = data.map(row => html`
      <tr>
        ${Object.values(row).map(cell => html`<td>${cell}</td>`)}
      </tr>
    `);
  
    const headers = Object.keys(data[0]).map(header => html`<th>${header}</th>`); // add class to th elements
  
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
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