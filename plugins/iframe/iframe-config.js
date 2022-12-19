import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
​
// define the component
export class CustomInput extends LitElement {
  // return a promise for contract changes.
  static async getMetaConfig() {
    return {
      controlName: 'Custom input',
      fallbackDisableSubmit: false,
      version: '1.2',
    };
  }
​
  render() {
    return html`<input placeholder="custom input" />`;
  }
}
​
// registering the web component
const elementName = 'custom-input';
customElements.define(elementName, CustomInput);
		