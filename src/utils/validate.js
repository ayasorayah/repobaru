// Shared validation helpers used across all view modules.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function required(value) {
  return value != null && String(value).trim() !== "";
}

export function isEmail(value) {
  return typeof value === "string" && EMAIL_RE.test(value);
}

// Runs a list of [ok, message] rules and collects the failing messages.
export function collectErrors(rules) {
  return rules.filter(([ok]) => !ok).map(([, message]) => message);
}
