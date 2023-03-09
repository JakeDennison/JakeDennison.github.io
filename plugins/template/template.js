import { css, html, LitElement, styleMap } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyElement extends LitElement {
    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'nac-',
            fallbackDisableSubmit: false,
            description: '',
            iconUrl: "",
            groupName: '',
            version: '1.0',
            properties: {
                input: {
                    type: 'string',
                    title: 'Object',
                    description: 'Test'
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
            detail: e.target.output,
        };
        const event = new CustomEvent('ntx-value-change', args);
        this.dispatchEvent(event);
    }

    static properties = {
        data: ''
    }

    constructor() {
        super();
    }

    render() {
        return html`
    `;
    }
}

const elementName = 'nac-';
customElements.define('nac-', MyElement);