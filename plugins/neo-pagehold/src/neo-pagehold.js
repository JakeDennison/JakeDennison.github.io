import { LitElement, html, css } from 'lit';

class NeoPageHoldElement extends LitElement {

  static get properties() {
    return {
      allownav: { type: Boolean },
      allownavProp: { type: Boolean },
      allowsubmit: { type: Boolean },
      allowsubmitProp: { type: Boolean }
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
        allownavProp: {
          title: 'Allow Navigation?',
          type: 'boolean'
        },
        allowsubmitProp: {
          title: 'Allow Submission?',
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
      .disabled-button {
        opacity: 0.5; /* Adjust the opacity to make the button look washed out */
        pointer-events: none; /* Prevent interactions */
      }
    `;
  }

  constructor() {
    super();
    this.allownav = false;
    this.allownavProp = false;
    this.allowsubmit = false;
    this.allowsubmitProp = false;
    this.stepHeaders = [];
    this.actionPanels = [];
  }

  firstUpdated() {
    const formDesigner = document.querySelector('.nx-zinc-form-designer');

    if (formDesigner && formDesigner.classList.contains('mode-form-builder')) {
      console.log('In form builder mode, no functions applied');
      return;
    }

    this.stepHeaders = document.querySelectorAll('mat-step-header');
    this.actionPanels = document.querySelectorAll('div.nx-action-panel');
    this.allownav = this.allownavProp; // Initialize allownav based on allownavProp
    this.allowsubmit = this.allowsubmitProp; // Initialize allowsubmit based on allowsubmitProp
    this.updateVisibility();
    this.updateSubmitButton();
    console.log("first update complete");
  }

  updated(changedProperties) {
    const formDesigner = document.querySelector('.nx-zinc-form-designer');

    if (formDesigner && formDesigner.classList.contains('mode-form-builder')) {
      console.log('In form builder mode, no functions applied');
      return;
    }

    if (changedProperties.has('allownav')) {
      this.updateVisibility();
    }
    if (changedProperties.has('allowsubmit')) {
      this.updateSubmitButton();
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

  updateSubmitButton() {
    const submitButton = document.querySelector('button[data-e2e="btn-submit"]');
    if (submitButton) {
      if (!this.allowsubmit) {
        submitButton.disabled = true;
        submitButton.classList.add('disabled-button');
      } else {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled-button');
      }
    }
  }

  render() {
    return html`
      <p>${this.allownav}</p>
      <p>${this.allowsubmit}</p>
    `;
  }
}

customElements.define('neo-pagehold', NeoPageHoldElement);
