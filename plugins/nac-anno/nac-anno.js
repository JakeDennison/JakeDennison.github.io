import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import * as MarkerJS from 'https://cdn.jsdelivr.net/npm/markerjs2@2.28.1/markerjs2.min.js';

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
        const markerContainer = this.shadowRoot.querySelector('#marker-container');
        this.marker = new MarkerJS.Marker(markerContainer);
    }

    render() {
        if (!this.image) {
            return html`<p>No image found</p>`;
        }
        return html`
          <div id="marker-container"></div>
          <img src="${this.image}" onclick="${() => this.marker.start()}" />
        `;
    }
}

customElements.define('nac-anno', AnnoElement);