import * as VERIFICATION_STATUS from '../constants/verificationStatus';
import domain from '../domain';
import sanitize from '../../sanitizer/sanitizer';

export function getCertificateDefinition (state) {
  return state.certificateDefinition;
}

export function getIssuedOn (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuedOn;
  }

  return '';
}

export function getIssueDate (state) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    const objDate = new Date(getIssuedOn(state));
    return months[objDate.getMonth()] + ' ' + objDate.getDate() + ', ' + objDate.getFullYear();
  }

  return '';
}

export function getRecipientName (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.recipientProfile.name;
  }

  return '';
}

export function getCertificateTitle (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.badge.name;
  }

  return '';
}

export function getIssuerName (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.badge.issuer.name;
  }

  return '';
}

export function getIssuerLogo (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.badge.issuer.image;
  }

  return '';
}

export function getDisplayHTML (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return sanitize(certificateDefinition.displayHtml);
  }

  return '';
}

export function getRecordLink (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.id;
  }

  return '';
}

export function getDownloadLink (state) {
  const url = getRecordLink(state);

  if (url) {
    return domain.certificates.download(url);
  }

  return '';
}

export function getMetadataJson (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return JSON.parse(certificateDefinition.metadataJson);
  }

  return null;
}

export function getTransactionLink (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.transactionLink;
  }

  return '';
}

export function getTransactionId (state) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.transactionId;
  }

  return '';
}

export function getChain (state, toReadable = true) {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    const { chain } = certificateDefinition;
    return toReadable ? chain.name : chain.code;
  }

  return '';
}

export function getVerifiedSteps (state) {
  return state.verifiedSteps || [];
}

export function getParentStep (state, parentStepCode) {
  return getVerifiedSteps(state).find(step => step.code === parentStepCode);
}

export function getStartedVerificationSteps (state) {
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUS.DEFAULT);
}
