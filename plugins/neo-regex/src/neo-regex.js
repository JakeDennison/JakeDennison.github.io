import { LitElement, html, css } from 'lit';

class NeoRegexElement extends LitElement {
  static getMetaConfig() {
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
        replacementText: {
          type: 'string',
          title: 'Replacement Text',
          description: 'Text to replace with in case of Replace operation',
          optional: true,
        },
        ignoreCase: {
          title: 'Ignore Case?',
          type: 'boolean',
          defaultValue: true,
        },
        outputObject: {
          title: 'Output Object',
          type: 'object',
          description: 'Please dont use',
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
      replacementText: { type: String },
      ignoreCase: { type: Boolean },
      outputObject: { type: Object },
      result: { type: Array },
    };
  }

  constructor() {
    super();
    this.inputText = '';
    this.operation = 'Check Match';
    this.pattern = '';
    this.replacementText = '';
    this.ignoreCase = true;
    this.outputObject = { value: '' };
    this.result = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('inputText') || changedProperties.has('pattern') || changedProperties.has('operation') || changedProperties.has('ignoreCase') || changedProperties.has('replacementText')) {
      this.performRegexOperation();
    }
  }

  performRegexOperation() {
    if (!this.inputText || !this.pattern) {
      this.result = [];
      return;
    }

    const flags = this.ignoreCase ? 'i' : '';
    const regex = new RegExp(this.pattern, flags);

    switch (this.operation) {
      case 'Check Match':
        this.result = [regex.test(this.inputText).toString()];
        break;
      case 'Split':
        this.result = this.inputText.split(regex);
        break;
      case 'Extract':
        this.result = this.inputText.match(regex) || [];
        break;
      case 'Group':
        const match = regex.exec(this.inputText);
        this.result = match ? match.slice(1) : [];
        break;
      case 'Replace':
        this.result = [this.inputText.replace(regex, this.replacementText || '')];
        break;
      default:
        this.result = [];
    }

    this.outputObject.value = JSON.stringify(this.result);
    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: { value: this.outputObject } }));
  }

  render() {
    return html`
      <div>
        ${this.result.map(item => html`<div>${item}</div>`)}
      </div>
    `;
  }
}

customElements.define('neo-regex', NeoRegexElement);
