import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { html, LitElement, css } from 'lit';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'nac-ar',
      fallbackDisableSubmit: false,
      description: 'Display AR images',
      iconUrl: "image",
      groupName: 'Visual Data',
      version: '1.0',
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

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'assets/2CylinderEngine.glb';
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(600, 600);
    this.clock = new THREE.Clock();
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.appendChild(this.renderer.domElement);
    this.loadModel();
    this.animate();
  }

  loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      this.src,
      gltf => {
        this.model = gltf.scene;
        this.model.scale.set(0.1, 0.1, 0.1);
        this.model.position.set(0, 0, -1);
        this.scene.add(this.model);
      },
      () => {},
      error => {
        console.error(`Error loading model from ${this.src}:`, error);
        this.dispatchEvent(
          new CustomEvent('error', {
            detail: {
              message: `Error loading model from ${this.src}: ${error.message}`,
            },
          })
        );
      }
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    if (this.model) {
      this.model.rotation.y += delta * 1;
    }
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    if (!this.src) {
      return html`<p>No image found</p>`;
    }
    return html``;
  }
}

customElements.define('nac-ar', AnnoElement);
