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
          // Define columns for the nested data
          const nestedColumns = [];
          const sampleNestedData = item[key][0]; // Take the first object in the array as a sample

          // Iterate over keys of the nested object
          for (const nestedKey in sampleNestedData) {
            if (sampleNestedData.hasOwnProperty(nestedKey)) {
              // Generate column definition for nested data
              nestedColumns.push({
                title: nestedKey, // Customize title as needed
                field: key + "." + nestedKey, // Field name should match the key
              });
            }
          }

          // Add a column for the nested structure
          columns.push({
            title: key, // Customize title as needed
            field: key, // Field name should match the key
            columns: nestedColumns,
            formatter: function(cell, formatterParams, onRendered) {
              // Create a new table element for the nested data
              const table = document.createElement('div');
              table.classList.add('tabulator'); // Add Tabulator class to the nested table
              table.setAttribute('tabulator-layout', 'fitColumns');
              // Iterate over nested data and append rows
              cell.getValue().forEach(nestedItem => {
                const row = document.createElement('div');
                row.classList.add('tabulator-row');
                // Iterate over keys of nested item and append cells
                Object.keys(nestedItem).forEach(nestedKey => {
                  const cell = document.createElement('div');
                  cell.classList.add('tabulator-cell');
                  cell.setAttribute('tabulator-field', nestedKey);
                  cell.textContent = nestedItem[nestedKey];
                  row.appendChild(cell);
                });
                table.appendChild(row);
              });
              return table;
            }
          });
        } else {
          // Define a regular column for non-nested data
          columns.push({
            title: key, // Customize title as needed
            field: key, // Field name should match the key
            formatter: "plaintext" // Default formatter, adjust as needed
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
