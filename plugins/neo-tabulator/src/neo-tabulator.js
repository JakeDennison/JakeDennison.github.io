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
        schema: {
          type: 'string',
          title: 'Table Schema',
          description: 'JSON Schema for building complex table structure'
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
    this.schema= '';
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
  
    // Dynamically generate main table columns from the first item, excluding array fields
    const firstItemKeys = Object.keys(jsonData[0]);
    const mainColumns = firstItemKeys.reduce((acc, key) => {
      if (!Array.isArray(jsonData[0][key])) {
        acc.push({
          title: key,
          field: key,
        });
      }
      return acc;
    }, []);
  
    // Function to generate sub-table columns dynamically
    const generateSubTableColumns = (nestedDataArray) => {
      if (!Array.isArray(nestedDataArray) || nestedDataArray.length === 0) {
        console.error('Invalid or empty nested data array');
        return [];
      }
  
      const objectKeys = Object.keys(nestedDataArray[0]);
      return objectKeys.map(key => ({
        title: key,
        field: key,
      }));
    };
  
    // Define the main table
    var table = new Tabulator(this.shadowRoot.querySelector("#tabulator"), {
      height: "311px",
      layout: "fitColumns",
      data: jsonData,
      columns: mainColumns,
      rowFormatter: function(row) {
        for (let key in row.getData()) {
          if (Array.isArray(row.getData()[key])) {
            console.log("Creating subtable for key:", key, "with data:", row.getData()[key]);
            var holderEl = document.createElement("div");
            var tableEl = document.createElement("div");
            holderEl.style.boxSizing = "border-box";
            holderEl.style.padding = "10px 30px 10px 10px";
            holderEl.style.borderTop = "1px solid #333";
            holderEl.style.borderBottom = "1px solid #333";
            tableEl.style.border = "1px solid #333";
            holderEl.appendChild(tableEl);
            row.getElement().appendChild(holderEl);
  
            // Dynamically generate columns for the sub-table
            var subTable = new Tabulator(tableEl, {
              layout: "fitColumns",
              data: row.getData()[key],
              columns: generateSubTableColumns(row.getData()[key])
            });
          }
        }
      }
    });
  }
  
}

customElements.define('neo-tabulator', TabulatorElement);
