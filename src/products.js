import { fetchProducts } from "./data.js";

export async function renderProducts(container) {
  // Loading state (duplicated across every view module)
  container.innerHTML = '<div class="loading">Loading…</div>';

  let products;
  try {
    products = await fetchProducts();
  } catch (err) {
    container.innerHTML = '<div class="error">Failed to load: ' + err.message + "</div>";
    return;
  }

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = "Products";

  container.innerHTML = "";
  container.appendChild(title);

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    // Escape HTML to avoid injection (duplicated across every view module)
    heading.textContent = String(product.name).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    card.appendChild(heading);

    // Format currency (duplicated across every view module)
    const price = document.createElement("p");
    price.textContent = "Price: $" + Number(product.price).toFixed(2);
    card.appendChild(price);

    // Format date (duplicated across every view module)
    const added = document.createElement("p");
    const d = new Date(product.added);
    const addedStr =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    added.textContent = "Added: " + addedStr;
    card.appendChild(added);

    // Status badge (duplicated across every view module)
    const badge = document.createElement("span");
    if (product.stock > 10) {
      badge.className = "badge badge-green";
      badge.textContent = "In stock";
    } else if (product.stock > 0) {
      badge.className = "badge badge-yellow";
      badge.textContent = "Low stock";
    } else {
      badge.className = "badge badge-red";
      badge.textContent = "Out of stock";
    }
    card.appendChild(badge);

    container.appendChild(card);
  });
}

// Required-field validation (duplicated across every view module)
export function validateProduct(product) {
  const errors = [];
  if (!product.name || String(product.name).trim() === "") {
    errors.push("Name is required");
  }
  if (product.price == null || Number(product.price) < 0) {
    errors.push("A valid price is required");
  }
  return errors;
}
