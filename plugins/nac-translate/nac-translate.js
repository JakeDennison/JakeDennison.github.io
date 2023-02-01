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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      <select class="ng-select-container" aria-label="English" id="language-select" @change="${this._handleLanguageChange}">
        <option selected><span class="fi fi-GB"></span> English</option>
        <option value="German"><span class="fi fi-DE"></span> Deutsch</option>
        <option value="German"><span class="fi fi-FR"></span> Français</option>
        <option value="Spanish"><span class="fi fi-ES"></span> Español</option>
        <option value="Dutch"><span class="fi fi-NL"></span> Nederlands</option>
      </select>
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
    } else if (event.target.value === "Deutsch") {
      // german translations
      this.signhere = 'Klicken Sie hier; um zu unterschreiben';
      this.enteradd = 'Gib eine Adresse ein';
      this.draghere = 'Ziehen Sie Dateien hierher oder';
      this.uploadbtn = 'Dateien auswählen';
    } else if (this.propLang === "Français") {
      // spanish translations
      this.signhere = 'Sélectionnez pour signer';
      this.enteradd = 'Entrer une adresse';
      this.draghere = 'Faites glisser des fichiers ici ou';
      this.uploadbtn = 'Sélectionnez des fichiers';
    } else if (event.target.value === "Español") {
      // spanish translations
      this.signhere = 'Haga clic aquí para firmar';
      this.enteradd = 'Ingrese una dirección';
      this.draghere = 'Arrastre archivos aquí o';
      this.uploadbtn = 'Seleccionar archivos';
    } else if (event.target.value === "Nederlands") {
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