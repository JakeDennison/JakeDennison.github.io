import { LitElement, html, css } from 'lit';
import 'bootstrap/js/dist/carousel.js';
import './css/carousel.css';
import './css/neo-carousel.css';

class CarouselElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-carousel',
      fallbackDisableSubmit: false,
      description: 'Display images in a carousel',
      iconUrl: 'image',
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

  firstUpdated() {
    // Initialize the carousel using the "Carousel" class provided by Bootstrap
    const carouselElement = this.shadowRoot.querySelector('.carousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 5000, // Set the interval time for the carousel to 5 seconds
      keyboard: true, // Enable keyboard navigation for the carousel
      pause: 'hover', // Pause the carousel on mouse hover
      wrap: true // Enable wrapping of the carousel items
    });
  }

  render() {
    if (!this.images) {
      return html`<p>No images found</p>`;
    }

    const imageUrls = this.images.split(';');

    return html`
      <div class="carousel slide">
        <div class="carousel-inner">
          ${imageUrls.map((url, index) => html`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${url}" class="d-block w-100" alt="Image ${index + 1}">
            </div>
          `)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }
}

customElements.define('neo-carousel', CarouselElement);