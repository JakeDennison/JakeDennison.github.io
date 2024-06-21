import { LitElement, html } from 'lit';

class ArrayElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-array',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'neo',
      version: '1.0',
      properties: {
        input: {
          type: 'string',
          title: 'Array String',
          description: 'Please insert the array as a string'
        },
        output: {
          type: 'object',
          title: 'Output Object',
          description: 'Do not use, Output only',
          isValueField: true,
        },
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    input: { type: String },
    output: { type: Object },
  };

  constructor() {
    super();
    this.input = '';
    this.output = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('input')) {
      this.handleInputChange();
    }
  }

  handleInputChange() {
    try {
      const array = JSON.parse(this.input);
      if (Array.isArray(array)) {
        this.output = { array: array };
      } else {
        throw new Error('Input is not a valid array');
      }
    } catch (error) {
      console.error('Invalid array string:', error);
      this.output = { error: 'Invalid array string' };
    }

    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      detail: this.output,
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  render() {
    return html``;
  }
}

customElements.define('neo-array', ArrayElement);
