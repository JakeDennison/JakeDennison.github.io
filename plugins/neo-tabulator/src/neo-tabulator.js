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
                    formatter: this._generateNestedTableFormatter(key) // Use a custom formatter for nested tables
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

_generateNestedTableFormatter(key) {
    return function(cell, formatterParams, onRendered) {
        const nestedData = cell.getValue();
        const table = document.createElement('div');
        table.classList.add('tabulator');
        table.setAttribute('tabulator-layout', 'fitColumns');
        
        // Create header row
        const headerRow = document.createElement('div');
        headerRow.classList.add('tabulator-row', 'tabulator-header');
        const nestedItem = nestedData[0]; // Take the first object in the array as a sample
        for (const nestedKey in nestedItem) {
            if (nestedItem.hasOwnProperty(nestedKey)) {
                const headerCell = document.createElement('div');
                headerCell.classList.add('tabulator-cell');
                headerCell.textContent = nestedKey;
                headerRow.appendChild(headerCell);
            }
        }
        table.appendChild(headerRow);

        // Create data rows
        nestedData.forEach(nestedItem => {
            const row = document.createElement('div');
            row.classList.add('tabulator-row');
            for (const nestedKey in nestedItem) {
                if (nestedItem.hasOwnProperty(nestedKey)) {
                    const cell = document.createElement('div');
                    cell.classList.add('tabulator-cell');
                    cell.setAttribute('tabulator-field', nestedKey);
                    cell.textContent = nestedItem[nestedKey];
                    row.appendChild(cell);
                }
            }
            table.appendChild(row);
        });

        return table;
    };
}

_initializeTable() {
    const data = JSON.parse(this.src || '[]');
    this.table = new Tabulator(this.shadowRoot.getElementById('tabulator'), {
        data: data,
        columns: this._generateColumns(data),
        layout: "fitColumns"
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
