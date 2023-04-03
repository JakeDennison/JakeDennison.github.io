import { LitElement, html } from 'lit-element';
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AmbientLight, DirectionalLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ARElement extends LitElement {
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
      src: { type: String },
      modelLoaded: { type: Boolean },
      error: { type: String },
      container: { type: Object },
    };
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/neo-ar/dist/assets/valve.gltf';
    this.container = document.createElement('div');
  }

  connectedCallback() {
    super.connectedCallback();
    this.initScene();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disposeScene();
  }

  initScene() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(renderer.domElement);

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const scene = new Scene();
    scene.background = new Color(0x000000);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(this.src, (gltf) => {
      scene.add(gltf.scene);
      this.modelLoaded = true;
    }, undefined, (error) => {
      console.error('An error occurred:', error);
      this.error = 'Failed to load the model';
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }

  disposeScene() {
    // Dispose of the Three.js resources here when the component is disconnected from the DOM
  }

  render() {
    if (!this.src) {
      return html`<p>No model source provided</p>`;
    }
    if (!this.modelLoaded) {
      return html`<p>Loading model...</p>`;
    }
    if (this.error) {
      return html`<p>${this.error}</p>`;
    }
    return html`
      <div>
        ${this.container}
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('neo-ar', ARElement);
