import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

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

  static get styles() {
    return css`
      select {
        font-size: 16px;
        padding: 8px;
        margin: 8px;
      }
    `;
  }

  render() {
    return html`
      <select @change="${this._handleLanguageChange}">
        <option value="English">English</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
        <option value="Dutch">Dutch</option>
      </select>
      <p>Language is: ${this.propLang}</p>
      <p>Select to sign: ${this.signhere}</p>
      <p>Enter an address: ${this.enteradd}</p>
      <p>Drag files here or: ${this.draghere}</p>
      <p>Select files: ${this.uploadbtn}</p>
    `;
  }

  _handleLanguageChange(event) {
    this.propLang = event.target.value;
    if (event.target.value === "English") {
      // original translations
      this.signhere = 'Select to sign';
      this.enteradd = 'Enter an address';
      this.draghere = 'Drag files here or';
      this.uploadbtn = 'Select files';
    } else if (event.target.value === "German") {
      // german translations
      this.signhere = 'Klicken Sie hier; um zu unterschreiben';
      this.enteradd = 'Gib eine Adresse ein';
      this.draghere = 'Ziehen Sie Dateien hierher oder';
      this.uploadbtn = 'Dateien auswählen';
    } else if (event.target.value === "Spanish") {
      // spanish translations
      this.signhere = 'Haga clic aquí para firmar';
      this.enteradd = 'Ingrese una dirección';
      this.draghere = 'Arrastre archivos aquí o';
      this.uploadbtn = 'Seleccionar archivos';
    } else if (event.target.value === "Dutch") {
      // dutch translations
      this.signhere = 'Klik hier om te ondertekenen';
      this.enteradd = 'Voer een adres in';
      this.draghere = 'Sleep bestanden hierheen of';
      this.uploadbtn = 'Selecteer bestanden';
    };
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