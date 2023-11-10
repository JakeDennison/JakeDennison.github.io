import { LitElement, html, css } from 'lit';
import tinymce from 'tinymce';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/ui/oxide/skin.min.css';

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

  constructor() {
    super();
    this.htmlValue = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeTinyMCE();
  }

  initializeTinyMCE() {
    console.log("tinyMCE init")
    // Ensure the element is rendered before initializing TinyMCE
    this.updateComplete.then(() => {
      tinymce.init({
        target: this.renderRoot.querySelector('#tiny-mce-editor'),
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
        setup: editor => {
          editor.on('init', () => {
            console.log('Editor initialized');
          });
          editor.on('change', () => {
            this.htmlValue = editor.getContent();
            this.dispatchEvent(new CustomEvent('change', { detail: this.htmlValue }));
          });
        }
      });
    });
  }

  render() {
    return html`<textarea id="tiny-mce-editor">${this.htmlValue}</textarea>`;
  }

  get value() {
    return this.htmlValue;
  }
  
  set value(val) {
    this.htmlValue = val;
    if (tinymce.get('tiny-mce-editor')) {
      tinymce.get('tiny-mce-editor').setContent(val);
    }
  }
}


customElements.define('neo-tinymce', tinyMCEElement);
