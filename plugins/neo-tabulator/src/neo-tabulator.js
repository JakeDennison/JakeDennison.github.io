import { LitElement, html } from 'lit';
import { Tabulator } from 'tabulator-tables';
import { tabulatorStyles } from './tabulatorStyles.css.js';
import { tableStyles } from './tableStyles.css.js';

class TabulatorElement extends LitElement {
  static get styles() {
    return [tabulatorStyles, tableStyles];
  }

  static get properties() {
    return {
      src: { type: String }
    };
  }

  constructor() {
    super();
    this.src = '';
  }

  firstUpdated() {
    this.setupTabulator();
  }

  render() {
    return html`<div id="tabulator"></div>`; // Container for the Tabulator table
  }

  setupTabulator() {
    // Check if src data is provided
    if (!this.src) return;

    // Parse src data as JSON
    let jsonData;
    try {
      jsonData = JSON.parse(this.src);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return;
    }

    // Define table columns based on jsonData
    const mainColumns = this.convertToColumnDefinitions(Object.keys(jsonData[0]));

    // Setup the table
    var table = new Tabulator(this.shadowRoot.querySelector("#tabulator"), {
      height: "311px",
      layout: "fitColumns",
      data: jsonData,
      columns: mainColumns,
      rowFormatter: (row) => {
        // Check for nested data to setup subtables
        const rowData = row.getData();
        for (let key in rowData) {
          if (Array.isArray(rowData[key]) && rowData[key].length > 0) {
            const subTableColumns = this.convertToColumnDefinitions(Object.keys(rowData[key][0]));
            this.createSubTable(row, rowData[key], subTableColumns);
          }
        }
      }
    });
  }

  convertToColumnDefinitions(keys) {
    return keys.map(key => {
      // Customize this logic as needed for title conversion
      const title = key.replace(/se_/, '')
                        .replace(/_[0-9a-zA-Z]+$/, '')
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());

      return { title, field: key };
    }).filter(column => !column.field.includes('repeating_section')); // Filter out repeating sections from main columns
  }

  createSubTable(row, data, columns) {
    // Create and style holder elements for subtable
    var holderEl = document.createElement("div");
    var tableEl = document.createElement("div");

    holderEl.style.boxSizing = "border-box";
    holderEl.style.padding = "10px 30px 10px 10px";
    holderEl.style.borderTop = "1px solid #333";
    holderEl.style.borderBottom = "1px solid #333";
    tableEl.style.border = "1px solid #333";

    holderEl.appendChild(tableEl);
    row.getElement().appendChild(holderEl);

    // Initialize the subtable with Tabulator
    new Tabulator(tableEl, {
      layout: "fitColumns",
      data: data,
      columns: columns
    });
  }
}

customElements.define('neo-tabulator', TabulatorElement);
