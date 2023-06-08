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
    isOpen: { type: Boolean },
    selectedItems: { type: Object },
    selectedDisplayItems: { type: Array },
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
  }

  static get styles() {
    return css`
        :host {
            position: relative;
        }

        .dropdown {
            display: none;
            position: absolute;
            background-color: white;
            border: 1px solid gray;
            z-index: 1000; /* some high value */
        }

        .dropdown.open {
            display: block;
        }

        .dropdown-item {
            cursor: pointer;
            padding: 5px;
        }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.boundClickHandler = this.handleWindowClick.bind(this);
    window.addEventListener('click', this.boundClickHandler);
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

  selectItem(item) {
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
      <div @click="${(e) => e.stopPropagation()}">
          <label>${this.displayKey}</label>
          <input 
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