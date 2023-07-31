import { LitElement, html, css } from 'lit';
import {unitsOfMeasurement} from './units'

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
      description: 'Control for diplaying units of measurement',
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
          isValueField: true,
          staticProperties: true,
        },
        decimalplaces: {
          type: 'integer',
          title: 'Decimal places',
          description: 'enter 0 for none, 1 for .0, 2 for .01 etc.',
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
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
      events: ["ntx-value-change"],
    };
  }

  static properties = {
    unittype: "unit",
    unitvalue: "",
    decimalplaces: 0
  };

  constructor() {
    super();
    this.unittype = "unit"
    this.unitvalue = ""
    this.decimalplaces = 0
  }

  updated(changedProperties) {
    if (changedProperties.has('unittype')) {
      this.unittype = this.unittype || "unit";
    }
  }

  static get styles() {
    const { cssRules } = document.styleSheets[0]
    const globalStyle = css([Object.values(cssRules).map(rule => 
    rule.cssText).join('\n')])
    return [
      globalStyle,
      css`
        .neo-unit-control {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          width: 100%;
          box-sizing: border-box;
        }

        .neo-unit-control .input-unit-group-append {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          border-color: #898F94;
          background: #FFFFFF;
          font-size: 14px;
          display: flex;
        }
        
        .neo-unit-control .input-unit-group-append .neo-btn-input-icon:last-child {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
        }
        
        .neo-unit-control .neo-unit-btn-icon {
          color: #006BD6;
          font-size: 20px;
          padding-left: 7px;
          padding-right: 7px;
        }
        
        .neo-unit-control .input-unit-group-append .neo-unit-btn {
          border-radius: 4px 0 0 4px;
          cursor: default;
          border-left: 1px solid;
          border-right: none;
          border-color: inherit;
          min-width: 36px;
          color: #006bd6;
          font-size: 20px;
          font-style: normal;
          overflow: hidden;
          line-height: var(--bs-body-line-height); /* Add this line to inherit line-height */
          min-height:35px;
        }     
        
        .neo-btn-input-icon {
          border-left: 1px solid;
          border-right: 1px solid;
          border-top: 1px solid;
          border-bottom: 1px solid;
          border-color: inherit;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 0;
          background-color: transparent;
          cursor: pointer;
        }
        
      .neo-unit-control .nx-zinc-control-input {
        display: flex;  
        flex: 1;
      }

      .neo-unit-control .nx-zinc-control-input .input-group {
        align-items: stretch;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        width: 100%;
      }

      .neo-unit-control > div.nx-zinc-control-input > ntx-simple-number > input{
        word-break: break-word;
        user-select: none;
        box-sizing: border-box;
        margin: 0;
        appearance: none;
        display: flex;
        font-weight: 400;
        line-height: 1;
        padding: .4375rem .75rem;
        transition: none;
        width: 100%;
        height: auto;
        border: 1px solid #898f94;
        text-align: right;
        caret-color: #161718;
        color: #161718;
        border-color: #898F94;
        font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
        background: #FFFFFF;
        font-size: 14px;
        border-radius: 0 4px 4px 0;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        outline: none;
        outline-offset: 0;
      }
      `
    ];
  }

  onChange(e) {
    // Ensure value maintains decimal places
    const inputValue = e.target.value;
    const trimmedValue = inputValue.trim();
    const numericValue = parseFloat(trimmedValue);
  
    let displayedValue = ""; // Initialize the displayedValue
  
    if (!isNaN(numericValue)) {
      // Apply rounding if enabled
      if (this.boolRound) {
        displayedValue = numericValue.toLocaleString(undefined, { minimumFractionDigits: this.decimalplaces + 1, maximumFractionDigits: this.decimalplaces + 1 });
      } else {
        displayedValue = numericValue.toLocaleString(undefined, { minimumFractionDigits: this.decimalplaces, maximumFractionDigits: this.decimalplaces });
      }
  
      // Apply fixed value behavior if enabled
      if (this.boolFixed) {
        displayedValue = displayedValue.padEnd(displayedValue.indexOf('.') + this.decimalplaces + 1, '0');
      }
    }
  
    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: numericValue,
    });
  
    this.dispatchEvent(customEvent);
    e.target.value = displayedValue;
  }
    
  render() {
    // Calculate the placeholder as before
    const decimalPlaces = this.decimalplaces >= 0 ? this.decimalplaces : 0;
    const placeholder = (0).toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });
  
    // Calculate the displayed value with proper decimal places, rounding, and fixed value behavior
    let displayedValue = "";
    if (this.unitvalue !== "") {
      const numericValue = parseFloat(this.unitvalue);
      
      // Apply rounding if enabled
      if (this.boolRound) {
        displayedValue = numericValue.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces + 1, maximumFractionDigits: decimalPlaces + 1 });
      } else {
        displayedValue = numericValue.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });
      }
  
      // Apply fixed value behavior if enabled
      if (this.boolFixed) {
        displayedValue = displayedValue.padEnd(displayedValue.indexOf('.') + decimalPlaces + 1, '0');
      }
    }
  
    return html`
      <div class="neo-unit-control">
          <div class="input-unit-group-append">
            <button type="button" class="neo-btn-input-icon neo-unit-btn">
              <span>${unitsOfMeasurement[this.unittype].symbol}</span>
            </button>
          </div>
          <div class="nx-zinc-control-input input-group">
            <input type="text"
              data-simple-control="true"
              ntxmaskablenumberinputvalueaccessor=""
              class="form-control nx-theme-input-1 ng-untouched ng-pristine ng-valid"
              inputmode="decimal"
              decimalplaces=${this.decimalplaces}
              placeholder=${placeholder}
              value=${displayedValue}
              @blur=${this.onChange}
            >
          </div>
      </div>
    `;
  }
}

customElements.define('neo-unit', unitElement);
