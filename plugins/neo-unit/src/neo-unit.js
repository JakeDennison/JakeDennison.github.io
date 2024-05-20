import { LitElement, html } from 'lit';
import { unitsOfMeasurement } from './units';

class unitElement extends LitElement {
  static getMetaConfig() {
    // get units for selection
    const unitKeys = Object.keys(unitsOfMeasurement);
    const filteredKeys = unitKeys.filter((key) => key !== "unit");
    const enumChoices = filteredKeys.map((key) => `${key}`);
    // plugin contract information
    return {
      controlName: 'neo-unit',
      fallbackDisableSubmit: false,
      description: 'Control for displaying units of measurement',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-unit/dist/unit-icon.svg",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        unittype: {
          title: 'Select unit of measurement',
          type: 'string',
          enum: enumChoices,
          verticalLayout: true,
          defaultValue: "Meter (m)",
        },
        unitvalue: {
          type: 'number',
          title: 'Unit value',
          description: 'Decimal unit value',
          staticProperties: true,
        },
        decimalplaces: {
          type: 'integer',
          title: 'Decimal places',
          description: 'Enter 0 for none, 1 for .0, 2 for .01 etc.',
          defaultValue: 0,
        },
        boolRound: {
          type: 'boolean',
          title: 'Enable rounding',
          description: 'Allow values to be rounded. e.g. for 2 decimal places 12.129 becomes 12.13',
          defaultValue: false,
        },
        boolFixed: {
          type: 'boolean',
          title: 'Ensure fixed value',
          description: 'Ensure fixed values are output, with this enabled 10.10 will output as 10.10 instead of 10.1',
          defaultValue: false,
        },
        outputobj: {
          type: 'object',
          title: 'Unit Output',
          description: 'This is for output only please ignore.',
          isValueField: true,
          properties: {
            unittype: {
              title: 'Unit of measurement',
              type: 'string',
            },
            unitvalue: {
              type: 'number',
              title: 'Unit value',
              description: 'Decimal unit value',
            },
            decimalplaces: {
              type: 'integer',
              title: 'Decimal places',
              description: 'Enter 0 for none, 1 for .0, 2 for .01 etc.',
            },
            boolRound: {
              type: 'boolean',
              title: 'Enable rounding',
              description: 'Allow values to be rounded. e.g. for 2 decimal places 12.129 becomes 12.13',
            },
            boolFixed: {
              type: 'boolean',
              title: 'Ensure fixed value',
              description: 'Ensure fixed values are output, with this enabled 10.10 will output as 10.10 instead of 10.1',
            },
          }
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
        readOnly: true,
      },
      events: ["ntx-value-change"],
    };
  }

  static properties = {
    unittype: { type: String },
    unitvalue: { type: Number },
    decimalplaces: { type: Number },
    boolRound: { type: Boolean },
    boolFixed: { type: Boolean },
    outputobj: { type: Object },
  };

  constructor() {
    super();
    this.unittype = "unit";
    this.unitvalue = "";
    this.decimalplaces = 0;
    this.boolRound = false;
    this.boolFixed = false;
    this.outputobj = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('unittype') || changedProperties.has('decimalplaces') || changedProperties.has('boolRound') || changedProperties.has('boolFixed')) {
      this.onChange();
    }
  }

  handleBlur() {
    // Apply decimal places and formatting
    const inputElement = this.shadowRoot.querySelector('input');
    let value = parseFloat(inputElement.value);
  
    if (!isNaN(value)) {
      // Format the value with the correct number of decimal places
      value = value.toFixed(this.decimalplaces);
      // Update the input element with the formatted value
      inputElement.value = value;
      // Update the unitvalue property with the formatted value
      this.unitvalue = parseFloat(value);
    } else {
      // If the value is not a number, clear the input
      inputElement.value = '';
      this.unitvalue = '';
    }
  
    // Call onChange to return the value
    this.onChange();
  }  
  
  onChange() {
    // Create the output object
    const outputObject = {
      unittype: this.unittype,
      unitvalue: this.unitvalue,
      decimalplaces: this.decimalplaces,
      boolRound: this.boolRound,
      boolFixed: this.boolFixed
    };
  
    // Dispatch the custom event with the output object
    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: outputObject,
    });
  
    this.dispatchEvent(customEvent);
  }
  
  render() {
    const decimalPlaces = this.decimalplaces >= 0 ? this.decimalplaces : 0;
    const placeholder = (0).toFixed(decimalPlaces);
    const valueToShow = this.unitvalue || '';
  
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="neo-unit-control">
        <div class="input-group">
          <span class="input-group-text">${unitsOfMeasurement[this.unittype].symbol}</span>
          <input type="text" class="form-control text-end"
            .value=${valueToShow}
            placeholder=${placeholder}
            @blur=${this.handleBlur.bind(this)}
            ?disabled="${this.readOnly}"
            >
        </div>
      </div>
    `;
  }  
    
}

customElements.define('neo-unit', unitElement);
