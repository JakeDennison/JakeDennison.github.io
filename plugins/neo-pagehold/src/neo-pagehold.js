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
          title: 'Apply hold',
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
  }

  render() {
    const hideElements = () => {
      const stepHeaders = this.shadowRoot.querySelectorAll('mat-step-header');
      stepHeaders.forEach((header) => {
        header.style.display = 'none';
      });

      const actionPanels = this.shadowRoot.querySelectorAll('div.nx-action-panel');
      actionPanels.forEach((panel) => {
        let parent = panel;
        for (let i = 0; i < 7; i++) {
          parent = parent.parentElement;
        }
        parent.style.display = 'none';
      });
    };

    const unhideElements = () => {
      const stepHeaders = this.shadowRoot.querySelectorAll('mat-step-header');
      stepHeaders.forEach((header) => {
        header.style.display = '';
      });

      const actionPanels = this.shadowRoot.querySelectorAll('div.nx-action-panel');
      actionPanels.forEach((panel) => {
        let parent = panel;
        for (let i = 0; i < 7; i++) {
          parent = parent.parentElement;
        }
        parent.style.display = '';
      });
    };

    if (this.applyhold) {
      hideElements();
    } else {
      unhideElements();
    }

    return html`
      <!-- Your desired HTML markup here -->
    `;
  }
}

customElements.define('neo-pagehold', templateElement);
