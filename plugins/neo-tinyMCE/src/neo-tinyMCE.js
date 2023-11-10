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
      selector: 'textarea#basic-example',
      plugins: [
        'advlist', 'autoresize', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
      autoresize_max_height: 500,
      autoresize_min_height: 200,
      statusbar: true,
      branding: false,
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
        <textarea id="basic-example">${this.htmlValue}</textarea>
      </div>
    `;
  }
}


customElements.define('neo-tinymce', tinyMCEElement);
