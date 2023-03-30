import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyTable extends LitElement {
  static async getMetaConfig() {
    return {
      title: 'neo-table',
      fallbackDisableSubmit: false,
      version: '1.3',
    };
  }
  
  async loadData() {
    try {
      const response = await fetch('https://jsdenintex.github.io/plugins/neo-table/data.json');
      this.data = await response.json();
      this.data.forEach(row => {
        row.edit = false;
      });
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  constructor() {
    super();
    this.loadData();
  }

  updateRow(e, row, key) {
    row[key] = e.target.value;
  }

  editRow(row) {
    row.edit = true;
    this.requestUpdate();
  }

  cancelEdit(row) {
    row.edit = false;
    this.requestUpdate();
  }

  async saveRow(row) {
    try {
      const response = await fetch('https://jsdenintex.github.io/plugins/neo-table/data.json', {
        method: 'PUT',
        body: JSON.stringify(row),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        row.edit = false;
        this.requestUpdate();
      } else {
        console.error('Failed to save row');
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (!this.data) {
      return html``;
    }

    const rows = this.data.map(row => html`
      ${row.edit ? html`
        <tr>
          ${Object.keys(row).map(key => html`
            <td>
              <input type="text" value=${row[key]} @input=${e => this.updateRow(e, row, key)}>
            </td>
          `)}
          <td>
            <button @click=${() => this.saveRow(row)}>Save</button>
            <button @click=${() => this.cancelEdit(row)}>Cancel</button>
          </td>
        </tr>
      ` : html`
        <tr>
          ${Object.values(row).map(cell => html`<td>${cell}</td>`)}
          <td>
            <button @click=${() => this.editRow(row)}>Edit</button>
          </td>
        </tr>
      `}
    `);
  }
}
const elementName = 'neo-table';
customElements.define('neo-table', MyTable);