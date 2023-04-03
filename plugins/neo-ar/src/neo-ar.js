import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { html, LitElement, css } from 'lit';

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

  static get styles() {
    return css`
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/neo-ar/dist/assets/valve.gltf';
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(0, 1, 1);
    this.scene.add(this.light);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setSize(600, 600);
    this.clock = new THREE.Clock();
    this.model = null;
    this.updateSize = this.updateSize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.appendChild(this.renderer.domElement);
    this.loadModel();
    this.animate();
    window.addEventListener('resize', this.updateSize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.updateSize);
    this.scene.remove(this.model);
    this.model.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    this.model = null;
  }
  loadModel() {
    if (!this.src) {
      console.error('No model source provided');
      return;
    }
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
    this.light.position.copy(this.camera.position);
  }

  updateSize() {
    const { width, height } = this.getBoundingClientRect();
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (!this.src) {
      return html`<p>No model source provided</p>`;
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