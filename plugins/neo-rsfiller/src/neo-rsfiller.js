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
    this.RSJson = '';
    this.RSTarget = ''; // Initialize the RSTarget property
  }

  connectedCallback() {
    super.connectedCallback();

    // If RSTarget is specified and RSJson has data, call the clickSimulation function
    if (this.RSTarget) {
      this.clickSimulation();
    }
  }

  clickSimulation() {
    // Access the shadow DOM
    const shadowRoot = this.shadowRoot;

    if (shadowRoot) {
      // Find the element with the specified class name (RSTarget) within the shadow DOM
      const parentElement = shadowRoot.querySelector('.' + this.RSTarget);

      if (parentElement) {
        // Find the button element inside the parent element with class 'btn-repeating-section-new-row'
        const button = parentElement.querySelector('button.btn-repeating-section-new-row');

        if (button) {
          // Simulate a click event on the button
          button.click();
        } else {
          console.log("Button not found inside the parent element with class " + this.RSTarget + ".");
        }
      } else {
        console.log("Parent element with class " + this.RSTarget + " not found.");
      }
    }
  }

  render() {
    return html``;
  }
}

customElements.define('neo-rsfiller', rsFillerElement);