import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import * as markerjs2 from 'https://jsdenintex.github.io/plugins/nac-anno/src/markerjs2/markerjs2.js';

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

    firstUpdated() {
        super.firstUpdated();
        const imgElement = this.shadowRoot.querySelector('img');
        this.markerCore = new markerjs2.MarkerCore(imgElement, {});
        this.markerCore.on('done', (dataUrl) => {
          imgElement.src = dataUrl;
        });
      }
    
      
      
      render() {
        if (!this.image) {
          return html`<p>No image found</p>`;
        }
        return html`
        <div id="marker-container"></div>
        <img src="${this.image}" @click="${() => this.markerCore.showMarkerDialog()}" />
      `;
      }
}

customElements.define('nac-anno', AnnoElement);