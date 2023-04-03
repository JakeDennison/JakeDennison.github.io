import { LitElement, html } from 'lit-element';
import * as BABYLON from "@babylonjs/core/Legacy/legacy";

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
    this.src = 'https://jsdenintex.github.io/plugins/neo-ar/dist/assets/valve.gltf';
    this.canvas = null;
    this.engine = null;
    this.scene = null;
    this.model = null;
    this.ready = false;
    this.updateSize = this.updateSize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.canvas = document.createElement('canvas');
    this.shadowRoot.appendChild(this.canvas);
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    this.scene.createDefaultCameraOrLight(true, true, true);
    this.loadModel();
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
    this.engine.runRenderLoop(() => {
      if (this.model) {
        this.model.rotation.y += 0.01;
      }
      this.scene.render();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.updateSize);
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
    if (this.scene) {
      this.scene.dispose();
      this.scene = null;
    }
    if (this.engine) {
      this.engine.stopRenderLoop();
      this.engine.dispose();
      this.engine = null;
    }
  }

  loadModel() {
    if (!this.src) {
      console.error('No model source provided');
      return;
    }
    const loader = new BABYLON.AssetsManager(this.scene);
    const task = loader.addMeshTask('model', '', './', this.src);
    task.onSuccess = task => {
      this.model = task.loadedMeshes[0];
      this.model.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
      this.model.position = new BABYLON.Vector3(0, 0, -1);
      this.ready = true;
    };
    task.onError = (task, message, exception) => {
      console.error(`Error loading model from ${this.src}:`, message, exception);
      this.dispatchEvent(
        new CustomEvent('error', {
          detail: {
            message: `Error loading model from ${this.src}: ${message}`,
          },
        })
      );
    };
    loader.load();
  }

  updateSize() {
    const { width, height } = this.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
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