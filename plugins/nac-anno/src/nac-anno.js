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

  showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target);
  
    // add all marker types
    markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
  
    // enable redo, notes, zoom, and clear buttons (hidden by default)
    markerArea.uiStyleSettings.redoButtonVisible = true;
    markerArea.uiStyleSettings.notesButtonVisible = true;
    markerArea.uiStyleSettings.zoomButtonVisible = true;
    markerArea.uiStyleSettings.clearButtonVisible = true;
  
    markerArea.addEventListener(
      "render",
      (event) => (target.src = event.dataUrl)
    );
    markerArea.show();
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
      <div id="app">
        <img id="annoImage" src="${this.src}" @click="${this.showMarkerArea}" crossorigin="anonymous" />
      </div>
    `;
  }
}

customElements.define('nac-anno', AnnoElement);
