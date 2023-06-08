import { LitElement, html, css } from 'lit';

class neomulti extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-multi',
      fallbackDisableSubmit: false,
      description: 'Provide a multiple select dropdown based on a data source variable.',
      iconUrl: 'Lookup',
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dsvdata: {
          type: 'string',
          title: 'DSV Output string',
          description: 'Provide the data source variable output as a string using a convert to string function variable'
        },
        outputJSON: {
          type: 'string',
          title: 'Output JSON',
          description: 'Provide the data source variable output as a string using a convert to string function variable',
        },
      },
      events: ['ntx-value-change'],
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static styles = css`
    .token {
      display: inline-block;
      padding: 4px 8px;
      margin: 4px;
      background-color: #f2f2f2;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  onChange(e) {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    const outputJSON = JSON.stringify(selectedOptions);
    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: outputJSON }));
  }

  render() {
    const data = this.parseDataObject();

    if (!data || data.length === 0) {
      return html`
        <p>No Data Found</p>
      `;
    }

    const selectedItems = new Set(); // Track the selected items

    const handleOptionClick = (event) => {
      const selectedItem = event.target.value;
      if (selectedItems.has(selectedItem)) {
        selectedItems.delete(selectedItem);
      } else {
        selectedItems.add(selectedItem);
      }
      this.requestUpdate();
    };

    const handleTokenClick = (event) => {
      const selectedItem = event.target.dataset.item;
      selectedItems.delete(selectedItem);
      this.requestUpdate();
    };

    const dropdownOptions = data.map((item) => html`
      <option value="${item}" @click="${handleOptionClick}" ?selected="${selectedItems.has(item)}">${item}</option>
    `);

    const tokens = [...selectedItems].map((item) => html`
      <span class="token" @click="${handleTokenClick}" data-item="${item}">${item}</span>
    `);

    return html`
      <div>
        <select multiple @change="${this.onChange}">
          ${dropdownOptions}
        </select>
        <div>
          ${tokens}
        </div>
      </div>
    `;
  }
}

customElements.define('neo-multi', neomulti);
