import { LitElement, html, css } from 'lit';
import 'tinymce/tinymce';
import 'tinymce/skins/ui/oxide/content.css';

class tinyMCEElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-tinymce',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        htmlValue: {
          type: 'string',
          title: 'HTML value to be displayed in the editor',
          description: 'Provide a variable or stringified html'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  
  firstUpdated() {
    tinymce.init({
      selector: 'textarea', // Selector for the textarea element to convert into an editor
      plugins: 'autoresize lists link image', // List of plugins to enable
      toolbar: 'undo redo | bold italic | bullist numlist | link image', // Toolbar buttons and layout
      autoresize_max_height: 500, // Maximum height for autoresize
      autoresize_min_height: 200, // Minimum height for autoresize
      statusbar: true, // Show the status bar
      branding: false, // Remove TinyMCE branding
      setup: function (editor) {
        // Custom setup function for additional configuration or event handling
        editor.on('init', function () {
          console.log('Editor initialized');
        });
      },
    });
    
  }


  constructor() {
    super();
    this.htmlValue = '';
  }

  render() {
    return html`
      <div>
        <!-- Your TinyMCE editor here -->
        <textarea>${this.htmlValue}</textarea>
      </div>
    `;
  }
}


customElements.define('neo-tinymce', tinyMCEElement);
