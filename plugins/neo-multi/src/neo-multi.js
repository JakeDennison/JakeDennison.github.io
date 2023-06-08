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
          title: 'JSON Input',
          description: 'Provide the data source variable as a JSON array.',
        },
        displayKey: {
          type: 'string',
          title: 'Display Key',
          description: 'Specify the key of the object to be displayed in the dropdown.',
        },
        valueKey: {
          type: 'string',
          title: 'Value Key',
          description: 'Specify the key of the object to be used as the value in the output JSON.',
        },
        outputJSON: {
          type: 'string',
          title: 'Output JSON',
          description: 'Provide the data source variable output as a string using a convert to string function variable',
          isValueField: true,
        },
      },
      events: ['ntx-value-change'],
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static properties = {
    dsvdata: { type: String },
    displayKey: { type: String },
    valueKey: { type: String },
    outputJSON: { type: String },
  };

  constructor() {
    super();
    this.dsvdata = "";
    this.displayKey = "";
    this.valueKey = "";
    this.outputJSON = "";
  }

  render() {
    return html`
        <div>
            <label>${this.displayKey}</label>
            <select multiple @blur="${this.handleSelect}">
                <!-- Assuming dsvdata is a JSON string -->
                ${(JSON.parse(this.dsvdata) || []).map(item => html`
                    <option value="${item[this.valueKey]}">${item[this.displayKey]}</option>
                `)}
            </select>
        </div>
    `;
}

handleSelect(e) {
    let selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
    this.outputJSON = JSON.stringify(selectedValues);
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.outputJSON,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
}


}

customElements.define('neo-multi', neomulti);