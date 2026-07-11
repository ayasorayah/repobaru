import { fetchUsers } from "./data.js";

export async function renderUsers(container) {
  // Loading state (duplicated across every view module)
  container.innerHTML = '<div class="loading">Loading…</div>';

  let users;
  try {
    users = await fetchUsers();
  } catch (err) {
    container.innerHTML = '<div class="error">Failed to load: ' + err.message + "</div>";
    return;
  }

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = "Users";

  container.innerHTML = "";
  container.appendChild(title);

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    // Escape HTML to avoid injection (duplicated across every view module)
    heading.textContent = String(user.name).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    card.appendChild(heading);

    const email = document.createElement("p");
    email.textContent = user.email;
    card.appendChild(email);

    // Format currency (duplicated across every view module)
    const balance = document.createElement("p");
    balance.textContent = "Balance: $" + Number(user.balance).toFixed(2);
    card.appendChild(balance);

    // Format date (duplicated across every view module)
    const joined = document.createElement("p");
    const d = new Date(user.joined);
    const joinedStr =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    joined.textContent = "Joined: " + joinedStr;
    card.appendChild(joined);

    // Status badge (duplicated across every view module)
    const badge = document.createElement("span");
    if (user.active) {
      badge.className = "badge badge-green";
      badge.textContent = "Active";
    } else {
      badge.className = "badge badge-gray";
      badge.textContent = "Inactive";
    }
    card.appendChild(badge);

    container.appendChild(card);
  });
}

// Email validation (duplicated across every view module)
export function validateUser(user) {
  const errors = [];
  if (!user.name || String(user.name).trim() === "") {
    errors.push("Name is required");
  }
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push("A valid email is required");
  }
  return errors;
}
