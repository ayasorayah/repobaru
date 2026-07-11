import { fetchProducts } from "./data.js";
import { formatCurrency, formatDate } from "./utils/format.js";
import { showLoading, showError, el, renderCardList, badge } from "./utils/dom.js";
import { required, collectErrors } from "./utils/validate.js";

function statusFor(product) {
  if (product.stock > 10) return { color: "green", label: "In stock" };
  if (product.stock > 0) return { color: "yellow", label: "Low stock" };
  return { color: "red", label: "Out of stock" };
}

function productCard(product) {
  const card = el("div", { className: "card" });
  card.appendChild(el("h3", { html: product.name }));
  card.appendChild(el("p", { text: "Price: " + formatCurrency(product.price) }));
  card.appendChild(el("p", { text: "Added: " + formatDate(product.added) }));
  card.appendChild(badge(statusFor(product)));
  return card;
}

export async function renderProducts(container) {
  showLoading(container);
  try {
    const products = await fetchProducts();
    renderCardList(container, "Products", products, productCard);
  } catch (err) {
    showError(container, err.message);
  }
}

export function validateProduct(product) {
  return collectErrors([
    [required(product.name), "Name is required"],
    [product.price != null && Number(product.price) >= 0, "A valid price is required"],
  ]);
}
