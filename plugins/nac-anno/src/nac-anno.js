import { html, LitElement } from 'lit';
import * as markerjs2 from 'markerjs2';

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
    this.markerArea = '';
  }

  firstUpdated() {
    super.firstUpdated();
    const imgElement = this.shadowRoot.querySelector('img');
    this.markerArea = new markerjs2.MarkerArea(imgElement, {});
    this.markerArea.on('done', (dataUrl) => {
      imgElement.src = dataUrl;
    });
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
          <img src="${this.image}" @click="${() => this.markerArea.showMarkerArea()}" />
        `;
  }
}

customElements.define('nac-anno', AnnoElement);