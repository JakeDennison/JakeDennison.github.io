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
        for (let key in row.getData()) {
          if (Array.isArray(row.getData()[key])) {
            var holderEl = document.createElement("div");
            var tableEl = document.createElement("div");
            // Styling setup omitted for brevity
  
            holderEl.appendChild(tableEl);
            row.getElement().appendChild(holderEl);
  
            // Initialize sub-table with dynamically generated or schema-defined columns
            new Tabulator(tableEl, {
              layout: "fitColumns",
              data: row.getData()[key],
              columns: generateSubTableColumns(key) // Pass the key for schema-based or the whole nested array for dynamic
            });
          }
        }
      }
    });
  }
  
  
}

customElements.define('neo-tabulator', TabulatorElement);
