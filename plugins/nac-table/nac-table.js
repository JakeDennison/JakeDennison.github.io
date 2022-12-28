import { LitElement, html } from 'lit-element';

class MyTable extends LitElement {
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