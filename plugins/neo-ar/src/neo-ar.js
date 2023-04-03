import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { html, LitElement, css } from 'lit';

class ModelViewer extends LitElement {
  static get properties() {
    return {
      src: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `;
  }

  constructor() {
    super();
    this.src = '';
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.clientWidth / this.clientHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setSize(this.clientWidth, this.clientHeight);
    this.clock = new THREE.Clock();
    this.model = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.appendChild(this.renderer.domElement);
    this.loadModel();
    this.animate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
  }

  render() {
    return html``;
  }
}

customElements.define('model-viewer', ModelViewer);