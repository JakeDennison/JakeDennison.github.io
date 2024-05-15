import { html, LitElement, css } from 'lit';
import { FrameMarker, MarkerArea } from 'markerjs2';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-anno',
      fallbackDisableSubmit: false,
      description: 'Display image for annotation',
      iconUrl: "image",
      groupName: 'Visual Data',
      version: '1.3',
      properties: {
        src: {
          type: 'string',
          title: 'Source of image',
          description: '',
        },
        image: {
          type: 'string',
          title: 'Output Image as base 64 value',
          description: 'Base64 of output image',
          isValueField: true,
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

  static properties = {
    src: { type: String },
    image: { type: String },
  };

  static get styles() {
    return css`
      .image-container {
        position: relative;
        display: inline-block;
      }
      img {
        max-width: 100%;
      }
      .annotation-canvas {
        position: absolute;
        top: 0;
        left: 0;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/neo-anno/dist/img/person.png';
  }

  firstUpdated() {
    this.setupMarker();
  }

  setupMarker() {
    const img = this.shadowRoot.querySelector('img');
    const markerArea = new MarkerArea(img);

    markerArea.addEventListener('render', (dataUrl) => {
      this.image = dataUrl;
      this.requestUpdate();
    });

    // Ensure the marker area uses inline display mode
    markerArea.settings.displayMode = 'inline';
    markerArea.settings.defaultMarkerTypeName = 'FrameMarker';

    // Append the marker area to the shadow root
    markerArea.addRenderEventListener(() => {
      this.shadowRoot.appendChild(markerArea.renderElement);
      markerArea.renderElement.classList.add('annotation-canvas');
    });

    markerArea.show();
  }

  render() {
    const imgSrc = this.image || this.src;

    return html`
      <div class="image-container">
        <img src="${imgSrc}" alt="Annotatable image"/>
      </div>
    `;
  }
}

customElements.define('neo-anno', AnnoElement);
