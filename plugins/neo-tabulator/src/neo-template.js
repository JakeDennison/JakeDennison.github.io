import { LitElement, html, css } from 'lit';
import Tabulator from 'tabulator-tables'; // Import Tabulator (make sure to install it first or include it in your project)
import 'tabulator-tables/dist/css/tabulator.min.css'; // Import Tabulator CSS

class TabulatorElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-template',
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
    return css`
      :host {
        display: block;
      }
    `;
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
