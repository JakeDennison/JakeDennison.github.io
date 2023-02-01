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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <div class="dropdown">
        <a class="dropdown-toggle" href="#" id="Dropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <i class="flag-united-kingdom flag m-0"></i>
        </a>
        <ul class="dropdown-menu" aria-labelledby="Dropdown">
            <li>
                <a class="dropdown-item" href="#"  @click="${() => this._handleLanguageChange('English')}">
                    <i class="flag-united-kingdom flag"></i>English <i class="fa fa-check text-success ms-2"></i></a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
                <a class="dropdown-item" href="#" @click="${() => this._handleLanguageChange('Deutsch')}">
                    <i class="flag-germany flag"></i>Deutsch</a>
            </li>
            <li>
                <a class="dropdown-item" href="#" @click="${() => this._handleLanguageChange('Français')}">
                    <i class="flag-france flag"></i>Français</a>
            </li>
            <li>
                <a class="dropdown-item" href="#" @click="${() => this._handleLanguageChange('Español')}">
                    <i class="flag-spain flag"></i>Español</a>
            </li>
            <li>
                <a class="dropdown-item" href="#" @click="${() => this._handleLanguageChange('Nederlands')}">
                    <i class="flag-portugal flag"></i>Nederlands</a>
            </li>
        </ul>
    </div>
    `;
  }

  _handleLanguageChange(e) {
    this.propLang = e.target.textContent;
    if (this.propLang === "English") {
      // original translations
      this.signhere = 'Select to sign';
      this.enteradd = 'Enter an address';
      this.draghere = 'Drag files here or';
      this.uploadbtn = 'Select files';
    } else if (this.propLang === "Deutsch") {
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
    } else if (this.propLang === "Español") {
      // spanish translations
      this.signhere = 'Haga clic aquí para firmar';
      this.enteradd = 'Ingrese una dirección';
      this.draghere = 'Arrastre archivos aquí o';
      this.uploadbtn = 'Seleccionar archivos';
    } else if (this.propLang === "Nederlands") {
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