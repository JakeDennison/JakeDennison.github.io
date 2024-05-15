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
        border: 2px dashed #888;
        padding: 5px;
        cursor: pointer;
        transition: border-color 0.3s;
      }
      .image-container:hover {
        border-color: #333;
      }
      img {
        max-width: 100%;
        display: block;
      }
      .tooltip {
        text-align: center;
        color: #888;
        font-size: 14px;
        margin-top: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/neo-anno/dist/img/person.png';
  }

  firstUpdated() {
    const imageContainer = this.shadowRoot.querySelector('.image-container');
    imageContainer.addEventListener('click', () => this.setupMarker());
  }

  setupMarker() {
    const img = this.shadowRoot.querySelector('img');
    const markerArea = new MarkerArea(img);

    markerArea.addEventListener('render', (event) => {
      const dataUrl = event.dataUrl;
      this.image = dataUrl;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('ntx-value-change', {
        detail: dataUrl,
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    });

    markerArea.settings.displayMode = 'popup';
    markerArea.settings.defaultMarkerTypeName = 'FrameMarker';
    markerArea.show();
  }

  render() {
    const imgSrc = this.image || this.src;

    return html`
      <div style="width:100%" class="image-container">
        <img width="100%" src="${imgSrc}" alt="Annotatable image" crossorigin="anonymous" />
      </div>
      <div class="tooltip">Click the image to start annotation</div>
    `;
  }
}

customElements.define('neo-anno', AnnoElement);
