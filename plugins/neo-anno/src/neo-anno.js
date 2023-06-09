import { html, LitElement, css } from 'lit';
import * as markerjs2 from 'markerjs2';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-anno',
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
      img {
        max-width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/neo-anno/dist/img/person.png';
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
      <div class="image-container">
        <img src="${this.src}" @load=${(e) => this.handleImageLoad(e.target)}/>
      </div>
    `;
  }

  handleImageLoad(img) {
    console.log('Image loaded!');
    console.log(img);
    const markerArea = new markerjs2.MarkerArea(img);
    markerArea.availableMarkerTypes = ["FrameMarker"];
    markerArea.addEventListener(
      "render",
      (event) => (target.src = event.dataUrl)
    );
    markerArea.addEventListener("markeradded", (event) => {
      const marker = event.detail.marker;
      if (marker.type === "FrameMarker") {
        this.createNewFrameMarker(marker);
      }
    });
    markerArea.addEventListener("beforeclose", (event) => {
      if (!confirm("Do you want to discard changes?")) {
        event.preventDefault();
      }
    });
  }

  createNewFrameMarker(marker) {
    console.log("New FrameMarker created!", marker);
    // Do something with the new FrameMarker, such as add it to an array
  }


}

customElements.define('neo-anno', AnnoElement);

// start creating a new FrameMarker each time a marker is created