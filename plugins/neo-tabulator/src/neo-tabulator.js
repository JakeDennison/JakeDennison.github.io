import { LitElement, html, css, unsafeCSS } from 'lit';
import { Tabulator } from 'tabulator-tables';
import tabulatorStyles from 'tabulator-tables/dist/css/tabulator_bootstrap5.min.css';
import tableStyles from './tableStyles.css';

class TabulatorElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-tabulator',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        src: {
          type: 'string',
          title: 'Data Object',
          description: 'JSON Object'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get styles() {
    return css`
      ${unsafeCSS(tabulatorStyles)}
      ${unsafeCSS(tableStyles)}
    `;
  }

  constructor() {
    super();
    this.src = '';
    this.table = null; // Will hold the Tabulator instance
  }

  firstUpdated() {
    this._initializeTable();
  }

  connectedCallback() {
    super.connectedCallback();
    const styleEl = document.createElement('style');
    styleEl.textContent = tabulatorStyles + tableStyles;
    this.shadowRoot.appendChild(styleEl);
  }
  
  updated(changedProperties) {
    if (changedProperties.has('src') && this.src) {
      this._updateTable();
    }
  }

  // Dynamically generate column definitions based on data
  _generateColumns(data) {
    if (!data || !data.length) return [];

    const columnSet = new Set();
    data.forEach(item => {
      Object.keys(item).forEach(key => columnSet.add(key));
    });

    return Array.from(columnSet).map(key => ({
      title: key, // Customize title as needed, perhaps a mapping based on key names
      field: key,
      formatter: "plaintext", // Default formatter, adjust as needed
    }));
  }

  _initializeTable() {
    const data = JSON.parse(this.src || '[]');
    this.table = new Tabulator(this.shadowRoot.getElementById('tabulator'), {
      data: data, // Set initial data
      columns: this._generateColumns(data), // Generate columns dynamically
      layout: "fitColumns", // Fit columns to width of table
    });
  }

  _updateTable() {
    const data = JSON.parse(this.src || '[]');
    this.table.setColumns(this._generateColumns(data)); // Update columns dynamically
    this.table.setData(data); // Update table data
  }

  render() {
    return html`<div id="tabulator"></div>`; // Container for the Tabulator table
  }
}

customElements.define('neo-tabulator', TabulatorElement);