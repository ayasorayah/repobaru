import { fetchUsers } from "./data.js";
import { formatCurrency, formatDate } from "./utils/format.js";
import { showLoading, showError, el, renderCardList, badge } from "./utils/dom.js";
import { required, isEmail, collectErrors } from "./utils/validate.js";

function statusFor(user) {
  return user.active ? { color: "green", label: "Active" } : { color: "gray", label: "Inactive" };
}

function userCard(user) {
  const card = el("div", { className: "card" });
  card.appendChild(el("h3", { html: user.name }));
  card.appendChild(el("p", { text: user.email }));
  card.appendChild(el("p", { text: "Balance: " + formatCurrency(user.balance) }));
  card.appendChild(el("p", { text: "Joined: " + formatDate(user.joined) }));
  card.appendChild(badge(statusFor(user)));
  return card;
}

export async function renderUsers(container) {
  showLoading(container);
  try {
    const users = await fetchUsers();
    renderCardList(container, "Users", users, userCard);
  } catch (err) {
    showError(container, err.message);
  }
}

export function validateUser(user) {
  return collectErrors([
    [required(user.name), "Name is required"],
    [isEmail(user.email), "A valid email is required"],
  ]);
}
