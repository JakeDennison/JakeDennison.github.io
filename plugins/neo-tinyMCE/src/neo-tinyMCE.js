import { LitElement, html, css } from 'lit';

class tinyMCEElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-tinymce',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-tinyMCE/dist/tiny-white-sm.svg",
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
        CanvasMnH: {
          type: 'integer',
          title: 'Canvas minimum height px',
          description: 'between 200-1000',
          minimum: 200,
          maximum: 1000,
          defaultValue: 200,
        },
        CanvasMxH: {
          type: 'integer',
          title: 'Canvas maximum height px',
          description: 'between 200-1000',
          minimum: 200,
          maximum: 1000,
          defaultValue: 500,
        },
      },
      events: ["ntx-value-change"],
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
      .tox .tox-mbtn {
        width: auto !important;
      }
      .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `;
  }

  static properties = {
    htmlOutput: '',
    htmlValue: '',
    CanvasMnH: { type: Number },
    CanvasMxH: { type: Number },
    editorId: { type: String },
    uniqueString: { type: String },
  };

  constructor() {
    super();
    this.uniqueString = `tiny-${Math.random().toString(36).substring(2, 11)}`;
    this.editorId = `editor-${this.uniqueString}`;
    this.htmlValue = '';
    this.htmlOutput = '';
    this.CanvasMxH = 200;
    this.CanvasMnH = 500;
    this.EditorFxH = '';
    this.tinymceLoaded = false;
  }

  static stylesheetLoaded = false;

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.htmlValue && !this.htmlOutput) {
      this.dispatchValueChange(this.htmlValue);
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    this.toggleSpinner(true);
    if (!document.querySelector('script[src*="tinymce.min.js"]')) {
      console.log("TinyMCE script being added");
      await this.loadTinyMCEScript();
    }
    if (!document.querySelector('link[href*="oxide/content.min.css"]')) {
      console.log("TinyMCE stylesheet being added");
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://cdn.tiny.cloud/1/${this.apikey || ''}/tinymce/6/skins/ui/oxide/content.min.css`;
      document.head.appendChild(link);
    }
    if (this.tinymceLoaded) {
      this.initializeTinyMCE()
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
      this.tinymceLoaded = true;
    });
  }

  dispatchValueChange(newHtmlValue) {
    console.log('Editor content changed');
    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: newHtmlValue,
    });
  
    this.dispatchEvent(customEvent)
  }

  shouldUpdate(changedProperties) {
    return !(changedProperties.size === 1 && changedProperties.has('htmlValue'));
  }

  toggleSpinner(show) {
    let spinner = this.shadowRoot.querySelector('.spinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.className = 'spinner';
        this.shadowRoot.appendChild(spinner);
    }
    spinner.style.display = show ? 'block' : 'none';
}

  async initializeTinyMCE() {
    if (this.tinymceLoaded) {
      // Check for an existing instance and clean it up if necessary
      setTimeout(async () => {
      const existingEditor = tinymce.get(this.editorId);
      if (existingEditor) {
        existingEditor.remove();
      }
    
      console.log("TinyMCE loading");
    
      const editableDiv = this.shadowRoot.querySelector(`#${this.editorId}`);
      console.log("Editable Div:", editableDiv);

    if (editableDiv) {
      console.log("tinyMCE init");
      console.log("Min:",this.CanvasMnH, "Max:", this.CanvasMxH);
      const min_height = Number(this.CanvasMnH) || 200;
      const max_height = Number(this.CanvasMxH) || 500;
      tinymce.init({
          target: editableDiv,
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
          max_height: max_height,
          min_height: min_height,
          statusbar: true,
          branding: false,
          mobile: {
            menubar: true,
            plugins: 'autosave lists autolink',
            toolbar: 'undo bold italic styles'
          },
          setup: (editor) => {
            editor.on('init', () => {
              this.toggleSpinner(false);
              const editorHeight = editor.getContainer().offsetHeight;
              console.log('Editor initital height:', editorHeight);
              const textarea = this.shadowRoot.querySelector(`#${this.editorId}`);
              if (textarea) {
                  textarea.style.height = `${editorHeight}px`;
              }
            });
            editor.on('blur', () => {
              if (editor.isDirty()) {
                console.log('Editor instance:', editor);
                const newHtmlValue = editor.getContent();
                this.dispatchValueChange(newHtmlValue);
                editor.setDirty(false);
                this.htmlValue = newHtmlValue;
                const editorContainer = editor.getContainer();
                const editorOverallHeight = editorContainer ? editorContainer.offsetHeight : 0;
                console.log('Editor overall height:', editorOverallHeight);
                const textarea = this.shadowRoot.querySelector(`#${this.editorId}`);
                if (textarea) {
                    textarea.style.height = `${editorOverallHeight}px`;
                }
              }
            });
          },
        });
      }
      }, 3000);
    }
  }
  
  render() {
    return html`
      <div>
        <textarea style="width:100%" id="${this.editorId}" .innerHTML="${this.htmlValue}"></textarea>
      </div>
    `;
  }
}


customElements.define('neo-tinymce', tinyMCEElement);