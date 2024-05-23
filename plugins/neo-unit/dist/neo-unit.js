/*! For license information please see neo-unit.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const r=window,a=r.trustedTypes,h=a?a.emptyScript:"",u=r.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},c=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:c};class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=p){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:d).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:d;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var v;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(l=r.reactiveElementVersions)&&void 0!==l?l:r.reactiveElementVersions=[]).push("1.6.1");const y=window,b=y.trustedTypes,$=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,f="?"+_,g=`<${f}>`,A=document,S=(t="")=>A.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,x=/-->/g,U=/>/g,P=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),O=/'/g,T=/"/g,M=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=H(1),N=(H(2),Symbol.for("lit-noChange")),R=Symbol.for("lit-nothing"),k=new WeakMap,F=A.createTreeWalker(A,129,null,!1),L=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",l=w;for(let e=0;e<i;e++){const i=t[e];let r,a,h=-1,u=0;for(;u<i.length&&(l.lastIndex=u,a=l.exec(i),null!==a);)u=l.lastIndex,l===w?"!--"===a[1]?l=x:void 0!==a[1]?l=U:void 0!==a[2]?(M.test(a[2])&&(n=RegExp("</"+a[2],"g")),l=P):void 0!==a[3]&&(l=P):l===P?">"===a[0]?(l=null!=n?n:w,h=-1):void 0===a[1]?h=-2:(h=l.lastIndex-a[2].length,r=a[1],l=void 0===a[3]?P:'"'===a[3]?T:O):l===T||l===O?l=P:l===x||l===U?l=w:(l=P,n=void 0);const d=l===P&&t[e+1].startsWith("/>")?" ":"";o+=l===w?i+g:h>=0?(s.push(r),i.slice(0,h)+"$lit$"+i.slice(h)+_+d):i+_+(-2===h?(s.push(void 0),e):d)}const r=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==$?$.createHTML(r):r,s]};class j{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const l=t.length-1,r=this.parts,[a,h]=L(t,e);if(this.el=j.createElement(a,i),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=F.nextNode())&&r.length<l;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(_)){const i=h[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(_),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?z:"?"===e[1]?W:"@"===e[1]?G:q})}else r.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(_),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),F.nextNode(),r.push({type:2,index:++n});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===f)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(_,t+1));)r.push({type:7,index:n}),t+=_.length-1}n++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,s){var n,o,l,r;if(e===N)return e;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const h=E(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=I(t,a._$AS(t,e.values),a,s)),e}class K{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(i,!0);F.currentNode=n;let o=F.nextNode(),l=0,r=0,a=s[0];for(;void 0!==a;){if(l===a.index){let e;2===a.type?e=new D(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new J(o,this,t)),this.u.push(e),a=s[++r]}l!==(null==a?void 0:a.index)&&(o=F.nextNode(),l++)}return n}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{constructor(t,e,i,s){var n;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),E(t)?t===R||null==t||""===t?(this._$AH!==R&&this._$AR(),this._$AH=R):t!==this._$AH&&t!==N&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==R&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=j.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new K(n,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=k.get(t.strings);return void 0===e&&k.set(t.strings,e=new j(t)),e}k(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new D(this.O(S()),this.O(S()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,n){this.type=1,this._$AH=R,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=I(this,t,e,0),o=!E(t)||t!==this._$AH&&t!==N,o&&(this._$AH=t);else{const s=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=I(this,s[i+l],e,l),r===N&&(r=this._$AH[l]),o||(o=!E(r)||r!==this._$AH[l]),r===R?t=R:t!==R&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}o&&!s&&this.j(t)}j(t){t===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class z extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===R?void 0:t}}const V=b?b.emptyScript:"";class W extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==R?this.element.setAttribute(this.name,V):this.element.removeAttribute(this.name)}}class G extends q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:R)===N)return;const s=this._$AH,n=t===R&&s!==R||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==R&&(s===R||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class J{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const Y=y.litHtmlPolyfillSupport;var Q,Z;null==Y||Y(j,D),(null!==(v=y.litHtmlVersions)&&void 0!==v?v:y.litHtmlVersions=[]).push("2.6.1");class X extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let l=o._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=l=new D(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return N}}X.finalized=!0,X._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:X});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:X}),(null!==(Z=globalThis.litElementVersions)&&void 0!==Z?Z:globalThis.litElementVersions=[]).push("3.2.2");const et={"Meter (m)":{unit:"Meter",symbol:"m"},"Centimeter (cm)":{unit:"Centimeter",symbol:"cm"},"Kilometer (km)":{unit:"Kilometer",symbol:"km"},"Inch (in)":{unit:"Inch",symbol:"in"},"Foot (ft)":{unit:"Foot",symbol:"ft"},"Mile (mi)":{unit:"Mile",symbol:"mi"},"Kilogram (kg)":{unit:"Kilogram",symbol:"kg"},"Gram (g)":{unit:"Gram",symbol:"g"},"Pound (lb)":{unit:"Pound",symbol:"lb"},"Ounce (oz)":{unit:"Ounce",symbol:"oz"},"Second (s)":{unit:"Second",symbol:"s"},"Minute (min)":{unit:"Minute",symbol:"min"},"Hour (hr)":{unit:"Hour",symbol:"hr"},"Day (day)":{unit:"Day",symbol:"day"},"Liter (L)":{unit:"Liter",symbol:"L"},"Milliliter (mL)":{unit:"Milliliter",symbol:"mL"},"Cubic Meter (m³)":{unit:"Cubic Meter",symbol:"m³"},"Cubic Centimeter (cm³)":{unit:"Cubic Centimeter",symbol:"cm³"},"Cubic Inch (in³)":{unit:"Cubic Inch",symbol:"in³"},"Cubic Foot (ft³)":{unit:"Cubic Foot",symbol:"ft³"},"Cubic Yard (yd³)":{unit:"Cubic Yard",symbol:"yd³"},"Fluid Ounce (fl oz)":{unit:"Fluid Ounce",symbol:"fl oz"},"Pint (pt)":{unit:"Pint",symbol:"pt"},"Quart (qt)":{unit:"Quart",symbol:"qt"},"Gallon (gal)":{unit:"Gallon",symbol:"gal"},"Celsius (°C)":{unit:"Celsius",symbol:"°C"},"Fahrenheit (°F)":{unit:"Fahrenheit",symbol:"°F"},"Kelvin (K)":{unit:"Kelvin",symbol:"K"},"Square Meter (m²)":{unit:"Square Meter",symbol:"m²"},"Square Kilometer (km²)":{unit:"Square Kilometer",symbol:"km²"},"Square Centimeter (cm²)":{unit:"Square Centimeter",symbol:"cm²"},"Square Inch (in²)":{unit:"Square Inch",symbol:"in²"},"Square Foot (ft²)":{unit:"Square Foot",symbol:"ft²"},"Square Yard (yd²)":{unit:"Square Yard",symbol:"yd²"},"Acre (ac)":{unit:"Acre",symbol:"ac"},"Hectare (ha)":{unit:"Hectare",symbol:"ha"},"Metric Ton (t)":{unit:"Metric Ton",symbol:"t"},"Short Ton (US ton)":{unit:"Short Ton",symbol:"US ton"},"Long Ton (Imperial ton)":{unit:"Long Ton",symbol:"Imperial ton"},"Astronomical Unit (AU)":{unit:"Astronomical Unit",symbol:"AU"},"Bit (b)":{unit:"Bit",symbol:"b"},"Byte (B)":{unit:"Byte",symbol:"B"},"Kilobyte (KB)":{unit:"Kilobyte",symbol:"KB"},"Megabyte (MB)":{unit:"Megabyte",symbol:"MB"},"Gigabyte (GB)":{unit:"Gigabyte",symbol:"GB"},"Terabyte (TB)":{unit:"Terabyte",symbol:"TB"},"Joule (J)":{unit:"Joule",symbol:"J"},"Calorie (cal)":{unit:"Calorie",symbol:"cal"},"Kilowatt-hour (kWh)":{unit:"Kilowatt-hour",symbol:"kWh"},"Watt (W)":{unit:"Watt",symbol:"W"},"Kilowatt (kW)":{unit:"Kilowatt",symbol:"kW"},"Horsepower (hp)":{unit:"Horsepower",symbol:"hp"},"Pascal (Pa)":{unit:"Pascal",symbol:"Pa"},"Bar (bar)":{unit:"Bar",symbol:"bar"},"Atmosphere (atm)":{unit:"Atmosphere",symbol:"atm"},"Ampere (A)":{unit:"Ampere",symbol:"A"},"Volt (V)":{unit:"Volt",symbol:"V"},"Ohm (Ω)":{unit:"Ohm",symbol:"Ω"},"Electronvolt (eV)":{unit:"Electronvolt",symbol:"eV"},"British Thermal Unit (BTU)":{unit:"British Thermal Unit",symbol:"BTU"},unit:{unit:"unit",symbol:"unit"}};customElements.define("neo-unit",class extends X{static getMetaConfig(){return{controlName:"neo-unit",fallbackDisableSubmit:!1,description:"Control for displaying units of measurement",iconUrl:"https://jsdenintex.github.io/plugins/neo-unit/dist/unit-icon.svg",groupName:"Custom controls",version:"1.0",properties:{unittype:{title:"Select unit of measurement",type:"string",enum:Object.keys(et).filter((t=>"unit"!==t)).map((t=>`${t}`)),verticalLayout:!0,defaultValue:"Meter (m)"},unitvalue:{type:"number",title:"Unit value",description:"Decimal unit value",staticProperties:!0},decimalplaces:{type:"integer",title:"Decimal places",description:"Enter 0 for none, 1 for .0, 2 for .01 etc.",defaultValue:0},boolRound:{type:"boolean",title:"Enable rounding",description:"Allow values to be rounded. e.g. for 2 decimal places 12.129 becomes 12.13",defaultValue:!1},boolFixed:{type:"boolean",title:"Ensure fixed value",description:"Ensure fixed values are output, with this enabled 10.10 will output as 10.10 instead of 10.1",defaultValue:!1},outputobj:{type:"object",title:"Unit Output",description:"This is for output only please ignore.",isValueField:!0,properties:{unittype:{title:"Unit of measurement",type:"string"},unitvalue:{type:"number",title:"Unit value",description:"Decimal unit value"},decimalplaces:{type:"integer",title:"Decimal places",description:"Enter 0 for none, 1 for .0, 2 for .01 etc."},boolRound:{type:"boolean",title:"Enable rounding",description:"Allow values to be rounded. e.g. for 2 decimal places 12.129 becomes 12.13"},boolFixed:{type:"boolean",title:"Ensure fixed value",description:"Ensure fixed values are output, with this enabled 10.10 will output as 10.10 instead of 10.1"}}}},standardProperties:{fieldLabel:!0,description:!0,readOnly:!0},events:["ntx-value-change"]}}static get properties(){return{unittype:{type:String},unitvalue:{type:Number},decimalplaces:{type:Number},boolRound:{type:Boolean},boolFixed:{type:Boolean},outputobj:{type:Object},readOnly:{type:Boolean}}}constructor(){super(),this.unittype="unit",this.unitvalue=0,this.decimalplaces=0,this.boolRound=!1,this.boolFixed=!1,this.outputobj={},this.readOnly=!1}updated(t){(t.has("unittype")||t.has("decimalplaces")||t.has("boolRound")||t.has("boolFixed"))&&this.onChange()}handleBlur(){const t=this.shadowRoot.querySelector("input");let e=parseFloat(t.value);isNaN(e)?(t.value="",this.unitvalue=0):(this.boolRound&&(e=parseFloat(e.toFixed(this.decimalplaces))),this.boolFixed?t.value=e.toFixed(this.decimalplaces):t.value=e.toString(),this.unitvalue=e),this.onChange()}onChange(){const t={unittype:this.unittype,unitvalue:this.unitvalue,decimalplaces:this.decimalplaces,boolRound:this.boolRound,boolFixed:this.boolFixed},e=new CustomEvent("ntx-value-change",{bubbles:!0,cancelable:!1,composed:!0,detail:t});this.dispatchEvent(e)}render(){const t=this.decimalplaces>=0?this.decimalplaces:0,e=(0).toFixed(t),i=0!==this.unitvalue?this.unitvalue.toString():"";return B`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="neo-unit-control">
        <div class="input-group">
          <span class="input-group-text">${et[this.unittype].symbol}</span>
          <input type="text" class="form-control text-end"
            .value=${i}
            placeholder=${e}
            @blur=${this.handleBlur.bind(this)}
            ?disabled="${this.readOnly}"
            >
        </div>
      </div>
    `}})})();