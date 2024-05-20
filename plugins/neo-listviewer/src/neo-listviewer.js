import { LitElement, html, css } from 'lit';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

class listviewerElement extends LitElement {
  static get properties() {
    return {
      dataobj: { type: String },
    };
  }

  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-listviewer',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dataobj: {
          type: 'object',
          title: 'SP List Object',
          description: 'Insert SP List object from DSV'
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
      .tabulator {
        height: 500px;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.dataobj = {};
  }

  firstUpdated() {
    this.initTabulator();
  }

  updated(changedProperties) {
    if (changedProperties.has('dataobj')) {
      this.initTabulator();
    }
  }

  initTabulator() {
    const data = this.dataobj.items || [];
    const columns = data.length > 0 ? Object.keys(data[0]).map(key => ({ title: key, field: key })) : [];

    new Tabulator(this.shadowRoot.querySelector('#table'), {
      data: data,
      columns: columns,
      layout: 'fitColumns',
      pagination: 'local',
      paginationSize: 10,
      movableColumns: true,
      resizableColumns: true,
    });
  }

  render() {
    return html`
      <div id="table" class="tabulator"></div>
    `;
  }
}

customElements.define('neo-listviewer', listviewerElement);
