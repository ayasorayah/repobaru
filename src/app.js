import { renderUsers } from "./users.js";
import { renderTasks } from "./tasks.js";
import { renderProducts } from "./products.js";

const VIEWS = {
  users: { el: document.getElementById("users-view"), render: renderUsers, loaded: false },
  tasks: { el: document.getElementById("tasks-view"), render: renderTasks, loaded: false },
  products: { el: document.getElementById("products-view"), render: renderProducts, loaded: false },
};

function showView(name) {
  Object.keys(VIEWS).forEach((key) => {
    VIEWS[key].el.classList.toggle("hidden", key !== name);
  });

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === name);
  });

  const view = VIEWS[name];
  if (view && !view.loaded) {
    view.loaded = true;
    view.render(view.el);
  }
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});

showView("users");
