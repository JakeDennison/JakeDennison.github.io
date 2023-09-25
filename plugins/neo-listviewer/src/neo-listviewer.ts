import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

import { pluginContractSchema } from '@nintex/form-plugin-contract';
import { pluginContract } from './Contract';

// Use the imported pluginContract as pluginData
const pluginData = pluginContract;

// Validate the plugin data against the pluginContractSchema
const validatedData = pluginContractSchema.parse(pluginData);
console.log(validatedData);

@customElement('my-tabulator-table')
export class MyTabulatorTable extends LitElement {

  // Define styles for your custom element
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

firstUpdated() {
  const tableData = [
    { id: 1, name: "John", age: 28, col: "red" },
    // ... more data
  ];

  if (this.shadowRoot) {
    const tableElement = this.shadowRoot.getElementById("example-table");
    if (tableElement) {
      const table = new (Tabulator as any)(tableElement, {
        data: tableData,
        columns: [
          { title: "Name", field: "name", width: 200 },
          { title: "Age", field: "age", align: "left", formatter: "progress" },
          { title: "Favourite Color", field: "col" },
        ],
      });
    } else {
      console.error("Element with ID 'example-table' not found in shadow root.");
    }
  } else {
    console.error("Shadow root does not exist or its mode is not 'open'.");
  }
}

  render() {
    return html`<div id="example-table"></div>`;
  }
}
