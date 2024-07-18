import { LitElement, html, css } from 'lit';

class templateElement extends LitElement {
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
        Operation: {
          title: 'Choice field',
          type: 'string',
          enum: ['Check Match', 'Split', 'Extract', 'Group', 'Replace'],
          showAsRadio: true,
          verticalLayout: true,
        },
        Pattern: {
          type: 'string',
          title: 'Pattern',
          description: 'Regex Pattern'
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
            value:{
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

  static properties = {
    src: '',
  };

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  
  constructor() {
    super();
  }

  onChange(e) {
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail: e.target.value,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
}

  render() {''
  }
}

customElements.define('neo-regex', regexElement);
