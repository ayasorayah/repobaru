import { fetchTasks } from "./data.js";
import { formatCurrency, formatDate } from "./utils/format.js";
import { showLoading, showError, el, renderCardList, badge } from "./utils/dom.js";
import { required, collectErrors } from "./utils/validate.js";

const TASK_STATUS = {
  done: { color: "green", label: "Done" },
  in_progress: { color: "yellow", label: "In progress" },
  todo: { color: "gray", label: "To do" },
};

function taskCard(task) {
  const card = el("div", { className: "card" });
  card.appendChild(el("h3", { html: task.title }));
  card.appendChild(el("p", { text: "Cost: " + formatCurrency(task.cost) }));
  card.appendChild(el("p", { text: "Due: " + formatDate(task.due) }));
  card.appendChild(badge(TASK_STATUS[task.status] || TASK_STATUS.todo));
  return card;
}

export async function renderTasks(container) {
  showLoading(container);
  try {
    const tasks = await fetchTasks();
    renderCardList(container, "Tasks", tasks, taskCard);
  } catch (err) {
    showError(container, err.message);
  }
}

export function validateTask(task) {
  return collectErrors([
    [required(task.title), "Title is required"],
    [required(task.due), "Due date is required"],
  ]);
}
