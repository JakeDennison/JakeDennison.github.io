import { LitElement, html } from 'lit-element';
import './query-assigned-elements-214d6340.js';
import { Z as ZincVersion } from './zinc-api-f0859f9f.js';

const config = {
  title: 'nac-table',
  fallbackDisableSubmit: false,
  description: 'Renders a table based on json data',
  iconUrl: 'rich-text',
  groupName: 'Visual',
  pluginAuthor: 'Jake Dennison',
  version: ZincVersion.CurrentVersion,
  properties: {
    Object: {
      type: 'string',
      title: 'object as a string',
      description: 'Store the object in a variable to use here'
    },
  },
  standardProperties: {
    readOnly: true,
    required: true,
    description: true
  }
};

class MyTable extends LitElement {
  static async getMetaConfig() {
    return {
      controlName: 'nac-table',
      fallbackDisableSubmit: false,
      version: '1.2',
    };
  }
  
  async loadData() {
    try {
      const response = await fetch('data.json');
      this.data = await response.json();
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  constructor() {
    super();
    this.loadData();
  }

  render() {
    if (!this.data) {
      return html``;
    }
  
    const rows = this.data.map(row => html`
      <tr>
        ${Object.values(row).map(cell => html`<td>${cell}</td>`)}
      </tr>
    `);

    const headers = Object.keys(this.data[0]).map(header => html`<th>${header}</th>`);

    return html`
      <table class="table table-dark">
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

customElements.define('nac-table', MyTable);