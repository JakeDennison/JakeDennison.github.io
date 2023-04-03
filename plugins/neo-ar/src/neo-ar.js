import { LitElement, html } from 'lit-element';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-ar',
      fallbackDisableSubmit: false,
      description: 'Display AR images',
      iconUrl: "image",
      groupName: 'Visual Data',
      version: '1.0',
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }

  static get properties() {
    return {
      src: { type: String }
    };
  }

  constructor() {
    super();
    this.src = '';
    this.viewer = null;
    this.model = null;
    this.ready = false;
    this.updateSize = this.updateSize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    const script = document.createElement('script');
    script.setAttribute('src', 'https://cesium.com/downloads/cesiumjs/releases/1.78/Build/Cesium/Cesium.js');
    script.onload = () => {
      this.viewer = new Cesium.Viewer(this.shadowRoot, {
        shouldAnimate: true,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        baseLayerPicker: false
      });
      this.viewer.scene.globe.show = false;
      this.viewer.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(0, 0, 2000),
        orientation: {
          heading: 0,
          pitch: -Cesium.Math.PI_OVER_TWO,
          roll: 0
        }
      });
      this.loadModel();
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
    };
    document.body.appendChild(script);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.updateSize);
    if (this.model) {
      this.viewer.entities.remove(this.model);
      this.model = null;
    }
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
    }
  }

  loadModel() {
    if (!this.src) {
      console.error('No model source provided');
      return;
    }
    const tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: this.src,
      maximumNumberOfLoadedTiles: 1000
    }));
    tileset.readyPromise.then(() => {
      this.ready = true;
    }).catch(error => {
      console.error(`Error loading model from ${this.src}:`, error);
      this.dispatchEvent(
        new CustomEvent('error', {
          detail: {
            message: `Error loading model from ${this.src}: ${error.message}`,
          },
        })
      );
    });
    this.model = tileset;
  }

  updateSize() {
    const { width, height } = this.getBoundingClientRect();
    this.viewer.canvas.width = width;
    this.viewer.canvas.height = height;
  }

  render() {
    if (!this.src) {
      return html`<p>No model source provided</p>`;
    }
    if (!this.ready) {
      return html`<p>Loading model...</p>`;
    }
    // check if a license file exists
    const licenseUrl = this.src.replace('.gltf', '-license.txt');
    const licenseLink = html`<a href=${licenseUrl} target="_blank">License</a>`;
    return html`
      <div>
        <slot></slot>
        ${licenseLink}
      </div>
    `;
  }
}

customElements.define('neo-ar', AnnoElement);