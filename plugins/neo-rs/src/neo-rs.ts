import { LitElement, html, css, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { PluginContract, PropType as PluginProperty } from '@nintex/form-plugin-contract';

// Define the contract information using @nintex/form-plugin-contract
const rsElementContract: PluginContract = {
  version: '1.0',
  fallbackDisableSubmit: false,
  controlName: 'neo-rs',
  description: 'Repeating section manipulator',
  iconUrl: 'repeating-section',
  groupName: 'Form Tools',
  properties: {
    rsnumber: {
      type: 'number',
      title: 'Number of sections by default',
      description: 'Please ensure the default value of sections is not changed from 1',
    },
    rstarget: {
      type: 'string',
      title: 'Target class',
      description: 'Class name used to target repeating section',
    },
  },
  standardProperties: {
    fieldLabel: true,
    description: true,
  },
};

class rsElement extends LitElement {
  @property({ type: Number }) rsnumber: number;
  rstarget: string = '';

  constructor() {
    super();
    this.rsnumber = 0;
    this.rstarget = '';
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.runActions();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('rsnumber')) {
      this.runActions();
      this.requestUpdate();
    }
  }

  private runActions() {
    console.log('runActions called');
    console.log('rsnumber:', this.rsnumber);
  
    // Construct the class selector based on this.rstarget
    const targetClassName = this.rstarget;
  
    // Select the repeating section with the dynamic target class
    const targetRepeatingSection = this.shadowRoot!.querySelector(`.${targetClassName}`);
  
    if (targetRepeatingSection) {
      // Find the next sibling element (which should be the button)
      const button = targetRepeatingSection.nextElementSibling as HTMLButtonElement;
  
      if (button) {
        // Click the button to add new repeating sections
        for (let i = 0; i < this.rsnumber - 1; i++) {
          button.click();
        }
      }
    }
  
    // Handle clearing existing repeating sections when rsnumber changes
    this.clearExistingRepeatingSections();
  }
  
  private clearExistingRepeatingSections() {
    // Select all delete buttons for existing repeating sections
    const deleteButtons = this.shadowRoot!.querySelectorAll("button.ntx-repeating-section-remove-button");
  
    // Click each delete button to remove existing repeating sections
    for (const deleteButton of deleteButtons) {
      (deleteButton as HTMLButtonElement).click(); // Cast to HTMLButtonElement
    }
  }
  
  render() {
    return html`
      <div>rsNumber: ${this.rsnumber}</div>
    `;
  }

  // Include the contract information using @nintex/form-plugin-contract
  static getMetaConfig(): PluginContract {
    return rsElementContract;
  }
}

customElements.define('neo-rs', rsElement);