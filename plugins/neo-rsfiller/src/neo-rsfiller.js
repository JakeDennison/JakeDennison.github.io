import { LitElement, html, css } from 'lit';

class rsFillerElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-rsfiller',
      fallbackDisableSubmit: false,
      description: 'Repeating section filler',
      iconUrl: "repeating-section",
      groupName: 'Form Tools',
      version: '1.0',
      properties: {
        RSJson: {
          type: 'string',
          title: 'Repeating section data',
          description: 'JSON containing repeating section data'
        },
        RSTarget: {
          type: 'string',
          title: 'Target class',
          description: 'Class name used to target repeating section'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  
  constructor() {
    super();
    this.RSTarget = ""
    console.log(this.RSTarget)
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.findAndClickButton();
  }

  findAndClickButton() {
    if (this.RSTarget) {
      const siblingButton = this.RSTarget.nextElementSibling.querySelector("button.btn-repeating-section-new-row");
      if (siblingButton) {
        siblingButton.click(); // Programmatically click the button
      }
    }
  }

  handleButtonClick() {
    // Your code here to handle the button click
    console.log("Button clicked");
  }

  render() {
    // You can add the template for your web component here
  }
}

customElements.define('neo-rsfiller', rsFillerElement);