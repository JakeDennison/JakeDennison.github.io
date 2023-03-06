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

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/nac-anno/dist/img/person.png';
    this.markerAreaCreated = false;
    this.showMarkerArea = this.showMarkerArea.bind(this);
  }

  showMarkerArea(event) {
    if (!this.markerAreaCreated) {
      const target = event.target;
      const markerContainer = this.shadowRoot.getElementById('marker-container');
      const markerArea = new markerjs2.MarkerArea(target, { container: markerContainer });
      markerArea.addEventListener('closed', () => {
        this.markerAreaCreated = false;
      });
      markerArea.show();
      this.markerAreaCreated = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.markerAreaCreated) {
      const markerContainer = this.shadowRoot.getElementById('marker-container');

      // Create a new markerjs2 container inside the shadow DOM
      const newMarkerContainer = document.createElement('div');
      newMarkerContainer.classList.add('markerjs2-container');
      markerContainer.parentElement.replaceChild(newMarkerContainer, markerContainer);

      // Create the marker area with the new container
      const img = this.shadowRoot.getElementById('personimg');
      const markerArea = new markerjs2.MarkerArea(img, { container: newMarkerContainer });
      markerArea.addEventListener('closed', () => {
        this.markerAreaCreated = false;
      });
      markerArea.show();
      this.markerAreaCreated = true;
    }
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
        <img id="personimg" src="${this.src}" @click="${this.showMarkerArea}"/>
        <div id="marker-container" class="markerjs2-container"></div>
    `;
  }
}

customElements.define('nac-anno', AnnoElement);
