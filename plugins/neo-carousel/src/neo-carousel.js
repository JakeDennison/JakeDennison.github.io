import { html, css, LitElement } from 'lit';

class CarouselElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-carousel',
      fallbackDisableSubmit: false,
      description: 'Display images in a carousel',
      iconUrl: "image",
      groupName: 'Visual Data',
      version: '1.3',
      properties: {
        images: {
          type: 'string',
          title: 'Images',
          description: 'Please list image URLs semi-colon (;) separated'
        },
        height: {
          title: 'Height in pixels',
          description: 'From 50 to 1000',
          type: 'number',
          minimum: 50,
          maximum: 1000,
          defaultValue: 500,
        },
        transition: {
          title: 'Transition interval in seconds',
          description: 'From 0 to 300',
          type: 'number',
          minimum: 0,
          maximum: 300,
          defaultValue: 5,
        },
        backgroundColor: {
          title: 'Background color',
          description: 'Hex color code for the background',
          type: 'string',
          defaultValue: '#808080', // Defaulting to gray
        }
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
      .carousel-inner {
        height: var(--carousel-height, 500px);
        background-color: var(--carousel-bg-color, #808080);
      }
      .carousel-item img {
        height: 100%;
        object-fit: contain; /* Ensure image fits without distorting aspect ratio */
      }
    `;
  }

  constructor() {
    super();
    this.images = '';
    this.height = 500;
    this.transition = 5;
    this.backgroundColor = '#808080';
  }

  createRenderRoot() {
    // Render without shadow DOM to apply Bootstrap styles
    return this;
  }

  firstUpdated() {
    // Load Bootstrap CSS and JS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.head.appendChild(script);

    // Set custom properties for height and background color
    this.style.setProperty('--carousel-height', `${this.height}px`);
    this.style.setProperty('--carousel-bg-color', this.backgroundColor);

    // Set the transition interval
    const carouselElement = this.querySelector('#carouselExampleIndicators');
    if (carouselElement) {
      carouselElement.setAttribute('data-bs-interval', this.transition * 1000);
    }
  }

  render() {
    if (!this.images) {
      return html`<p>No images found</p>`;
    }

    this.imageList = this.images.split(';').filter(image => image.trim() !== '');

    return html`
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-theme="dark" data-bs-ride="carousel">
        <div class="carousel-indicators">
          ${this.imageList.map((_, index) => html`
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
          `)}
        </div>
        <div class="carousel-inner">
          ${this.imageList.map((image, index) => html`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${image}" class="d-block w-100" alt="Image ${index + 1}">
            </div>
          `)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }
}

customElements.define('neo-carousel', CarouselElement);
