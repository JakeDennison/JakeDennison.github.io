import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class TranslateMod extends LitElement {

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

    render() {
        return html`
          <!-- element template -->
          <p>Translation</p>
          <script>
          console.log('render is working');
          </script>
        `;
      }
}

function replaceH5(newText) {
    // Get all h5 elements with the "d-print-none ng-star-inserted" class
    var h5Elements = document.querySelectorAll('h5.d-print-none.ng-star-inserted');
    
    // Check for the h5Elements list at regular intervals until it is no longer empty
    var interval = setInterval(function() {
      if (h5Elements.length > 0) {
        // Loop through all h5 elements
        for (var i = 0; i < h5Elements.length; i++) {
          // Replace the inner HTML of the current h5 element with the new text
          h5Elements[i].innerHTML = newText;
        }
        // Clear the interval to stop the loop from running indefinitely
        clearInterval(interval);
      }
    }, 1000); // 1000 milliseconds = 1 second
  }
  
  window.addEventListener('load', function() {
    replaceH5('This is the new h5 text');
  });

// registering the web component.
customElements.define('translate-mod', TranslateMod);


