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
  }

  render() {
    if (this.applyhold) {
      // Apply hold, disable <mat-step-header> elements and 7th parent of <div> elements with class "nx-action-panel"
      const disableElements = () => {
        const stepHeaders = this.shadowRoot.querySelectorAll('mat-step-header');
        stepHeaders.forEach((header) => {
          header.disabled = true;
        });

        const actionPanels = this.shadowRoot.querySelectorAll('div.nx-action-panel');
        actionPanels.forEach((panel) => {
          let parent = panel;
          for (let i = 0; i < 7; i++) {
            parent = parent.parentElement;
          }
          parent.disabled = true;
        });
      };

      // Call the disableElements function when the element is connected to the DOM
      this.updateComplete.then(() => {
        disableElements();
      });
    }

    return html`
      <!-- Your desired HTML markup here -->
    `;
  }
}

customElements.define('neo-pagehold', templateElement);
