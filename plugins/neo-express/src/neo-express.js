import { LitElement } from 'lit';

class expressElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-express',
      fallbackDisableSubmit: false,
      description: 'Allow for instant form submission based on rules',
      iconUrl: "boolean",
      groupName: 'Admin Tools',
      version: '1.0',
      properties: {
        oTarget: {
          type: 'string',
          title: 'Outcome Target CSS Class',
          description: 'Apply a CSS class to the outcome control and provide it here'
        },
        oValue: {
          type: 'string',
          title: 'Outcome Value',
          description: 'Provide the value for the outcome.'
        },
        oBool: {
          type: 'boolean',
          title: 'Enabled',
          description: 'If true the form will submit on load, if false it will wait for rule to set the value to true'
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    oTarget: '',
    oValue: '',
    oBool: { type: Boolean },
  };

  constructor() {
    super();
    this.oTarget = '';
    this.oValue = '';
    this.oBool = false;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    // Run the logic on load if oBool is true
    if (this.oBool) {
      this._updateRadioControlValue();
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Check if oBool has changed and is now true
    if (changedProperties.has('oBool') && this.oBool) {
      this._updateRadioControlValue();
    }
  }

  _updateRadioControlValue() {
    // Update the radio control's value when needed
    const radioControl = this.querySelector(`.${this.oTarget}`);
    if (radioControl) {
      radioControl.value = this.oValue;
    }
  }
}

customElements.define('neo-express', expressElement);
