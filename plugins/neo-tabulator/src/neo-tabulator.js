import { LitElement, html, css, unsafeCSS } from 'lit';
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

  _generateColumns(data) {
    if (!data || !data.length) return [];

    const columns = [];

    // Iterate over each item in data
    data.forEach(item => {
        // Iterate over each key in item
        Object.keys(item).forEach(key => {
            // Check if the value of the key is an array (nested data)
            if (Array.isArray(item[key])) {
                // Define a column for the nested data
                columns.push({
                    title: key, // Customize title as needed
                    field: key, // Field name should match the key
                });
            } else {
                // Define a regular column for non-nested data
                columns.push({
                    title: key, // Customize title as needed
                    field: key // Field name should match the key
                });
            }
        });
    });

    return columns;
}

_initializeTable() {
    const data = JSON.parse(this.src || '[]');
    this.table = new Tabulator(this.shadowRoot.getElementById('tabulator'), {
        data: data,
        columns: this._generateColumns(data),
        layout: "fitColumns",
        rowFormatter: this._rowFormatter.bind(this) // Bind the rowFormatter function to the current context
    });
}

_rowFormatter(row) {
    // Create and style holder elements
    var holderEl = document.createElement("div");
    var tableEl = document.createElement("div");

    holderEl.style.boxSizing = "border-box";
    holderEl.style.padding = "10px 30px 10px 10px";
    holderEl.style.borderTop = "1px solid #333";
    holderEl.style.borderBottom = "1px solid #333";

    tableEl.style.border = "1px solid #333";

    holderEl.appendChild(tableEl);

    row.getElement().appendChild(holderEl);

    var subTable = new Tabulator(tableEl, {
        layout: "fitColumns",
        data: row.getData(), // Use row data as nested data
        columns: this._generateColumns([row.getData()])[0].columns // Generate columns dynamically
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
