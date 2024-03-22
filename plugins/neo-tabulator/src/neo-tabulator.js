import { LitElement, html } from 'lit';
import { Tabulator } from 'tabulator-tables';
import { tabulatorStyles } from './tabulatorStyles.css.js';
import { tableStyles } from './tableStyles.css.js';

class TabulatorElement extends LitElement {
  static get styles() {
    return [tabulatorStyles, tableStyles];
  }

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

  constructor() {
    super();
    this.src = '';
    this.schema = '';
  }

  firstUpdated() {
    this.setupTabulator();
  }

  render() {
    return html`<div id="tabulator"></div>`;
  }

  setupTabulator() {
    if (!this.src) return;

    let jsonData;
    try {
      jsonData = JSON.parse(this.src);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return;
    }

    let schema;
    try {
      schema = this.schema ? JSON.parse(this.schema) : null;
    } catch (error) {
      console.error('Error parsing schema:', error);
      schema = null;
    }

    const columns = schema ? this.applySchemaMainColumns(schema.mainColumns) : this.generateDynamicColumns(jsonData);

    new Tabulator(this.shadowRoot.querySelector("#tabulator"), {
      height: "311px",
      layout:"fitColumns",
      columnDefaults:{
        resizable:true,
      },
      data: jsonData,
      columns: columns,
      rowFormatter: (row) => {
        if (schema && schema.subTables) {
          this.setupSubTablesUsingSchema(row, schema.subTables);
        } else {
          this.setupDynamicSubTables(row, jsonData);
        }
      }
    });
  }

  applySchemaMainColumns(schemaMainColumns) {
    return schemaMainColumns;
  }

  generateDynamicColumns(jsonData) {
    const firstItemKeys = Object.keys(jsonData[0]);
    return firstItemKeys.reduce((acc, key) => {
      if (!Array.isArray(jsonData[0][key])) {
        acc.push({ title: key, field: key });
      }
      return acc;
    }, []);
  }

  setupSubTablesUsingSchema(row, subTablesSchema) {
    Object.keys(subTablesSchema).forEach(key => {
      if (Array.isArray(row.getData()[key])) {
        this.createSubTable(row, key, subTablesSchema[key]);
      }
    });
  }

  setupDynamicSubTables(row, jsonData) {
    Object.keys(jsonData[0]).forEach(key => {
      if (Array.isArray(row.getData()[key])) {
        const columns = this.generateDynamicColumns(row.getData()[key]);
        this.createSubTable(row, key, columns);
      }
    });
  }

  createSubTable(row, key, columns) {
    var holderEl = document.createElement("div");
    var tableEl = document.createElement("div");
    holderEl.style.boxSizing = "border-box";
    holderEl.style.width = "100%"
    holderEl.style.padding = "10px 20px";
    holderEl.style.borderTop = "1px solid #333";
    holderEl.style.borderBottom = "1px solid #333";
    
    tableEl.style.border = "1px solid #333";
    tableEl.style.boxSizing = "border-box";
    holderEl.style.width = "100%"
    holderEl.appendChild(tableEl);
    row.getElement().appendChild(holderEl);

    new Tabulator(tableEl, {
      layout: "fitColumns",
      data: row.getData()[key],
      columns: columns
    });
  }
}

customElements.define('neo-tabulator', TabulatorElement);
