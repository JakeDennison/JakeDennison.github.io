import { LitElement, html, css } from 'lit';

class NeoPageHoldElement extends LitElement {

  static get properties() {
    return {
      allownav: { type: Boolean }
    };
  }

  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-pagehold',
      fallbackDisableSubmit: false,
      description: 'Prevents page navigation until true',
      iconUrl: 'button',
      groupName: 'Admin Tools',
      version: '1.0',
      properties: {
        allownav: {
          title: 'Allow Navigation?',
          type: 'boolean'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.allownav = true; // Default to allowing navigation
    this.stepHeaders = [];
    this.actionPanels = [];
  }

  firstUpdated() {
    this.stepHeaders = document.querySelectorAll('mat-step-header');
    this.actionPanels = document.querySelectorAll('div.nx-action-panel');
    this.updateVisibility();
    console.log("first update complete")
  }

  updated(changedProperties) {
    if (changedProperties.has('allownav')) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    console.log("visibility running");
    console.log(this.allownav);

    // Function to prevent navigation
    this.preventNavigation = (event) => {
      if (!this.allownav) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    if (!this.allownav) {
      // Hide elements and add event listeners to prevent navigation
      this.stepHeaders.forEach((header) => {
        header.style.display = 'none';
        header.addEventListener('click', this.preventNavigation, true);
      });

      this.actionPanels.forEach((panel) => {
        let parent = panel;
        for (let i = 0; i < 7; i++) {
          parent = parent.parentElement;
          if (!parent) break; // avoid null parent if the hierarchy is less than 7
        }
        if (parent) {
          parent.style.display = 'none';
          parent.addEventListener('click', this.preventNavigation, true);
        }
      });

    } else {
      // Show elements and remove event listeners
      this.stepHeaders.forEach((header) => {
        header.style.display = '';
        header.removeEventListener('click', this.preventNavigation, true);
      });

      this.actionPanels.forEach((panel) => {
        let parent = panel;
        for (let i = 0; i < 7; i++) {
          parent = parent.parentElement;
          if (!parent) break; // avoid null parent if the hierarchy is less than 7
        }
        if (parent) {
          parent.style.display = '';
          parent.removeEventListener('click', this.preventNavigation, true);
        }
      });
    }
  }
  
  render() {
    return html`
    <p>${this.allownav}</p>
    `;
  }
}

customElements.define('neo-pagehold', NeoPageHoldElement);
