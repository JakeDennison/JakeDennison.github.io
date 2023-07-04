import { LitElement, html, css } from 'lit';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import tabulatorStyles from 'tabulator-tables/dist/css/tabulator.min.css';

class listviewElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-listviewer',
      fallbackDisableSubmit: false,
      description: 'Display a list of records',
      iconUrl: "group-control",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dataobject: {
          type: 'string',
          title: 'DSV Object JSON',
          description: 'Insert the DSV JSON string for your list of records.'
        },
        listURL: {
          type: 'string',
          title: 'List URL',
          description: 'The URL of the list used in the DSV, for this to work you need to ensure ID is returned in the DSV data'
        },
        pageItemLimit: {
          type: 'string',
          enum: ['5','10','15', '30', '50', '100'],
          title: 'Page Item Limit',
          description: 'Number of items to show per page',
          defaultValue: '5',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static styles = css`${tabulatorStyles}`;

  static get properties() {
    return {
      dataobject: { type: String },
      pageItemLimit: { type: Number },
      currentPage: { type: Number },
    };
}
  
  constructor() {
    super();
    this.dataobject = '';
    this.pageItemLimit = 5;
    this.currentPage = 0;
  }

  parseDataObject() {
    let tabledata;
  
    try {
      tabledata = JSON.parse(this.dataobject);
      tabledata = this.replaceUnicodeRegex(tabledata);
    } catch (e) {
      console.error(e);
      tabledata = null;
    }
  
    return tabledata;
  }
  
replaceUnicodeRegex(input) {
  const unicodeRegex = /_x([0-9A-F]{4})_/g;
  return JSON.parse(JSON.stringify(input).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
}

  firstUpdated() {
    super.firstUpdated();

    const tabledata = this.parseDataObject();
    if (!tabledata) {
      console.error('Invalid data object');
      return;
    }

    const table = this.shadowRoot.querySelector('#table'); // Get the table div

    // Initialize Tabulator after the component is updated and rendered in the DOM
    new Tabulator(table, {
      data: tabledata,
      layout: 'fitDataFill',
      pagination: 'local',
      paginationSize: this.pageItemLimit,
      paginationSizeSelector: [5, 10, 15, 30, 50, 100],
      movableColumns: true,
      height: 'auto',
      autoColumns: true,
    });
  }

render() {
  return html`<div id="table"></div>`; // Create a div with an id for Tabulator to target
}
}


customElements.define('neo-listviewer', listviewElement);