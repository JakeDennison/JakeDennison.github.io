import { LitElement, html, css } from 'lit';

class base64viewerElement extends LitElement {
  static getMetaConfig() {
    const svgBase64 = 'PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNTEyLjAwMDAwMHB0IiBoZWlnaHQ9IjUxMi4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDUxMi4wMDAwMDAgNTEyLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTEyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTk4OCA1MDk5IGMtMjMgLTEyIC00NiAtMzUgLTU4IC01OSAtMTggLTM2IC0yMCAtNTggLTIwIC0yODAgbDAKLTI0MCAtMjQwIDAgYy0yMjIgMCAtMjQ0IC0yIC0yODAgLTIwIC0yNiAtMTMgLTQ3IC0zNCAtNjAgLTYwIC0xOSAtMzggLTIwCi01OCAtMjAgLTY3MCAwIC02MTIgMSAtNjMyIDIwIC02NzAgMTMgLTI2IDM0IC00NyA2MCAtNjAgMzYgLTE4IDU4IC0yMCAyODAKLTIwIGwyNDAgMCAwIC0xNDUwIGMwIC0xNDM0IDAgLTE0NTEgMjAgLTE0OTAgMTMgLTI2IDM0IC00NyA2MCAtNjAgMzkgLTIwIDU1Ci0yMCAxODcwIC0yMCAxODE1IDAgMTgzMSAwIDE4NzAgMjAgMjYgMTMgNDcgMzQgNjAgNjAgMjAgMzkgMjAgNTUgMjAgMjAzMCAwCjE4MDMgLTIgMTk5NCAtMTYgMjAyMyAtMjIgNDQgLTkyMCA5NDQgLTk2NiA5NjggLTM2IDE5IC03MiAxOSAtMTQyMCAxOSAtMTM1NwotMSAtMTM4NCAtMSAtMTQyMCAtMjF6IG0yNjIyIC02NjkgYzAgLTM3MiAxIC0zOTMgMjAgLTQzMCAxMyAtMjYgMzQgLTQ3IDYwCi02MCAzNyAtMTkgNTggLTIwIDQzMCAtMjAgbDM5MCAwIDAgLTE4MTAgMCAtMTgxMCAtMTY1MCAwIC0xNjUwIDAgMCAxMzYwIDAKMTM2MCA4NDAgMCBjODIzIDAgODQyIDAgODgwIDIwIDI2IDEzIDQ3IDM0IDYwIDYwIDE5IDM4IDIwIDU4IDIwIDY3MCAwIDYxMgotMSA2MzIgLTIwIDY3MCAtMTMgMjYgLTM0IDQ3IC02MCA2MCAtMzggMjAgLTU3IDIwIC04ODAgMjAgbC04NDAgMCAwIDE1MCAwCjE1MCAxMjAwIDAgMTIwMCAwIDAgLTM5MHogbTQ5NSAtMjAgbDE5MCAtMTkwIC0xOTMgMCAtMTkyIDAgMCAxOTAgYzAgMTA1IDEKMTkwIDMgMTkwIDEgMCA4OCAtODUgMTkyIC0xOTB6IG0tMTM5NSAtNjQwIGwwIC00NTAgLTEwNTAgMCAtMTA1MCAwIDAgNDUwIDAKNDUwIDEwNTAgMCAxMDUwIDAgMCAtNDUweiIvPgo8cGF0aCBkPSJNMTU4OCAyNjk5IGMtMjMgLTEyIC00NiAtMzUgLTU4IC01OSAtMjAgLTM4IC0yMCAtNTcgLTIwIC04MzAgMAotNzczIDAgLTc5MiAyMCAtODMwIDEzIC0yNiAzNCAtNDcgNjAgLTYwIDM5IC0yMCA1NiAtMjAgMTI3MCAtMjAgMTIxNCAwIDEyMzEKMCAxMjcwIDIwIDI2IDEzIDQ3IDM0IDYwIDYwIDIwIDM4IDIwIDU3IDIwIDgzMCAwIDc3MyAwIDc5MiAtMjAgODMwIC0xMyAyNgotMzQgNDcgLTYwIDYwIC0zOSAyMCAtNTYgMjAgLTEyNzIgMjAgLTEyMDggLTEgLTEyMzQgLTEgLTEyNzAgLTIxeiBtNTIyIC00MjkKbDAgLTE1MCAtMTUwIDAgLTE1MCAwIDAgMTUwIDAgMTUwIDE1MCAwIDE1MCAwIDAgLTE1MHogbTE4MDAgMCBsMCAtMTUwIC03NTAKMCAtNzUwIDAgMCAxNTAgMCAxNTAgNzUwIDAgNzUwIDAgMCAtMTUweiBtLTE4MDAgLTc2MCBsMCAtMzEwIC0xNTAgMCAtMTUwIDAKMCAzMTAgMCAzMTAgMTUwIDAgMTUwIDAgMCAtMzEweiBtOTAwIDAgbDAgLTMxMCAtMzAwIDAgLTMwMCAwIDAgMzEwIDAgMzEwCjMwMCAwIDMwMCAwIDAgLTMxMHogbTkwMCAwIGwwIC0zMTAgLTMwMCAwIC0zMDAgMCAwIDMxMCAwIDMxMCAzMDAgMCAzMDAgMCAwCi0zMTB6Ii8+CjxwYXRoIGQ9Ik05ODggMzg5OSBjLTQzIC0yMiAtNzggLTgxIC03OCAtMTI5IDAgLTUwIDM1IC0xMDcgODAgLTEzMCAzNyAtMTkKNTggLTIwIDM3MCAtMjAgMzEyIDAgMzMzIDEgMzcwIDIwIDQ1IDIzIDgwIDgwIDgwIDEzMCAwIDUwIC0zNSAxMDcgLTgwIDEzMAotMzcgMTkgLTU4IDIwIC0zNzIgMjAgLTMxMiAtMSAtMzM1IC0yIC0zNzAgLTIxeiIvPgo8cGF0aCBkPSJNMjE4OCAzODk5IGMtNDMgLTIyIC03OCAtODEgLTc4IC0xMjkgMCAtNTAgMzUgLTEwNyA4MCAtMTMwIDIxIC0xMQo1MyAtMjAgNzAgLTIwIDc2IDAgMTUwIDc0IDE1MCAxNTAgMCA1MCAtMzUgMTA3IC04MCAxMzAgLTQ5IDI1IC05NCAyNSAtMTQyCi0xeiIvPgo8L2c+Cjwvc3ZnPgo=';
    // plugin contract information
    return {
      controlName: 'neo-base64viewer',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: `data:image/svg+xml;base64,${svgBase64}`,
      groupName: 'Visual',
      version: '1.0',
      properties: {
        base64Data: {
          type: 'string',
          title: 'File as Base64',
          description: 'Please convert the file into Base64 and enter the value here.'
        },
        pdfparam: {
          type: 'string',
          title: 'PDF parameters',
          description: 'https://tinytip.co/tips/html-pdf-params/ - e.g. #zoom=FitH'
        },
        docheight: {
          type: 'string',
          title: 'Height',
        },
      },
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
        width: 100%;
        height:600px;
      }
    `;
  }
  
  constructor() {
    super();
    this.base64Data = '';
    this.pdfparam = '';
    this.docheight = '';
  }

  render() {
    if (!this.base64Data) {
      return html``;
    }

    const pdfParams = this.pdfparam ? `#${this.pdfparam}` : '';
    const dataUrl = `data:application/pdf;base64,${this.base64Data}`;

    const iframeStyle = this.docheight
      ? `height: ${this.docheight};`
      : '';

    return html`
      <iframe
        src="${dataUrl}${pdfParams}"
        style="${iframeStyle}"
        width="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    `;
  }
}

customElements.define('neo-base64viewer', base64viewerElement);
