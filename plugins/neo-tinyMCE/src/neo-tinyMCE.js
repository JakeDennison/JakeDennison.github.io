import { LitElement, html, css } from 'lit';

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
          title: 'Default HMTL',
          description: 'Provide a variable or stringified html',
        },
        htmlOutput: {
          type: 'string',
          title: 'Output HMTL',
          description: 'Provide a variable or stringified html',
          isValueField: true,
        },
        apikey: {
          type: 'string',
          title: 'tinyMCE API Key',
          description: 'provide your tinyMCE API Key',
        },
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  constructor() {
    super();
    this.htmlValue = '';
    this.htmlOutput = '';
    this.tinymceInitialized = false; // Add an initialization flag
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  handleChangeEvent(newHtmlValue) {
    console.log('Editor content changed');
    this.htmlOutput = newHtmlValue;
    this.requestUpdate('htmlOutput');
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      bubbles: true,
      composed: true,
      detail: newHtmlValue,
    }));
  }

  loadTinyMCEScript() {
    console.log("load state:"+this.tinymceInitialized)
    if (!window.tinymce && !this.tinymceInitialized) {
      console.log("script being added");
      console.log(this.apikey);
      const apiKey = this.apikey || '';
      const script = document.createElement('script');
      script.src = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6.7.2-32/tinymce.min.js`;
      script.onload = () => {
        this.initializeTinyMCE();
      };
      document.head.appendChild(script);
    } else if (!this.tinymceInitialized) {
      this.initializeTinyMCE();
    }
  }

  initializeTinyMCE() {
    console.log("TinyMCE script loaded")
    const textarea = this.shadowRoot.querySelector('textarea#tiny-mce-editor')
    if (textarea) {
      console.log("tinyMCE init")
      tinymce.init({
        target: textarea,
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
        setup: (editor) => {
          // Custom setup function for additional configuration or event handling
          editor.on('init', () => {
            console.log('Editor initialized');
            // Set the initial content of the editor to this.htmlValue
            editor.setContent(this.htmlValue);
          });
          editor.on('Change', (editor) => {
            const newHtmlValue = editor.getContent();
            this.handleChangeEvent(newHtmlValue);
          });
        },
      });

      this.tinymceInitialized = true; // Set the flag to indicate initialization
      console.log("init state:"+this.tinymceInitialized)
    }
  }
  
  render() {
    this.loadTinyMCEScript();
    const stylesheetUrl = `https://cdn.tiny.cloud/1/${this.apikey || ''}/tinymce/6/skins/ui/oxide/content.min.css`;
    return html`
      <div>
      <link rel="stylesheet" href="${stylesheetUrl}">
        <!-- Your TinyMCE editor here -->
        <textarea id="tiny-mce-editor">${this.htmlValue}</textarea>
      </div>
    `;
  }
}


customElements.define('neo-tinymce', tinyMCEElement);
