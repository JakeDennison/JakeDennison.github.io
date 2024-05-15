import { html, LitElement } from 'lit';

class CarouselElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
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
      },
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }

  constructor() {
    super();
    this.images = '';
  }

  createRenderRoot() {
    // Render without shadow DOM
    return this;
  }

  firstUpdated() {
    // Load Bootstrap CSS and JS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js';
    document.head.appendChild(script);
  }

  render() {
    if (!this.images) {
      return html`<p>No images found</p>`;
    }

    this.imageList = this.images.split(';').filter(image => image.trim() !== '');

    return html`
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
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
