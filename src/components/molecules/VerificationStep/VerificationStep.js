import { html } from '@polymer/lit-element';
import ErrorMessage from '../../atoms/ErrorMessage';

export default function VerificationStep ({ name, code, status, errorMessage }, parent, isFirst) {
  // TODO: better handle this dynamic class (cf npm classnames)

  let parentStepClasses = [
    'buv-c-verification-step',
    isFirst ? 'is-first' : '',
    `is-${status}`
  ].join(' ');

  let innerHTML;
  if (parent) {
    innerHTML = html`<dt class$='${parentStepClasses}'>${name}: ${status}</dt>`;
  } else {
    innerHTML = html`<dd class='buv-c-verification-step  buv-c-verification-substep'>
      ${name}: ${status}
      ${ErrorMessage(errorMessage)}
    </dd>`;
  }
  return html`${innerHTML}`;
}
