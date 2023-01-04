import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyElement extends LitElement {
    
    static getMetaConfig() {
        // plugin contract information
        return {
            title: 'translate-mod',
            fallbackDisableSubmit: false,
            description: 'Non interactable plugin to translate elements of Nintex Forms',
            iconUrl: "multiline-text",
            groupName: 'Translators',
            version: '1.0',
            properties: {
                Signature: {
                    type: 'string',
                    title: 'Select to sign',
                    description: 'Replacement text for "Select to sign" located in the signature control'
                },
            },
            standardProperties: {
                readOnly: true,
                required: true,
                description: true,
            }
        };
    }
    
    setElementValues() {
      const elements = this.shadowRoot.querySelectorAll('ntx-signature div div div div h5.d-print-none.ng-star-inserted');
      elements.forEach(element => {
        element.innerHTML =$.Signature;
      });
    }
  
    render() {
      return html`
        <!-- element template -->
        <ntx-signature>
          <div>
            <div>
              <div>
                <div>
                  <h5 class="d-print-none ng-star-inserted">Select to sign</h5>
                </div>
              </div>
            </div>
          </div>
        </ntx-signature>
      `;
    }
  
    connectedCallback() {
      super.connectedCallback();
      this.setElementValues();
    }
}

// registering the web component.
const elementName = 'translate-mod';
customElements.define('translate-mod', TranslateMod);


