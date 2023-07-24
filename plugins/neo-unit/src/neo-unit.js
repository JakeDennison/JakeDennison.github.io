import { LitElement, html, css } from 'lit';

class unitElement extends LitElement {
  static getMetaConfig() {
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
          title: 'Choice field',
          type: 'string',
          enum: ['kg.', 'ltr.', 'km'],
          verticalLayout: true,
          defaultValue: 'kg.',
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
          description: 'enter -1 for none, 1 for .0, 2 for .01 etc.',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
      events: ["ntx-value-change"],
    };
  }
  
  constructor() {
    super();
    this.unittype = "kg."
    this.unitvalue = ""
    this.decimalplaces = ""
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
      
      .neo-unit-control .input-unit-group-append > .neo-unit-btn:last-child {
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
      
    ntx-simple-currency .nx-simple-currency-control .nx-zinc-control-input.input-group {
        display: flex;
        flex: 1;
    }
      `
    ];
  }

  onChange(e) {
    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: e.target.value,
    });
  
    this.dispatchEvent(customEvent);
  }
  
  render() {
    return html`
      <div class="neo-unit-control">
        <div class="input-unit-group-append">
          <button type="button" class="neo-btn-input-icon neo-unit-btn">
            <span>${this.unittype}</span>
          </button>
        </div>
        <div class="nx-zinc-control-input input-group">
          <ntx-simple-number>
            <input type="text" 
              data-simple-control="true"
              class="form-control nx-theme-input-1 ng-untouched ng-pristine ng-valid" 
              decimalplaces=${this.decimalplaces}
              @blur=${this.onChange}
            >
          </ntx-simple-number>
        </div>
      </div>
    `;
  }  
}

customElements.define('neo-unit', unitElement);
