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
          properties: {
            outputArray:{
              type: 'array',
              title: 'Array',
            },
          },
        },
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: false,
        description: false,
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
      // First, try to parse as JSON array
      const array = JSON.parse(this.input);
      if (Array.isArray(array)) {
        this.output = { array: array };
      } else {
        throw new Error('Input is not a valid array');
      }
    } catch (error) {
      console.error('Invalid JSON array string:', error);
      // Fallback to handling semicolon-separated values
      const array = this.input.split(';').map(item => item.replace('#', ''));
      this.output = { array: array };
    }

    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      detail: this.output,
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  render() {
    return html`
      <div>Input: ${this.input}</div>
    `;
  }
}

customElements.define('neo-array', ArrayElement);
