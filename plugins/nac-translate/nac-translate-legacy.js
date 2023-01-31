import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class Placeholder extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'translate-legacy',
      fallbackDisableSubmit: false,
      description: 'provide a plugin to translate the form',
      iconUrl: "group-control",
      groupName: 'Languages',
      version: '1.3',
      properties: {
        propLang: {
          title: 'Language',
          type: 'string',
        enum: ['English', 'German', 'Spanish', 'Dutch'],
          showAsRadio: false,
          verticalLayout: true,
          defaultValue: 'English',
        },
      },
      standardProperties: {
        readOnly: true,
        description: true,
      }
    };
  };

  trSignature(targetClass, signText) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = signText;
    });
  };

  _trAddressPH(className, placeholder) {
    var elements = document.getElementsByClassName(className);
    
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute("placeholder", placeholder);
    }
  };

  _trFileUpload(targetClass, Dragheretxt) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = Dragheretxt;
    });
  };

  _trUploadBtn(targetClass, btntext) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = btntext + element.innerHTML.slice(element.innerHTML.indexOf('<'));
    });
  };

  _translate(selectLang) {
    console.log("Translate is calling");
    const select = document.querySelector("#language-select");
    // English
    const signhere_EN = 'Select to sign';
    const enteradd_EN = 'Enter an address';
    const draghere_EN = 'Drag files here or';
    const uploadbutton_EN = 'Select files';
    // German
    const signhere_DE = 'Klicken Sie hier; um zu unterschreiben';
    const enteradd_DE = 'Gib eine Adresse ein';
    const draghere_DE = 'Ziehen Sie Dateien hierher oder';
    const uploadbutton_DE = 'Dateien auswählen';
    //Spanish
    const signhere_ES = 'Haga clic aquí para firmar';
    const enteradd_ES = 'Ingrese una dirección';
    const draghere_ES = 'Arrastre archivos aquí o';
    const uploadbutton_ES = 'Seleccionar archivos';
    //Dutch
    const signhere_NL = 'Klik hier om te ondertekenen';
    const enteradd_NL = 'Voer een adres in';
    const draghere_NL = 'Sleep bestanden hierheen of';
    const uploadbutton_NL = 'Selecteer bestanden';

    console.log(selectLang);
    if (selectLang === "English") {
      // original translations
      _trSignature("h5.d-print-none.ng-star-inserted", signhere_EN);
      _trAddressPH("nx-address-input", enteradd_EN);
      _trFileUpload(".drag-file-label", draghere_EN);
      _trUploadBtn(".nx-upload-button", uploadbutton_EN);
    } else if (selectLang === "German") {
      // german translations
      _trSignature("h5.d-print-none.ng-star-inserted", signhere_DE);
      _trAddressPH("nx-address-input", enteradd_DE);
      _trFileUpload(".drag-file-label", draghere_DE);
      _trUploadBtn(".nx-upload-button", uploadbutton_DE);
    } else if (selectLang === "Spanish") {
      // spanish translations
      _trSignature("h5.d-print-none.ng-star-inserted", signhere_ES);
      _trAddressPH("nx-address-input", enteradd_ES);
      _trFileUpload(".drag-file-label", draghere_ES);
      _trUploadBtn(".nx-upload-button", uploadbutton_ES);
    } else if (selectLang === "Dutch") {
      // dutch translations
      _trSignature("h5.d-print-none.ng-star-inserted", signhere_NL);
      _trAddressPH("nx-address-input", enteradd_NL);
      _trFileUpload(".drag-file-label", draghere_NL);
      _trUploadBtn(".nx-upload-button", uploadbutton_NL);
    }
  };

  constructor() {
    super();
    console.log(propLang);
    const select = propLang;
    this._translate(select);
  };
  _resetMessage;

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <label for="language-select">Translate Plugin</label>
    <select class="form-select" aria-label="English" id="language-select" @change="${this._translate}">
      <option selected>English</option>
      <option value="German">German</option>
      <option value="Spanish">Spanish</option>
      <option value="Dutch">Dutch</option>
    </select>
    `;
  };

};

const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);