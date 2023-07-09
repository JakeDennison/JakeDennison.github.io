import { LitElement, html, css } from 'lit';
import validate from 'validate.js';

class pwElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-password',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-password/dist/lock.svg",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        passMin: {
          title: 'Minimum Password Length',
          description: 'From 8 - 128',
          type: 'integer',
          minimum: 8,
          maximum: 128,
          defaultValue: 8,
        },
        passMax: {
          title: 'Maximum Password Length',
          description: 'From 8 - 255',
          type: 'integer',
          minimum: 8,
          maximum: 255,
          defaultValue: 255,
        },
        boolCaps: {
          title: 'Require capital letters',
          type: 'boolean',
          defaultValue: true,
        },
        boolNum: {
          title: 'Require Numbers',
          type: 'boolean',
          defaultValue: true,
        },
        boolSC: {
          title: 'Require special characters',
          type: 'boolean',
          defaultValue: true,
        },
        passStr: {
          title: 'Show password strength bar',
          type: 'boolean',
          defaultValue: true,
        },
        passVal: {
          title: 'Password Output',
          description: 'Maximum 255 characters',
          type: 'string',
          maxLength: 255,
          isValueField: true,
          staticProperties: true,
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
    passMin: '',
    passMax: '',
    boolCaps: false,
    boolNum: false,
    boolSC: false,
    passStr: false
  };
  
  constructor() {
    super();
    this.passMin = 8;
    this.passMax = 128;
    this.boolCaps = false;
    this.boolNum = false;
    this.boolSC = false;
    this.passStr = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .strength-bar {
        height: 10px;
        background-color: #e6e6e6;
        margin-top: 5px;
      }

      .strength-level {
        height: 100%;
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('passMin') || changedProperties.has('passMax') || changedProperties.has('boolCaps') ||
        changedProperties.has('boolNum') || changedProperties.has('boolSC')) {
      this.validateForm();
    }
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        class="form-control"
        minlength="${this.passMin}"
        maxlength="${this.passMax}"
        required
        @input="${this.handlePasswordInput}"
        @blur="${this.validateForm}"
      />
  
      <div id="passwordHelpBlock" class="form-text">
        Your password must be at least ${this.passMin} characters long and contain
        ${this.boolCaps ? 'uppercase letters, ' : ''}
        ${this.boolCaps && this.boolNum ? 'numbers, and ' : ''}
        ${this.boolNum ? 'numbers, ' : ''}
        ${this.boolNum && this.boolSC ? 'special characters, and ' : ''}
        ${this.boolSC ? 'special characters' : ''}.
      </div>
  
      ${this.passStr ? html`
        <div class="strength-bar">
          <div class="strength-level" style="width: ${this.calculatePasswordStrength()}%"></div>
        </div>
      ` : ''}
    `;
  }

  calculatePasswordStrength(password) {
    let strength = 0;

    // Length-based strength calculation
    if (password && password.length >= this.passMin && password.length <= this.passMax) {
      strength += 20; // Increment strength by 20 if the length is within the specified range
    }
  
    // Complexity-based strength calculation
    const complexityRequirements = [
      this.boolCaps, // Uppercase letters requirement
      this.boolNum,  // Numbers requirement
      this.boolSC    // Special characters requirement
    ];
  
    const complexityCount = complexityRequirements.filter(req => req).length;
    const complexityPercentage = complexityCount / complexityRequirements.length;
  
    if (complexityPercentage === 1) {
      strength += 40; // Increment strength by 40 if all complexity requirements are met
    } else if (complexityPercentage > 0) {
      strength += 20; // Increment strength by 20 if at least one complexity requirement is met
    }
  
    return strength;
  }
  
  handlePasswordInput(event) {
    const password = event.target.value;
    const strength = this.calculatePasswordStrength(password);
  
    const strengthLevel = this.shadowRoot.querySelector('.strength-level');
    strengthLevel.style.width = `${strength}%`;
  
    const customEvent = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: password,
    });
  
    this.dispatchEvent(customEvent);
  }

  validateForm() {
    const passwordInput = this.shadowRoot.querySelector('#password');
    const validationResults = validate.single(passwordInput.value, {
      presence: true,
      length: {
        minimum: this.passMin,
        maximum: this.passMax,
        tooShort: `Password must be at least ${this.passMin} characters long`,
        tooLong: `Password must be at most ${this.passMax} characters long`,
      },
      ...(this.boolCaps && { format: { pattern: '[A-Z]', message: 'Password must contain at least one uppercase letter' } }),
      ...(this.boolNum && { format: { pattern: '[0-9]', message: 'Password must contain at least one number' } }),
      ...(this.boolSC && { format: { pattern: '[!@#$%^&*]', message: 'Password must contain at least one special character' } })
    });

    if (validationResults) {
      const error = validationResults[0];
      passwordInput.setCustomValidity(error);
    } else {
      passwordInput.setCustomValidity('');
    }
  }

}

customElements.define('neo-password', pwElement);
