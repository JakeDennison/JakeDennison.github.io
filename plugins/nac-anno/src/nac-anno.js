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
      image: {type: String},
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
    this.showMarkerArea = this.showMarkerArea.bind(this);
  }

  showMarkerArea(event) {
    const target = event.target;
    const markerArea = new markerjs2.MarkerArea(target);
    markerArea.addEventListener('render', (event) => (target.src = event.dataUrl));
    markerArea.show();
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
          <img id="personimg" src="${this.src}" @click="${this.showMarkerArea}"/>
        `;
  }
}

customElements.define('nac-anno', AnnoElement);