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
  
    let jsonData;
    try {
      jsonData = JSON.parse(this.src);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return;
    }
  
    let schemaData;
    const hasSchema = this.schema && this.schema.trim() !== '';
    if (hasSchema) {
      try {
        schemaData = JSON.parse(this.schema); // Parse the schema property if it exists
      } catch (error) {
        console.error('Error parsing schema:', error);
        schemaData = null; // Reset schemaData to null if parsing fails
      }
    }
  
    let mainColumns, generateSubTableColumns;
  
    if (schemaData && hasSchema) {
      mainColumns = schemaData.mainColumns;
      generateSubTableColumns = (key) => schemaData.subTables[key] || [];
    } else {
      // Dynamically generate main table columns from the first item, excluding array fields
      const firstItemKeys = Object.keys(jsonData[0]);
      mainColumns = firstItemKeys.reduce((acc, key) => {
        if (!Array.isArray(jsonData[0][key])) {
          acc.push({ title: key, field: key });
        }
        return acc;
      }, []);
  
      // Function to generate sub-table columns dynamically
      generateSubTableColumns = (nestedDataArray) => {
        if (!Array.isArray(nestedDataArray) || nestedDataArray.length === 0) {
          console.error('Invalid or empty nested data array');
          return [];
        }
  
        const objectKeys = Object.keys(nestedDataArray[0]);
        return objectKeys.map(key => ({ title: key, field: key }));
      };
    }
  
    // Define the main table
    var table = new Tabulator(this.shadowRoot.querySelector("#tabulator"), {
      height: "311px",
      layout: "fitColumns",
      data: jsonData,
      columns: mainColumns,
      rowFormatter: function(row) {
        Object.keys(row.getData()).forEach(key => {
          const rowData = row.getData()[key];
          if (Array.isArray(rowData)) {
            var holderEl = document.createElement("div");
            var tableEl = document.createElement("div");
      
            // Adjust these styles as necessary to ensure correct display
            holderEl.style.marginTop = "10px";
            holderEl.style.padding = "10px";
            holderEl.style.border = "1px solid #ccc";
            holderEl.style.boxShadow = "0px 0px 5px rgba(0,0,0,0.2)";
            holderEl.className = 'sub-table-holder'; // Use a class for styling if preferred
      
            tableEl.style.width = "100%";
      
            holderEl.appendChild(tableEl);
            // Append holderEl to the cell of the specific field, not just the row
            row.getCell(key).getElement().appendChild(holderEl);
      
            new Tabulator(tableEl, {
              layout: "fitColumns",
              data: rowData,
              columns: generateSubTableColumns(key)
            });
          }
        });
      }
      
    });
  }
  
  
}

customElements.define('neo-tabulator', TabulatorElement);
