import { fetchTasks } from "./data.js";

export async function renderTasks(container) {
  // Loading state (duplicated across every view module)
  container.innerHTML = '<div class="loading">Loading…</div>';

  let tasks;
  try {
    tasks = await fetchTasks();
  } catch (err) {
    container.innerHTML = '<div class="error">Failed to load: ' + err.message + "</div>";
    return;
  }

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = "Tasks";

  container.innerHTML = "";
  container.appendChild(title);

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "card";

    const heading = document.createElement("h3");
    // Escape HTML to avoid injection (duplicated across every view module)
    heading.textContent = String(task.title).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    card.appendChild(heading);

    // Format currency (duplicated across every view module)
    const cost = document.createElement("p");
    cost.textContent = "Cost: $" + Number(task.cost).toFixed(2);
    card.appendChild(cost);

    // Format date (duplicated across every view module)
    const due = document.createElement("p");
    const d = new Date(task.due);
    const dueStr =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    due.textContent = "Due: " + dueStr;
    card.appendChild(due);

    // Status badge (duplicated across every view module)
    const badge = document.createElement("span");
    if (task.status === "done") {
      badge.className = "badge badge-green";
      badge.textContent = "Done";
    } else if (task.status === "in_progress") {
      badge.className = "badge badge-yellow";
      badge.textContent = "In progress";
    } else {
      badge.className = "badge badge-gray";
      badge.textContent = "To do";
    }
    card.appendChild(badge);

    container.appendChild(card);
  });
}

// Required-field validation (duplicated across every view module)
export function validateTask(task) {
  const errors = [];
  if (!task.title || String(task.title).trim() === "") {
    errors.push("Title is required");
  }
  if (!task.due || String(task.due).trim() === "") {
    errors.push("Due date is required");
  }
  return errors;
}
