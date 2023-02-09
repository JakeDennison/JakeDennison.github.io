import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class CarouselElement extends LitElement {
    static getMetaConfig() {
        // plugin contract information
        return {
          controlName: 'nac-carousel',
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
        this.index = 0;
    }

    handleNext() {
        this.index = this.index === this.imageList.length - 1 ? 0 : this.index + 1;
    }

    handlePrev() {
        this.index = this.index === 0 ? this.imageList.length - 1 : this.index - 1;
    }

    render() {
        if (!this.images) {
            return html`
            <p>No images found</p>
            `;
        }
        
        this.imageList = this.images.split(';');

        return html`
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            ${this.imageList.map((_, i) => {
              return html`
                <li data-target="#carouselExampleControls" data-slide-to="${i}" class="${i === this.index ? 'active' : ''}"></li>
              `;
            })}
          </ol>
          <div class="carousel-inner">
            ${this.imageList.map((image, i) => {
              return html`
                <div class="carousel-item ${i === this.index ? 'active' : ''}">
                  <img src="${image}" class="d-block w-100" alt="">
                </div>
              `;
            })}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" @click="${this.handlePrev}">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" @click="${this.handleNext}">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      `;
    }
  }

customElements.define('nac-carousel', CarouselElement);