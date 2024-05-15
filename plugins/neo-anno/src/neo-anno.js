import { html, LitElement, css } from 'lit';
import { fabric } from 'fabric';

class AnnoElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-anno',
      fallbackDisableSubmit: false,
      description: 'Display image for annotation',
      iconUrl: "image",
      groupName: 'Visual Data',
      version: '1.3',
      properties: {
        src: {
          type: 'string',
          title: 'Source of image',
          description: '',
        },
        image: {
          type: 'string',
          title: 'Output Image as base 64 value',
          description: 'Base64 of output image',
          isValueField: true,
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

  static properties = {
    src: { type: String },
    image: { type: String },
  };

  static get styles() {
    return css`
      .image-container {
        position: relative;
        display: inline-block;
      }
      canvas {
        border: 1px solid black;
      }
    `;
  }

  constructor() {
    super();
    this.src = 'https://jsdenintex.github.io/plugins/neo-anno/dist/img/person.png';
  }

  firstUpdated() {
    this.setupCanvas();
  }

  setupCanvas() {
    const canvasElement = this.shadowRoot.getElementById('canvas');
    const canvas = new fabric.Canvas(canvasElement);

    fabric.Image.fromURL(this.src, (img) => {
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    this.canvas = canvas;

    // Add simple drawing capabilities
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = "red";
    canvas.freeDrawingBrush.width = 5;

    // Save canvas state
    canvas.on('path:created', () => {
      this.image = canvas.toDataURL();
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <div class="image-container">
        <canvas id="canvas"></canvas>
      </div>
    `;
  }
}

customElements.define('neo-anno', AnnoElement);
