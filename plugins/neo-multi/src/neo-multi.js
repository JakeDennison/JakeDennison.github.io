import { LitElement, html, css } from 'lit';

class neomulti extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-multi',
      fallbackDisableSubmit: false,
      description: 'Provide a multiple select dropdown based on a data source variable.',
      iconUrl: 'data-lookup',
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
          returnAsValue: true,
        },
        defaultIDKey: {
          type: 'string',
          title: 'Default ID Key',
          description: 'Provide the JSON key containing the default value ID (e.g. ID or RecordID)',
        },
        defaultIDValue: {
          type: 'string',
          title: 'Default value unique identifiers',
          description: 'You can use the UIDs of the items you want to select by semi-colon separating them e.g. 2;4;6',
        },
      },
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
    isOpen: { type: Boolean },
    selectedItems: { type: Object },
    selectedDisplayItems: { type: Array },
    defaultIDKey: { type: String },
    defaultIDValue: { type: String },
    removeToken: { type: Function },
  };


  constructor() {
    super();
    this.dsvdata = "";
    this.displayKey = "";
    this.valueKey = "";
    this.outputJSON = "";
    this.isOpen = false;
    this.selectedItems = [];
    this.selectedDisplayItems = [];
    this.defaultIDKey = ""
    this.defaultIDValue = ""
    console.log(this.defaultIDKey)
    console.log(this.defaultIDValue)
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        width: 100%;
      }
  
      .dropdown {
        display: none;
        position: absolute;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        background-color: var(--ntx-form-theme-color-field-and-modal, #fff);
        border: 1px solid var(--ntx-form-theme-color-border, #ced4da);
        border-radius: var(--ntx-form-theme-border-radius, .25rem);
        z-index: 1000;
        padding: 5px;
        box-sizing: border-box;
      }
  
      .dropdown.open {
        display: block;
      }
  
      .dropdown-item {
        display: flex;
        align-items: center;
        padding: 5px;
      }
  
      .dropdown-item input[type="checkbox"] {
        margin-right: 10px;
      }
  
      .selectinput {
        width: 100%;
        padding: 0 0.375rem;
        padding-bottom: 5px;
        font-size: var(--ntx-form-theme-text-input-size, 14px);
        line-height: 1.5;
        color: var(--ntx-form-theme-color-text-input, #495057);
        background-color: var(--ntx-form-theme-color-field-and-modal, #fff);
        background-clip: padding-box;
        border: 1px solid var(--ntx-form-theme-color-border, #ced4da);
        border-radius: var(--ntx-form-theme-border-radius, .25rem);
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        box-sizing: border-box;
        min-height: var(--ntx-form-theme-control-height, 40px);
      }
  
      .token {
        display: inline-block;
        line-height: 1.9;
        padding: 0px 10px;
        margin-top: 5px;
        color: var(--ntx-form-theme-color-form-background, #333);
        border: 1px solid var(--ntx-form-theme-color-primary, rgb(206, 212, 218));
        border-radius: 0.25rem;
        background-color: var(--ntx-form-theme-color-primary, rgb(233, 236, 239));
      }
  
      .remove-token {
        margin-left: 5px;
        cursor: pointer;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.boundClickHandler = this.handleWindowClick.bind(this);
    window.addEventListener('click', this.boundClickHandler);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('dsvdata')) {
      let data = JSON.parse(this.dsvdata);
  
      let defaultValues = this.defaultIDValue.split(";").map(value => {
        let numericValue = Number(value);
        return !isNaN(numericValue) && Number.isInteger(numericValue) ? numericValue : value;
      });
  
      defaultValues.forEach(defaultValue => {
        let defaultItem = data.find(item => item[this.defaultIDKey] == defaultValue);
        if (defaultItem) {
          this.selectItem(defaultItem);
        }
      });
    }
  }
  
  
  
  disconnectedCallback() {
    window.removeEventListener('click', this.boundClickHandler);
    super.disconnectedCallback();
  }

  handleWindowClick(e) {
    if (!this.shadowRoot.contains(e.target)) {
      this.isOpen = false;
      this.requestUpdate();
    }
  }

  selectItem(item, emitEvent = true) {
    const value = item[this.valueKey];
    const display = item[this.displayKey];
    if (this.selectedItems.includes(value)) {
      this.selectedItems = this.selectedItems.filter(i => i !== value);
      this.selectedDisplayItems = this.selectedDisplayItems.filter(i => i !== display);
    } else {
      this.selectedItems.push(value);
      this.selectedDisplayItems.push(display);
    }
  
    this.outputJSON = JSON.stringify(this.selectedItems.map(item => {
      return { [this.valueKey]: item };
    }));
  
    if (emitEvent) {
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
  
  removeToken(item) {
    const index = this.selectedDisplayItems.indexOf(item);
    if (index > -1) {
        this.selectedDisplayItems.splice(index, 1);
        this.selectedItems.splice(index, 1);
    }
    this.outputJSON = JSON.stringify(this.selectedItems.map(item => {
        return { [this.valueKey]: item };
    }));
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.outputJSON,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
}

render() {
  return html`
    <div>
        <div class="selectinput" 
             @click="${(e) => { if (e.target === this.shadowRoot.querySelector('.selectinput')) { this.isOpen = !this.isOpen; this.requestUpdate(); }}}">
            ${this.selectedDisplayItems.map(item => html`
                <span class="token">${item}
                    <span class="remove-token" @click="${() => { this.removeToken(item); this.isOpen = false; this.requestUpdate(); }}">x</span>
                </span>
            `)}
        </div>
        <div class="dropdown" style="display: ${this.isOpen ? 'block' : 'none'};">
            ${(JSON.parse(this.dsvdata) || []).map(item => html`
                <div class="dropdown-item" @click="${() => { this.selectItem(item); }}">
                    <input type="checkbox" .checked="${this.selectedItems.includes(item[this.valueKey])}">
                    ${item[this.displayKey]}
                </div>
            `)}
        </div>
    </div>
  `;
}

}

customElements.define('neo-multi', neomulti);