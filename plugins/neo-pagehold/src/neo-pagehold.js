import { LitElement, html, css } from 'lit';

class templateElement extends LitElement {
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
    this.updateVisibility()
  }

  updated(changedProperties) {
    if (changedProperties.has('applyhold')) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    const stepHeaders = this.shadowRoot.querySelectorAll('mat-step-header');
    const actionPanels = this.shadowRoot.querySelectorAll('div.nx-action-panel');

    stepHeaders.forEach((header) => {
      header.style.display = this.applyhold ? 'none' : '';
    });

    actionPanels.forEach((panel) => {
      let parent = panel;
      for (let i = 0; i < 7; i++) {
        parent = parent.parentElement;
      }
      parent.style.display = this.applyhold ? 'none' : '';
    });
  }

  render() {
    return html`
      <!-- Your desired HTML markup here -->
    `;
  }
}

customElements.define('neo-pagehold', templateElement);
