import { LitElement, html, css } from 'lit';
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AmbientLight, DirectionalLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
      properties: {
        src: {
          type: 'string',
          title: '3D Object source',
          description: 'Please provide a link to the 3d object (.glt or .gltf)'
        },
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
  
      .container {
        width: 100%;
        height: 600px;
        position: relative;
      }
    `;
  }
  

  static get properties() {
    return {
      modelLoaded: { type: Boolean },
      error: { type: String },
      container: { type: Object },
    };
  }

  constructor() {
    super();
    this.src = '';
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
    renderer.setSize(600, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.width = '100%';
    this.container.appendChild(renderer.domElement);

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10); // Adjust the camera position
  
    const controls = new OrbitControls(camera, renderer.domElement); // Add OrbitControls
  
    const scene = new Scene();
    scene.background = new Color(0xf1f1f1);
  
    const ambientLight = new AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.75);
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
      <div class="container" id="model-container">
        ${this.container}
        <slot></slot>
      </div>
  `;
  }
}

customElements.define('neo-ar', ARElement);
