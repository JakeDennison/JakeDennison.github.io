import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


export class MyTable extends LitElement {

  static async getMetaConfig() {
      return {
        title:'nac-table',
        fallbackDisableSubmit: false,
        description: 'Control for viewing a json object',
        iconUrl: "multiline-text",
        groupName: 'Table',
        version: '1.3',
        properties: {
            ObjectJSON: {
                type: 'Object',
                title: 'object as JSON',
                description: 'Please enter a variable of the objectJSON'
            },
        },
        standardProperties: {
            readOnly: true,
            required: true,
            description: true,
        }
    };
  }

  constructor() {
    super();
    this.properties.ObjectJSON();
  }

  setData(jsonString) {
    this.properties.ObjectJSON = JSON.parse(jsonString);
  }
  render() {
    if (!this.jsonString) {
      return html``;
    }
  
    const rows = this.jsonString.map(row => html`
      <tr>
        ${Object.values(row).map(cell => html`<td>${cell}</td>`)}
      </tr>
    `);

    const headers = Object.keys(this.jsonString[0]).map(header => html`<th>${header}</th>`);

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