import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TranslateMod extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        height: 100%;
        width: 100%;
        display: block;
      }

      .frame {
        display: inline-block;
        height: 100%;
        width: 100%;
        background-color: transparent;
        border: none;
      }
    `;

    static getMetaConfig() {
        // plugin contract information
        return {
            title: 'translate-mod',
            fallbackDisableSubmit: false,
            description: 'Non interactable plugin to translate elements of Nintex Forms',
            iconUrl: "multiline-text",
            groupName: 'Translators',
            version: '0.1',
            properties: {
                Signature: {
                    type: 'string',
                    title: 'Select to sign',
                    description: 'Replacement text for "Select to sign" located in the signature control'
                },
            },
            standardProperties: {
                readOnly: true,
                required: true,ß
                description: true,
            }
        };
    }

    // Render the UI as a function of component state
    render() {
        return html`
            <script>

            function setElementValues() {
                const elements = document.querySelectorAll('ntx-signature div div div div h5.d-print-none.ng-star-inserted');
                elements.forEach(element => {
                element.innerHTML =${this.Signature};
                });
            }

            setElementValues()
            </script>`;
    }
}

// registering the web component.
const elementName = 'translate-mod';
customElements.define(elementName, TranslateMod);
