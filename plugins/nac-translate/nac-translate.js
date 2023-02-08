import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {translations} from 'https://jsdenintex.github.io/plugins/nac-translate/traslations.js';

export class TranslateMod extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'translate-mod',
      fallbackDisableSubmit: false,
      description: 'provide a plugin to translate the form',
      iconUrl: "multiline-text",
      groupName: 'Languages',
      version: '1.3',
      properties: {
        propLang: {title: 'Language',type: 'string',enum: ['English', 'German', 'Spanish', 'Dutch'],showAsRadio: false,verticalLayout: true,defaultValue: 'English',
      },
      },
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        description: true,
      }
    };
  }

  static properties = {
    propLang: {type: String},
    signhere: {type: String},
    enteradd: {type: String},
    draghere: {type: String},
    uploadbtn: {type: String},
    signTar: {type: String},
    addTar: {type: String},
    dragTar: {type: String},
    uploadTar: {type: String},
  }
  
  constructor() {
    super();
    this.propLang = 'English';
    this.signhere = 'Select to sign';
    this.enteradd = 'Enter an address';
    this.draghere = 'Drag files here or';
    this.uploadbtn = 'Select files';
    this.signTar = 'h5.d-print-none.ng-star-inserted';
    this.addTar = 'nx-address-input';
    this.dragTar = '.drag-file-label';
    this.uploadTar = '.nx-upload-button';
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <div class="container-fluid">
      <div class="row">
        <select class="form-select m-0 col-md-3 col-sm-12" aria-label="English" id="language-select" @change="${this._handleLanguageChange}">
          <option selected value="English" data-content='<i class="fi fi-gb"></i>'>English</option>
          <option value="German" data-content='<i class="fi fi-de"></i>'>Deutsch</option>
          <option value="French" data-content='<i class="fi fi-fr"></i>'>Français</option>
          <option value="Spanish" data-content='<i class="fi fi-es"></i>'>Español</option>
          <option value="Dutch" data-content='<i class="fi fi-nl"></i>'>Nederlands</option>
        </select>
      </div>
    </div>
    `;
  }

  _handleLanguageChange(event) {
    this.propLang = event.target.value;
      this.signhere = translations.$[this.propLang].signhere;
      this.enteradd = translations.$[this.propLang].enteradd;
      this.draghere = translations.$[this.propLang].draghere;
      this.uploadbtn = translations.$[this.propLang].uploadbtn;
    this.TranslateInnerHTML(this.signTar,this.signhere);
    this.TranslatePlaceholder(this.addTar,this.enteradd);
    this.TranslateInnerHTML(this.dragTar,this.draghere);
    this.TranslateBtn(this.uploadTar,this.uploadbtn);
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

const elementName = 'translate-mod';
customElements.define('translate-mod', TranslateMod);