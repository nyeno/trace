export function getAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "The user account has been disabled.";
    case "auth/user-not-found":
      return "There is no user corresponding to the email address provided.";
    case "auth/wrong-password":
      return "The password is invalid.";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";
    case "auth/auth-domain-config-required":
      return "The domain specified in the Firebase project's authentication configuration is not authorized to use Firebase Authentication.";
    case "auth/cancelled-popup-request":
      return "This operation has been cancelled due to another conflicting popup being opened.";
    case "auth/popup-blocked":
      return "This operation has been blocked by the browser.";
    case "auth/popup-closed-by-user":
      return "The popup window was closed by the user before finalizing the operation.";
    case "auth/unauthorized-domain":
      return "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.";
    case "auth/user-mismatch":
      return "The supplied credentials do not correspond to the previously signed in user.";
    case "auth/credential-already-in-use":
      return "This credential is already associated with a different user account.";
    case "auth/operation-not-supported-in-this-environment":
      return "This operation is not supported in the environment in which it is being called. Make sure it is supported in SDK version >= 'v4.8.0' and enabled in the Firebase Console.";
    case "auth/time-out":
      return "The operation timed out.";
    case "auth/network-request-failed":
      return "A network error occurred. Please try again later.";
    default:
      return "An error occurred. Please try again later.";
  }
}

