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

  _hasUpdatedRadioControl = false;

  constructor() {
    super();
    this.oTarget = '';
    this.oValue = '';
    this.oBool = false;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Check if oBool has changed and is now true, and if the update hasn't happened yet
    if (changedProperties.has('oBool') && this.oBool && !this._hasUpdatedRadioControl) {
      this._updateRadioControlValue();
      this._hasUpdatedRadioControl = true; // Set the flag to true after the update
    }
  }

  _updateRadioControlValue() {
    // Update the radio control's value when needed
    console.log(this.oTarget)
    console.log(this.oValue)
    console.log(this.oBool)
    console.log("Setting to: ", this.oValue);
    const targetRadioLabel = this.shadowRoot.querySelector(`.nx-zinc-control-group label[data-e2e="set-${this.oTarget}"]`);
    if (targetRadioLabel) {
      const targetRadioInput = targetRadioLabel.querySelector('input');
      if (targetRadioInput) {
        targetRadioInput.value = this.oValue;
      }
    }
  }
}

customElements.define('neo-express', expressElement);
