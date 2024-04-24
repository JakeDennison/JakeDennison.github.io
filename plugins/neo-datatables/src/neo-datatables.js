import { LitElement, html, css } from 'lit';

class DatatablesElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-datatables',
      fallbackDisableSubmit: false,
      description: 'A component for rendering data tables with support for JSON or XML data formats.',
      iconUrl: "group-control",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dataobj: {
          type: 'string',
          title: 'Data Object',
          description: 'Please provide stringified data'
        },
        datatype: {
          title: 'Object Data Type',
          type: 'string',
          enum: ['JSON', 'XML'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'JSON',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    dataobj: { type: String },
    datatype: { type: String }, // Make sure to define it as a property
  };

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        border: 1px solid #ccc;
      }
    `;
  }

  constructor() {
    super();
    this.dataobj = '';
    this.datatype = 'JSON'; // Default to JSON
    this.tableData = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('dataobj') && this.dataobj) {
      this.processData(this.dataobj, this.datatype);
    }
  }

  processData(data, type) {
    if (type === 'JSON') {
      try {
        this.tableData = JSON.parse(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    } else if (type === 'XML') {
      this.tableData = this.xmlToJson(data);
    }
  }

  xmlToJson(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    let json = {};
    return json;
  }

  render() {
    return html`
      <div>
        <h1>Data Table</h1>
        <table>
          <!-- Table content rendered here -->
        </table>
      </div>
    `;
  }
}

customElements.define('neo-datatables', DatatablesElement);
