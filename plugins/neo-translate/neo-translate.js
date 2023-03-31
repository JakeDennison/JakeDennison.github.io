import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {translations} from 'https://jsdenintex.github.io/plugins/neo-translate/translations.js';
import {targets} from 'https://jsdenintex.github.io/plugins/neo-translate/targets.js';


export class TranslateMod extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'translate-mod',
      fallbackDisableSubmit: false,
      description: 'provide a plugin to translate the form',
      iconUrl: "multiline-text",
      groupName: 'Languages',
      version: '1.9',
      properties: { 
        locale: {
          title: 'Locale',
          type: 'string',
        	description: 'used for storing language value',
          isValueField: true,
        },
        txtdir: {type: String},
        signhere: {type: String},
        enteradd: {type: String},
        draghere: {type: String},
        uploadbtn: {type: String},
        y: {type: String},
        n: {type: String},
        todayBtn: {type: String}
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        description: true,
      },
    };
  }
  
  constructor() {
    super();
    this.locale = "en"
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      <div class="container-fluid">
        <div class="row">
          <select class="form-select m-0 col-md-3 col-sm-12" aria-label="Language" id="language-select" @change="${this._handleLanguageChange}">
            <option value="en">
              English
            </option>
            <option value="de">
              Deutsch
            </option>
            <option value="fr">
              Français
            </option>
            <option value="es">
              Español
            </option>
            <option value="nl">
              Nederlands
            </option>
            <option value="ar">
              العربية
            </option>
            <option value="he">
              עִברִית
            </option>
          </select>
        </div>
      </div>
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const select = document.querySelector('#language-select');
          select.value = 'en';
          console.log('autoload is working')
        });
      </script>
    `;
  }

  _setTranslations() {
    this.txtdir = translations[this.locale].txtdir;
    this.signhere = translations[this.locale].signhere;
    this.enteradd = translations[this.locale].enteradd;
    this.draghere = translations[this.locale].draghere;
    this.uploadbtn = translations[this.locale].uploadbtn;
    this.y = translations[this.locale].y;
    this.n = translations[this.locale].n;
    this.todayBtn = translations[this.locale].todayBtn;
  }

  _translateOnLoad() {
    this._setTranslations();
    this._translatePage();
    console.log("function called on load");
  }

  _handleLanguageChange(event) {
    this.locale = event.target.value;
    this._setTranslations();
    this._translatePage();
  }


  _translatePage() {
    this.setLocale();
    this.updateCSS();
    this.TranslateInnerHTML(targets.signhere, this.signhere);
    this.TranslatePlaceholder(targets.enteradd, this.enteradd);
    this.TranslateInnerHTML(targets.draghere, this.draghere);
    this.TranslateBtn(targets.uploadbtn, this.uploadbtn);
    this.TranslateInnerHTML(targets.toggleOn, this.y);
    this.TranslateInnerHTML(targets.toggleOff, this.n);
    this.TranslateBtn(targets.todayBtn, this.todayBtn);
    this.valueChangeEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.locale,
    });
    this.dispatchEvent(this.valueChangeEvent);
  }

  updateCSS() {
    // check if the current txtdir is rtl
    if (this.txtdir === 'rtl') {
      // create a link element for the rtl.css file
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://jsdenintex.github.io/src/css/nwcRTL.css';
      link.id = 'rtl-stylesheet';
  
      // add the link element to the document's head
      document.head.appendChild(link);
    } else {
      // remove the rtl.css file if it was added
      const link = document.querySelector('#rtl-stylesheet');
      if (link) {
        link.remove();
      }
    }
  }

  setLocale(){
    document.documentElement.lang = this.locale;
    document.documentElement.dir = this.txtdir;
  }

  TranslateInnerHTML(targetClass,translation){
      const elements = document.querySelectorAll(targetClass);
      elements.forEach(element => {
        element.innerHTML = translation;
      });
  }

  TranslatePlaceholder(targetClass,translation){
      var elements = document.getElementsByClassName(targetClass);
      for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute("placeholder", translation);
      }
  }

  TranslateBtn(targetClass,translation){
      const elements = document.querySelectorAll(targetClass);
      elements.forEach(element => {
        element.innerHTML = translation + element.innerHTML.slice(element.innerHTML.indexOf('<'));
      });
  }

}

customElements.define('translate-mod', TranslateMod);