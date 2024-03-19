import { LitElement, html, css } from 'lit';
import { Tabulator } from 'tabulator-tables';
import tabulatorStyles from 'tabulator-tables/dist/css/tabulator.min.css';
import tableStyles from './tableStyles.css';

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

  static get styles() {
    const tabulatorStyleSheet = new CSSStyleSheet();
    tabulatorStyleSheet.replaceSync(tabulatorStyles);
    const tableStyleSheet = new CSSStyleSheet();
    tableStyleSheet.replaceSync(additionalStyles);
    return [tabulatorStyleSheet, tableStyleSheet];
  }
  
  constructor() {
    super();
    this.src = '';
  }

  firstUpdated() {
    this._initializeTable();
  }

  updated(changedProperties) {
    if (changedProperties.has('src') && this.src) {
      this._updateTable();
    }
  }

  _initializeTable() {
    this.table = new Tabulator(this.shadowRoot.getElementById('tabulator'), {
      data: JSON.parse(this.src), // Set data from the `src` property
      autoColumns: true, // Automatically create columns from data keys
      layout: "fitColumns", // Fit columns to width of table
    });
  }

  _updateTable() {
    const data = JSON.parse(this.src);
    this.table.setData(data);
  }

  render() {
    return html`<div id="tabulator"></div>`; // Container for the Tabulator table
  }
}

customElements.define('neo-tabulator', TabulatorElement);
