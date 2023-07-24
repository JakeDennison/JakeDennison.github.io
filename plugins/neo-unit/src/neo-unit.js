import { LitElement, html, css } from 'lit';
import {unitsOfMeasurement} from './units'

class unitElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    const unitKeys = Object.keys(unitsOfMeasurement);
    const enumChoices = unitKeys.map((key) => `${key} (${unitsOfMeasurement[key].symbol})`);
    return {
      controlName: 'neo-unit',
      fallbackDisableSubmit: false,
      description: 'Control for diplaying units of measurement',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-unit/dist/unit-icon.svg",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        unittype: {
          title: 'Choice field',
          type: 'string',
          enum: enumChoices,
          verticalLayout: true,
          defaultValue: enumChoices[0],
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
          title: 'Decimal place',
          description: 'enter 0 for none, 1 for .0, 2 for .01 etc.',
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

  static get styles() {
    const { cssRules } = document.styleSheets[0]
    const globalStyle = css([Object.values(cssRules).map(rule => 
    rule.cssText).join('\n')])
    return [
      globalStyle,
      css`
        :host {
          display: block;
        }
        .neo-unit-control {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          width: 100%;
        }
        
        .neo-unit-control .input-unit-group-append {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          border-color: #898F94;
          background: #FFFFFF;
          font-size: 14px;
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
          flex: 1;
      }

      .neo-unit-control .ntx-simple-number {
        width: 100%; /* Set the width of ntx-simple-number to 100% */
        box-sizing: border-box; /* Ensure the box model includes padding and border */
        display: flex; /* Enable flex layout for ntx-simple-number */
      }

      .neo-unit-control > div.nx-zinc-control-input > ntx-simple-number > input{
        word-break: break-word;
        user-select: none;
        box-sizing: border-box;
        margin: 0;
        appearance: none;
        display: block;
        font-weight: 400;
        line-height: 1;
        padding: .4375rem .75rem;
        transition: none;
        width: 100%; /* Set the width of the input to 100% */
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
      }
      `
    ];
  }

  onChange(e) {
    // Parse the input value as a float
    const inputValue = parseFloat(e.target.value);

    // Calculate the displayed value with proper decimal places and rounding
    const decimalPlaces = this.decimalplaces >= 0 ? this.decimalplaces : 0;
    const displayedValue = isNaN(inputValue) ? "" : inputValue.toFixed(decimalPlaces);

    // Update the input value with the displayed value
    e.target.value = displayedValue;

    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: inputValue,
    });

    this.dispatchEvent(customEvent);
  }
  
  render() {
    // Calculate the placeholder as before
    const decimalPlaces = this.decimalplaces >= 0 ? this.decimalplaces : 0;
    const placeholder = parseFloat(0).toFixed(decimalPlaces);

    // Calculate the displayed value with proper decimal places
    const displayedValue = this.unitvalue !== "" ? parseFloat(this.unitvalue).toFixed(decimalPlaces) : "";

    return html`
      <div class="neo-unit-control">
        <div class="input-unit-group-append">
          <button type="button" class="neo-btn-input-icon neo-unit-btn">
            <span>${this.unittype}</span>
          </button>
        </div>
        <div class="nx-zinc-control-input">
          <ntx-simple-number>
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
          </ntx-simple-number>
        </div>
      </div>
    `;
  }  
}

customElements.define('neo-unit', unitElement);
