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
      version: '1.4',
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
        width: 100%;
        height: 100%;
      }
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
      }
      .modal-content {
        background-color: white;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 600px;
        position: relative;
      }
      .modal-close {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/nac-anno/dist/img/person.png';
    this.showMarkerArea = this.showMarkerArea.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showMarkerArea(event) {
    const target = event.target;
    const markerContainer = this.shadowRoot.getElementById('marker-container');
    const modal = this.shadowRoot.getElementById('marker-modal');
    const markerArea = new markerjs2.MarkerArea(target, { container: markerContainer });
    markerArea.addEventListener('render', event => {
      target.src = event.dataUrl;
    });
    markerArea.addEventListener('cancel', event => {
      modal.style.display = 'none';
    });
    markerArea.show();
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = this.shadowRoot.getElementById('marker-modal');
    modal.style.display = 'none';
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
      <div class="image-container">
        <img id="personimg" src="${this.src}" @click="${this.showMarkerArea}"></img>
        <div id="marker-modal" class="modal">
          <div class="modal-content">
            <span class="modal-close" @click="${this.closeModal}">&times;</span>
            <div id="marker-container" class="markerjs2-container"></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('nac-anno', AnnoElement);
