import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TranslateMod extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'translate-mod',
      fallbackDisableSubmit: false,
      description: 'provide a plugin to translate the form',
      iconUrl: "multiline-text",
      groupName: 'Languages',
      version: '1.3',
      properties: {
        propLang: {title: 'Language',type: 'string',enum: ['English', 'German', 'Spanish', 'Dutch'],showAsRadio: false,verticalLayout: true,defaultValue: 'English',
      },
      },
      standardProperties: {
        readOnly: true,
        description: true,
      }
    };
  }

  static properties = {
    propLang: {type: String},
  }
  
  constructor() {
    super();
    this.propLang = 'English';
  }

  static get styles() {
    return css`
      select {
        font-size: 16px;
        padding: 8px;
        margin: 8px;
      }
    `;
  }

  render() {
    return html`
      <select @change="${this._handleLanguageChange}">
        <option value="English">English</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
        <option value="Dutch">Dutch</option>
      </select>
      <p>Selected Option: ${this.selectedOption}</p>
    `;
  }

  _handleLanguageChange(event) {
    this.selectedOption = event.target.value;
  }
}

const elementName = 'translate-mod';
customElements.define('translate-mod', TranslateMod);