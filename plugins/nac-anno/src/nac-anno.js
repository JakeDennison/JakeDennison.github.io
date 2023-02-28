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

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/nac-anno/dist/img/person.png';
    this.showMarkerArea = this.showMarkerArea.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.showMarkerArea();
  }

  showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(this.shadowRoot.querySelector('#annoContainer'));
  
    // set options
    markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
    markerArea.uiStyleSettings.redoButtonVisible = true;
    markerArea.uiStyleSettings.notesButtonVisible = true;
    markerArea.uiStyleSettings.zoomButtonVisible = true;
    markerArea.uiStyleSettings.clearButtonVisible = true;
  
    // add event listener
    markerArea.addEventListener('render', event => {
      this.annotatedSrc = event.dataUrl;
      this.requestUpdate();
    });

    markerArea.show();
  }

  static get styles() {
    return css`
      #annoContainer {
        max-width: 100%;
        height: auto;
        cursor: pointer;
        background-size: contain;
        background-repeat: no-repeat;
      }
    `;
  }

  render() {
    return html`
      <div>
        <div id="annoContainer" style="background-image: url(${this.src})"></div>
      </div>
    `;
  }
}

customElements.define('nac-anno', AnnoElement);
