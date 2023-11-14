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

  static properties = {
    htmlOutput: '',
    htmlValue: '',
  };

  constructor() {
    super();
    this.htmlValue = '';
    this.htmlOutput = '';
    this.tinymceLoaded = false;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!window.tinymce) {
      console.log("script being added");
      if (!this.tinymceLoaded){
        await this.loadTinyMCEScript();
        this.tinymceLoaded = true;
      }
      this.initializeTinyMCE();
    }
  }
  
  loadTinyMCEScript() {
    return new Promise((resolve, reject) => {
      const apiKey = this.apikey || '';
      const script = document.createElement('script');
      script.src = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6.7.2-32/tinymce.min.js`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (window.tinymce) {
      tinymce.remove(this.shadowRoot.querySelector('textarea#tiny-mce-editor'));
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  dispatchValueChange(newHtmlValue) {
    console.log('Editor content changed');
    console.log('New HTML Value:', newHtmlValue);
    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: false,
      cancelable: true,
      composed: true,
      detail: newHtmlValue,
    });
  
    setTimeout(() => this.dispatchEvent(customEvent), 100);
  }

  shouldUpdate(changedProperties) {
    return !(changedProperties.size === 1 && changedProperties.has('htmlOutput'));
  }

  async initializeTinyMCE() {
    // Check for an existing instance and clean it up if necessary
    const existingEditor = tinymce.get('tiny-mce-editor');
    if (existingEditor) {
      existingEditor.remove();
    }

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
          editor.on('init', () => {
            console.log('Editor initialized');
            if (this.htmlValue) {
              editor.setContent(this.htmlValue);
            }
          });
          editor.on('blur', () => {
            if (editor.isDirty()) {
              console.log('Editor instance:', editor);
              const newHtmlValue = editor.getContent();
              this.dispatchValueChange(newHtmlValue);
              editor.setDirty(false);
          }
        });
        
        },
      });
    }
  }
  
  render() {
    const stylesheetUrl = `https://cdn.tiny.cloud/1/${this.apikey || ''}/tinymce/6/skins/ui/oxide/content.min.css`;
    return html`
      <div>
      <link rel="stylesheet" href="${stylesheetUrl}">
        <textarea id="tiny-mce-editor">${this.htmlValue}</textarea>
      </div>
    `;
  }
}


customElements.define('neo-tinymce', tinyMCEElement);