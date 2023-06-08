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

  static get styles() {
    return css`
      :host {
        display: block;
      }

      #container {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: flex-start;
        width: 100%;
      }

      #tokenContainer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        margin-bottom: 4px;
      }

      .token {
        display: inline-flex;
        align-items: center;
        padding: 4px 8px;
        background-color: #e0e0e0;
        border-radius: 4px;
      }

      #tokenInput {
        flex: 1;
        margin-right: 4px;
        padding: 4px 8px;
      }

      #dropdown {
        display: none;
        width: 100%;
      }

      #container.focus-within #dropdown {
        display: block;
      }
    `;
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
    const data = JSON.parse(this.dsvdata);
    const selectedOptions = data.filter(item => this.outputJSON.includes(item[this.valueKey]));
  
    return html`
      <div id="container">
        <div id="tokenContainer">
          ${selectedOptions.map(item => html`<div class="token">${item[this.displayKey]}</div>`)}
        </div>
        <input type="text" id="tokenInput" @keydown="${this.handleKeyDown}">
        <select id="dropdown" multiple @change="${this.handleValueChange}">
          ${data.map(item => html`<option value="${item[this.valueKey]}">${item[this.displayKey]}</option>`)}
        </select>
      </div>
    `;
  }
  
  
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const tokenInput = this.shadowRoot.getElementById('tokenInput');
      const value = tokenInput.value.trim();
      if (value !== '') {
        this.addToken(value);
        tokenInput.value = '';
      }
    }
  }
  
  handleValueChange(event) {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map(option => option.value);
    this.outputJSON = JSON.stringify(selectedValues);
    this.requestUpdate();
  }
  
  addToken(value) {
    const tokenContainer = this.shadowRoot.getElementById('tokenContainer');
    const token = document.createElement('div');
    token.classList.add('token');
    token.textContent = value;
    tokenContainer.appendChild(token);
  }

}

customElements.define('neo-multi', neomulti);