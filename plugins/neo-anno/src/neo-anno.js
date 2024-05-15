import { html, LitElement, css } from 'lit';
import Konva from 'konva';

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
    this.stage = null;
    this.layer = null;
  }

  firstUpdated() {
    this.setupKonva();
  }

  setupKonva() {
    const container = this.shadowRoot.getElementById('container');
    
    // Initialize Konva stage and layer
    this.stage = new Konva.Stage({
      container: container,
      width: container.clientWidth,
      height: container.clientHeight,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // Load the image
    const img = new Image();
    img.src = this.src;
    img.onload = () => {
      const konvaImage = new Konva.Image({
        x: 0,
        y: 0,
        image: img,
        width: img.width,
        height: img.height,
      });

      // Adjust stage size to image size
      this.stage.width(img.width);
      this.stage.height(img.height);

      this.layer.add(konvaImage);
      this.layer.draw();
      
      // Add drawing functionality
      this.addDrawingFunctionality();
    };
  }

  addDrawingFunctionality() {
    let isDrawing = false;
    let lastLine;

    this.stage.on('mousedown touchstart', () => {
      isDrawing = true;
      const pos = this.stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: 'red',
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        points: [pos.x, pos.y],
      });
      this.layer.add(lastLine);
    });

    this.stage.on('mousemove touchmove', () => {
      if (!isDrawing) {
        return;
      }
      const pos = this.stage.getPointerPosition();
      const newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      this.layer.batchDraw();
    });

    this.stage.on('mouseup touchend', () => {
      isDrawing = false;
      this.image = this.stage.toDataURL();
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <div id="container" class="image-container"></div>
    `;
  }
}

customElements.define('neo-anno', AnnoElement);
