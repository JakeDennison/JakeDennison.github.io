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
      src: {type: String},
      properties: {
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
    this.src = 'https://jsdenintex.github.io/plugins/nac-anno/dist/img/person.png';
    this.markerArea = '';
  }

  showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target);
    console.log('markerArea:', markerArea);
    markerArea.addEventListener('done', (event) => {
      console.log('dataUrl:', event.dataUrl);
      this.src = event.dataUrl;
    });
    markerArea.show();
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
          <img src="${this.src}" style="max-width: 600px;" @click="${(e) => this.showMarkerArea(e.target)}" />
        `;
  }
}

customElements.define('nac-anno', AnnoElement);