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
        this.requestUpdate();
      }
    
      handlePrev() {
        this.index = this.index === 0 ? this.imageList.length - 1 : this.index - 1;
        this.requestUpdate();
      }
    
      updated() {
        const prevIndex = this.index === 0 ? this.imageList.length - 1 : this.index - 1;
        const nextIndex = this.index === this.imageList.length - 1 ? 0 : this.index + 1;
        const prevItem = this.shadowRoot.querySelector(`#item-${prevIndex}`);
        const activeItem = this.shadowRoot.querySelector(`#item-${this.index}`);
        const nextItem = this.shadowRoot.querySelector(`#item-${nextIndex}`);
        prevItem.style.transform = 'translateX(-100%)';
        activeItem.style.transform = 'translateX(0)';
        nextItem.style.transform = 'translateX(100%)';
      }
    
      render() {
        if (!this.images) {
          return html`<p>No images found</p>`;
        }
      
        this.imageList = this.images.split(';').filter(image => image.trim() !== '');
      
        return html`
          <link href="https://jsdenintex.github.io/plugins/nac-carousel/nac-carousel.css" rel="stylesheet">
          <div class="carousel">
            <div class="carousel-inner">
              ${this.imageList.map((image, i) => {
                const isActive = i === this.index;
                const isPrev = i === (this.index === 0 ? this.imageList.length - 1 : this.index - 1);
                const isNext = i === (this.index === this.imageList.length - 1 ? 0 : this.index + 1);
                return html`
                  <div
                    id="item-${i}"
                    class="carousel-item ${isActive ? 'active' : ''} ${isPrev || isNext ? 'visible' : ''}"
                  >
                    <img src="${image}" alt="">
                  </div>
                `;
              })}
            </div>
            <button class="carousel-control carousel-control-prev" @click="${this.handlePrev}">
            </button>
            <button class="carousel-control carousel-control-next" @click="${this.handleNext}">
            </button>
            <div class="carousel-dots">
              ${this.imageList.map((image, i) => {
                return html`
                  <button
                    class="carousel-dot ${i === this.index ? 'active' : ''}"
                    @click="${() => { this.index = i; }}"
                  >
                    <span class="visually-hidden"></span>
                  </button>
                `;
              })}
            </div>
          </div>
        `;
    }
  }
    
customElements.define('nac-carousel', CarouselElement);