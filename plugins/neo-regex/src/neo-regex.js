import { LitElement, html, css } from 'lit';

class NeoRegex extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-regex',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "one-line-text",
      groupName: 'neo',
      version: '1.0',
      properties: {
        inputText: {
          type: 'string',
          title: 'Input Text',
          description: 'Please provide the input string you want to interrogate'
        },
        operation: {
          title: 'Choice field',
          type: 'string',
          enum: ['Check Match', 'Split', 'Extract', 'Group', 'Replace'],
          showAsRadio: true,
          verticalLayout: true,
        },
        pattern: {
          type: 'string',
          title: 'Pattern',
          description: 'Regex Pattern'
        },
        ignoreCase: {
          title: 'Ignore Case?',
          type: 'boolean',
          defaultValue: true,
        },
        replacementText: {
          type: 'string',
          title: 'Replacement Text',
          description: 'Text to replace matches (used in Replace operation)'
        },
        outputObject: {
          title: 'Output Object',
          type: 'object',
          description: 'Please do not use',
          isValueField: true,
          properties: {
            value: {
              type: 'string',
              title: 'value',
            }
          },
        },
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get properties() {
    return {
      inputText: { type: String },
      operation: { type: String },
      pattern: { type: String },
      ignoreCase: { type: Boolean },
      replacementText: { type: String },
      outputObject: { type: Object }
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
    this.inputText = '';
    this.operation = 'Check Match';
    this.pattern = '';
    this.ignoreCase = true;
    this.replacementText = '';
    this.outputObject = { value: '' };
  }

  updated(changedProperties) {
    if (changedProperties.has('inputText') || changedProperties.has('operation') ||
        changedProperties.has('pattern') || changedProperties.has('ignoreCase') ||
        changedProperties.has('replacementText')) {
      this.performRegexOperation();
    }
  }

  performRegexOperation() {
    const regex = new RegExp(this.pattern, this.ignoreCase ? 'i' : '');
    let result = '';

    switch (this.operation) {
      case 'Check Match':
        result = regex.test(this.inputText).toString();
        break;
      case 'Split':
        result = this.inputText.split(regex).join(', ');
        break;
      case 'Extract':
        const match = this.inputText.match(regex);
        result = match ? match.join(', ') : '';
        break;
      case 'Group':
        const groups = this.inputText.match(regex);
        result = groups ? groups.slice(1).join(', ') : '';
        break;
      case 'Replace':
        result = this.inputText.replace(regex, this.replacementText);
        break;
      default:
        result = 'Invalid operation';
    }

    this.outputObject = { value: result };
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      detail: this.outputObject,
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  render() {
    return html`
      <div>
        <label>Output:</label>
        <pre>${this.outputObject.value}</pre>
      </div>
    `;
  }
}

customElements.define('neo-regex', NeoRegex);
