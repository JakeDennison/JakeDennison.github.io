import { html, LitElement } from 'lit';
import * as markerjs2 from 'markerjs2';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'nac-anno',
      fallbackDisableSubmit: false,
      description: 'Display images in a carousel',
      iconUrl: "image",
      groupName: 'Visual Data',
      version: '1.3',
      src: {type: String},
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
    this.markerArea = '';
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html`
          <img id="personimg" src="${this.src}"/>
        `;
  }
}

customElements.define('nac-anno', AnnoElement);

// create an instance of MarkerArea and pass the target image reference as a parameter
let markerArea = new markerjs2.MarkerArea(document.getElementById('personimg'));

// register an event listener for when user clicks OK/save in the marker.js UI
markerArea.addEventListener('render', event => {
  // we are setting the markup result to replace our original image on the page
  // but you can set a different image or upload it to your server
  document.getElementById('personimg').src = event.dataUrl;
});

// finally, call the show() method and marker.js UI opens
markerArea.show();

