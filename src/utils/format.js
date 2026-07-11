// Shared formatting helpers used across all view modules.

export function formatCurrency(value) {
  return "$" + Number(value).toFixed(2);
}

export function formatDate(value) {
  const d = new Date(value);
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
