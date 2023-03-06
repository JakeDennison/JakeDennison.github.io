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
      .image-container {
        position: relative;
      }
      .markerjs2-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/nac-anno/dist/img/person.png';
    this.markerAreaCreated = false;
    this.markerArea = null;
  }

  connectedCallback() {
    super.connectedCallback();
    const img = this.shadowRoot.getElementById('personimg');

    // Create a new markerjs2 container inside the shadow DOM
    const newMarkerContainer = document.createElement('div');
    newMarkerContainer.classList.add('markerjs2-container');
    img.parentElement.appendChild(newMarkerContainer);

    // Create the marker area with the new container
    this.markerArea = new markerjs2.MarkerArea(img, { container: newMarkerContainer });
    this.markerArea.on('added', () => {
      this.markerArea.show();
      this.markerAreaCreated = true;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up the marker area
    if (this.markerArea) {
      this.markerArea.remove();
      this.markerArea = null;
      this.markerAreaCreated = false;
    }
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
      <div class="image-container">
        <img id="personimg" src="${this.src}"/>
      </div>
    `;
  }
}

customElements.define('nac-anno', AnnoElement);
