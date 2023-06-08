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
        defaultIDKey: {
          type: 'integer',
          title: 'Default value ID',
          description: 'Provide the ID value of the item you want to select as default, this will only work if ID is a value key choice in the JSON',
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
    isOpen: { type: Boolean },
    selectedItems: { type: Object },
    selectedDisplayItems: { type: Array },
    defaultIDKey: { type: Number }
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
    this.defaultIDKey = this.defaultIDKey;
    console.log(this.defaultIDKey)
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
                  background-color: white;
                  border: 1px solid gray;
                  border-radius: .25rem;
                  z-index: 1000;
                  padding: 15px;
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
                  padding: .375rem .75rem;
                  font-size: 1rem;
                  line-height: 1.5;
                  color: #495057;
                  background-color: #fff;
                  background-clip: padding-box;
                  border: 1px solid #ced4da;
                  border-radius: .25rem;
                  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                  box-sizing: border-box;
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
      let defaultItem = data.find(item => item[this.valueKey] === this.defaultIDKey);
      if (defaultItem) {
        this.selectItem(defaultItem, false);
      }
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
    this.outputJSON = JSON.stringify(this.selectedItems);
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

  render() {
    return html`
      <div @click="${(e) => e.stopPropagation()}">
          <input class="selectinput"
              @focus="${() => { this.isOpen = true; this.requestUpdate(); }}" 
              .value="${this.selectedDisplayItems.join(', ',)}"
          >
          <div class="dropdown ${this.isOpen ? 'open' : ''}">
              <!-- Assuming dsvdata is a JSON string -->
              ${(JSON.parse(this.dsvdata) || []).map(item => html`
                  <div class="dropdown-item" @click="${(e) => { e.stopPropagation(); this.selectItem(item); }}">
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