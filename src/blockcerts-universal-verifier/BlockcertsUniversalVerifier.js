import { html, LitElement } from '@polymer/lit-element';
import CertificateInput from '../components/organisms/CertificateInput';
import '../components/organisms/ActionMenu';
import '../components/organisms/VerificationProcess';
import ErrorMessage from '../components/atoms/ErrorMessage/';
import CSS from '../components/atoms/GlobalStylesheet';
import '../components/atoms/CardCertificate';
import '../components/atoms/FullCertificate';
import '../components/atoms/DragAndDrop';
import '../components/atoms/FileUpload';
import { APICamelCase } from '../models/API';
import * as DISPLAY_MODE from '../constants/displayMode';

class BlockcertsUniversalVerifier extends LitElement {
  static get properties () {
    return {
      onLoad: Function,
      errorMessage: String,
      ...APICamelCase
    };
  }

  _firstRendered () {
    this.onLoad(this._props);
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render (_props) {
    return html`
      ${CSS}
      <section class='buv-c-verifier-main'>
        <h1>Blockcerts Universal Verifier</h1>
        ${ErrorMessage(_props.errorMessage)}
        <buv-drag-and-drop>
            ${CertificateInput}
        </buv-drag-and-drop>
        <buv-file-upload></buv-file-upload>
        <buv-action-menu></buv-action-menu>
        ${_props.displayMode === DISPLAY_MODE.FULL
    ? html`<buv-full-certificate></buv-full-certificate>`
    : html`<buv-card-certificate></buv-card-certificate>`
}
        <buv-verification-process></buv-verification-process>
      </section>
    `;
  }
}

window.customElements.define('buv-raw', BlockcertsUniversalVerifier);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props) {
  return html`<buv-raw
          src='${props.src}'
          onLoad='${props.onLoad}'
          errorMessage='${props.errorMessage}'
          disableAutoVerify='${props['disable-auto-verify']}'
          disableVerify='${props['disable-verify']}'
          allowDownload='${props['allow-download']}'
          allowSocialShare='${props['allow-social-share']}'
          displayMode='${props['display-mode']}'
          showMetadata='${props['show-metadata']}'
        ></buv-raw>`;
}

export {
  BlockcertsUniversalVerifier as SourceComponent,
  BUVWrapper as BlockcertsUniversalVerifier
};