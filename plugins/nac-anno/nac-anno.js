import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import * as markerjs2 from 'https://unpkg.com/markerjs2/markerjs2.js';

class AnnoElement extends LitElement {
    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'nac-anno',
            fallbackDisableSubmit: false,
            description: 'Display images in a carousel',
            iconUrl: "image",
            groupName: 'Visual Data',
            version: '1.3',
            properties: {
                image: {
                    type: 'string',
                    title: 'Image',
                    description: 'Please enter the URL you want to annotate'
                },
            },
            standardProperties: {
                fieldLabel: true,
                readOnly: true,
                required: true,
                description: true,
            }
        };
    }

    constructor() {
        super();
        this.image = '';
      }

      render() {
        if (!this.image) {
            return html`<p>No image found</p>`;
          }
        return html`
          <style>
            :host {
              display: block;
            }
          </style>
          <img id="annoimg" src="${this.image}"/>
        `;
      }
    }
    
    customElements.define('nac-anno', AnnoElement);

    let markerArea = new markerjs2.MarkerArea(document.getElementById('annoimg'));
    markerArea.addEventListener('render', event => {
      document.getElementById('annoimg').src = event.dataUrl;
    });
    
    markerArea.show();