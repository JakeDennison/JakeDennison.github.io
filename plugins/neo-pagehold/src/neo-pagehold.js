import { LitElement, html, css } from 'lit';

class NeoPageHoldElement extends LitElement {

  static get properties() {
    return {
      applyhold: { type: Boolean }
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
        applyhold: {
          title: 'Apply hold?',
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
    this.applyhold = false; // Initialize applyhold to false
    this.stepHeaders = [];
    this.actionPanels = [];
    this._eventListenersAdded = false;
  }

  firstUpdated() {
    this.stepHeaders = document.querySelectorAll('mat-step-header');
    this.actionPanels = document.querySelectorAll('div.nx-action-panel');
    this.updateVisibility(); // Ensure visibility is updated after first render
    console.log("first update complete")
  }

  updated(changedProperties) {
    if (changedProperties.has('applyhold')) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    console.log("visibility running");
    console.log(this.applyhold);

    // Function to toggle event listeners
    const toggleEventListeners = (add) => {
      const method = add ? 'addEventListener' : 'removeEventListener';
      this.stepHeaders.forEach((header) => {
        header[method]('click', this.preventNavigation);
      });
      this.actionPanels.forEach((panel) => {
        panel[method]('click', this.preventNavigation);
      });
    };

    // Function to prevent navigation
    this.preventNavigation = (event) => {
      if (this.applyhold) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    if (this.applyhold) {
      // Hide elements and add event listeners if not already added
      this.stepHeaders.forEach((header) => {
        header.style.display = 'none';
      });

      this.actionPanels.forEach((panel) => {
        let parent = panel;
        for (let i = 0; i < 7; i++) {
          parent = parent.parentElement;
          if (!parent) break; // avoid null parent if the hierarchy is less than 7
        }
        if (parent) parent.style.display = 'none'; // apply style only if parent is not null
      });

      if (!this._eventListenersAdded) {
        toggleEventListeners(true); // Add event listeners to prevent navigation
        this._eventListenersAdded = true;
      }

    } else {
      // Show elements and remove event listeners if previously added
      this.stepHeaders.forEach((header) => {
        header.style.display = '';
      });

      this.actionPanels.forEach((panel) => {
        let parent = panel;
        for (let i = 0; i < 7; i++) {
          parent = parent.parentElement;
          if (!parent) break; // avoid null parent if the hierarchy is less than 7
        }
        if (parent) parent.style.display = ''; // apply style only if parent is not null
      });

      if (this._eventListenersAdded) {
        toggleEventListeners(false); // Remove event listeners
        this._eventListenersAdded = false;
      }
    }
  }
  
  render() {
    return html`
    <p>${this.applyhold}</p>
    `;
  }
}

customElements.define('neo-pagehold', NeoPageHoldElement);
