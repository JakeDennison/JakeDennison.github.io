import { LitElement, html } from 'lit';
import { Tabulator } from 'tabulator-tables';
import { tabulatorStyles } from './tabulatorStyles.css.js';
import { tableStyles } from './tableStyles.css.js';

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

  static styles = [tabulatorStyles, tableStyles];

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

  render() {
    return html`<div id="tabulator"></div>`; // Container for the Tabulator table
  }

  _initializeTable() {
    const data = JSON.parse(this.src || '[]');
    this.table = new Tabulator(this.shadowRoot.getElementById('tabulator'), {
      data: data,
      height: "311px",
      layout: "fitColumns",
      resizableColumns: false,
      tooltips: true,
      columns: Object.keys(data[0]).map(key => ({ title: key, field: key })), // Generate main table columns dynamically
      rowFormatter: this._rowFormatter.bind(this) // Bind the rowFormatter function to the current context
    });
  }

  _rowFormatter(row) {
    var holderEl = document.createElement("div");
    var tableEl = document.createElement("div");
    holderEl.appendChild(tableEl);
    row.getElement().appendChild(holderEl);

    // Check if row data and items are defined
    if (row.getData() && row.getData().items && Array.isArray(row.getData().items)) {
        // Iterate over each item in the row data
        row.getData().items.forEach(item => {
            var subTableEl = document.createElement("div");
            holderEl.appendChild(subTableEl);

            var subTable = new Tabulator(subTableEl, {
                layout: "fitColumns",
                data: item.subItems || [], // Ensure subItems is an array
                columns: Object.keys(item.subItems[0] || {}).map(key => ({ title: key, field: key })) // Generate columns dynamically
            });
        });
    } else {
        console.error("Row data or items are undefined or not an array:", row.getData());
    }

    return holderEl; // Return the holder element containing the nested table
}


  _updateTable() {
    const data = JSON.parse(this.src || '[]');
    this.table.setColumns(Object.keys(data[0]).map(key => ({ title: key, field: key }))); // Update main table columns dynamically
    this.table.setData(data); // Update table data
  }
}

customElements.define('neo-tabulator', TabulatorElement);
