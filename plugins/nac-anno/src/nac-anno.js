import { html, LitElement, css } from 'lit';

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
    `;
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

      // Replace marker container with new div element
      const newMarkerContainer = document.createElement('div');
      newMarkerContainer.classList.add('markerjs2-container');
      markerContainer.parentElement.replaceChild(newMarkerContainer, markerContainer);

      // Create marker area with new container
      const markerArea = new Markerjs2.MarkerArea(target, { container: newMarkerContainer });
      markerArea.show();
      this.markerAreaCreated = true;
    }
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
