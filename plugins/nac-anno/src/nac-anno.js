import { html, LitElement, css } from 'lit';
import * as markerjs2 from 'markerjs2';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'nac-anno',
      fallbackDisableSubmit: false,
      description: 'Display image for annotation',
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

  static get styles() {
    return css`
      .markerjs2-container {
        position: absolute;
        top: 0;
        left: 0;
      }
      .image-container {
        position: relative;
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/nac-anno/dist/img/person.png';
    this.showMarkerArea = this.showMarkerArea.bind(this);
  }

  showMarkerArea(event) {
    const target = event.target;
    const markerContainer = this.shadowRoot.getElementById('marker-container');
    const markerArea = new markerjs2.MarkerArea(target, { container: markerContainer });
    markerArea.show();
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
      <div class="image-container">
        <img id="personimg" src="${this.src}" @click="${this.showMarkerArea}"/>
        <div id="marker-container" class="markerjs2-container"></div>
      </div>
    `;
  }
}

customElements.define('nac-anno', AnnoElement);