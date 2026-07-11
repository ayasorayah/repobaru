// Shared DOM helpers used across all view modules.

import { escapeHtml } from "./format.js";

export function showLoading(container) {
  container.innerHTML = '<div class="loading">Loading…</div>';
}

export function showError(container, message) {
  container.innerHTML = '<div class="error">Failed to load: ' + escapeHtml(message) + "</div>";
}

export function el(tag, options = {}) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text != null) node.textContent = options.text;
  if (options.html != null) node.innerHTML = escapeHtml(options.html);
  return node;
}

// Renders a titled section of cards. `mapCard` maps an item to an HTMLElement.
export function renderCardList(container, title, items, mapCard) {
  container.innerHTML = "";
  container.appendChild(el("h2", { className: "section-title", text: title }));
  items.forEach((item) => container.appendChild(mapCard(item)));
}

// Creates a status badge from a { color, label } descriptor.
export function badge(status) {
  return el("span", { className: "badge badge-" + status.color, text: status.label });
}
