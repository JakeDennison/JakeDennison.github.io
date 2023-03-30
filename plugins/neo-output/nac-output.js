import { css, html, LitElement, styleMap } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyElement extends LitElement {
    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'nac-output',
            fallbackDisableSubmit: false,
            description: 'Example of data input and output',
            iconUrl: "multiline-text",
            groupName: 'AI',
            version: '1.0',
            properties: {
                input: {
                    type: 'string',
                    title: 'Input',
                },
                output: {
                    type: 'string',
                    title: 'Output',
                    isValueField: true,
                },
            },
            events: ["ntx-value-change"],
            standardProperties: {
                fieldLabel: true,
                readOnly: true,
                required: true,
                description: true,
            }
        };
    }

    onChange(e) {
        const args = {
            bubbles: true,
            cancelable: false,
            composed: true,
            // value coming from input change event. 
            detail: e.value,
        };
        const event = new CustomEvent('ntx-value-change', args);
        this.dispatchEvent(event);
    }

    static get properties() {
        return {
            input: { type: String },
            output: { type: String }
        }
    }

    constructor() {
        super();
        this.output = this.input;
    }

    set input(value) {
        let oldValue = this._input;
        this._input = value;
        this.requestUpdate('input', oldValue);
        this.output = value; // update output when input changes
    }

    get input() {
        return this._input;
    }

    render() {
        return html`
        <p>Input: ${this.input}</p></br>
        <p>Output: ${this.output}</p>
    `;
    }
}

const elementName = 'nac-output';
customElements.define('nac-output', MyElement);