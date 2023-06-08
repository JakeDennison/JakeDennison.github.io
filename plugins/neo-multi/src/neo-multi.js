import { LitElement, html, css, eventOptions } from 'lit';

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
    // Parse the JSON data from the dsvdata property
    const data = JSON.parse(this.dsvdata);
  
    // Create an array of option elements based on the displayKey property
    const options = data.map(item => html`
      <option value="${item[this.valueKey]}">${item[this.displayKey]}</option>
    `);
  
    // Render the dropdown list control with the options
    return html`
      <select @change="${this.handleValueChange}">
        ${options}
      </select>
    `;
  }

  handleValueChange(event) {
    const selectedValue = event.target.value;
    // Dispatch the 'ntx-value-change' event with the selected value
    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: selectedValue }));
  }

}

customElements.define('neo-multi', neomulti);