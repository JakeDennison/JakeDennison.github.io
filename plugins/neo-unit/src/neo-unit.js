import { LitElement, html, css } from 'lit';
import { unitsOfMeasurement } from './units';

class UnitElement extends LitElement {
  static getMetaConfig() {
    const unitKeys = Object.keys(unitsOfMeasurement);
    const filteredKeys = unitKeys.filter((key) => key !== "unit");
    const enumChoices = filteredKeys.map((key) => `${key}`);
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

  static get properties() {
    return {
      unittype: { type: String },
      unitvalue: { type: Number },
      decimalplaces: { type: Number },
      boolRound: { type: Boolean },
      boolFixed: { type: Boolean },
      outputobj: { type: Object },
      readOnly: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.unittype = "unit";
    this.unitvalue = 0;
    this.decimalplaces = 0;
    this.boolRound = false;
    this.boolFixed = false;
    this.outputobj = {};
    this.readOnly = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('unittype') || changedProperties.has('decimalplaces') || changedProperties.has('boolRound') || changedProperties.has('boolFixed')) {
      this.onChange();
    }
  }

  handleBlur() {
    const inputElement = this.shadowRoot.querySelector('input');
    let value = parseFloat(inputElement.value);

    if (!isNaN(value)) {
      if (this.boolRound) {
        value = parseFloat(value.toFixed(this.decimalplaces));
      } else {
        const factor = Math.pow(10, this.decimalplaces);
        value = Math.floor(value * factor) / factor;
      }
      const fixedValue = this.boolFixed ? value.toFixed(this.decimalplaces) : value.toString();
      inputElement.value = fixedValue;
      this.unitvalue = parseFloat(fixedValue);
    } else {
      inputElement.value = '';
      this.unitvalue = 0;
    }

    this.onChange();
  }

  onChange() {
    const outputObject = {
      unittype: this.unittype,
      unitvalue: this.unitvalue,
      decimalplaces: this.decimalplaces,
      boolRound: this.boolRound,
      boolFixed: this.boolFixed
    };

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
    const valueToShow = this.unitvalue !== 0 ? this.unitvalue.toFixed(decimalPlaces) : '';

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="neo-unit-control">
        <div class="input-group">
          <input type="text" class="form-control text-end"
            .value=${valueToShow}
            placeholder=${placeholder}
            @blur=${this.handleBlur.bind(this)}
            ?disabled="${this.readOnly}"
            >
            <span class="input-group-text">${unitsOfMeasurement[this.unittype].symbol}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('neo-unit', UnitElement);
