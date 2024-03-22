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
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupTabulator();
  }

  render() {
    return html`<div id="tabulator"></div>`; 
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

    // Define table
    var table = new Tabulator(this.shadowRoot.querySelector("#tabulator"), {
      height: "311px",
      layout: "fitColumns",
      columnDefaults: {
        resizable: true,
      },
      data: jsonData,
      rowFormatter: function(row) {
        // Check if nested data exists
        for (let key in row.getData()) {
          if (Array.isArray(row.getData()[key])) {
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

            // Create sub-table columns dynamically
            var subTableColumns = [];
            var nestedItem = row.getData()[key][0];
            for (var subKey in nestedItem) {
              subTableColumns.push({ title: subKey, field: subKey });
            }

            // Create sub-table
            var subTable = new Tabulator(tableEl, {
              layout: "fitColumns",
              data: row.getData()[key],
              columns: subTableColumns
            });
          }
        }
      }
    });
  }

}

customElements.define('neo-tabulator', TabulatorElement);
