import { LitElement, html, css } from 'lit';

class NeoPageHoldElement extends LitElement {
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
          type: 'boolean',
          defaultValue: true,
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
    this.applyhold = true;
    this.stepHeaders = [];
    this.actionPanels = [];
  }

  firstUpdated() {
    this.stepHeaders = this.shadowRoot.querySelectorAll('mat-step-header');
    this.actionPanels = this.shadowRoot.querySelectorAll('div.nx-action-panel');
    this.updateVisibility();
  }

  updated(changedProperties) {
    if (changedProperties.has('applyhold')) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    const displayValue = this.applyhold ? 'none' : '';

    this.stepHeaders.forEach((header) => {
      header.style.display = displayValue;
    });

    this.actionPanels.forEach((panel) => {
      let parent = panel;
      for (let i = 0; i < 7; i++) {
        parent = parent.parentElement;
      }
      parent.style.display = displayValue;
    });
  }

  render() {
    return html`
      <!-- Your desired HTML markup here -->
    `;
  }
}

customElements.define('neo-pagehold', NeoPageHoldElement);
