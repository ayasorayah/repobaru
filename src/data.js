// Simulated backend. Each getter returns a Promise to mimic a network call.

const USERS = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", active: true, joined: "2023-01-15", balance: 1240.5 },
  { id: 2, name: "Alan Turing", email: "alan@example.com", active: false, joined: "2022-11-03", balance: 87.25 },
  { id: 3, name: "Grace Hopper", email: "grace@example.com", active: true, joined: "2024-06-21", balance: 0 },
];

const TASKS = [
  { id: 1, title: "Write report", status: "done", due: "2024-07-01", cost: 300 },
  { id: 2, title: "Review PR", status: "in_progress", due: "2024-07-20", cost: 150.75 },
  { id: 3, title: "Deploy release", status: "todo", due: "2024-08-05", cost: 0 },
];

const PRODUCTS = [
  { id: 1, name: "Keyboard", stock: 42, added: "2024-02-10", price: 79.99 },
  { id: 2, name: "Monitor", stock: 0, added: "2024-03-22", price: 249.0 },
  { id: 3, name: "Mouse", stock: 8, added: "2024-05-14", price: 19.5 },
];

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), 250));
}

export function fetchUsers() {
  return delay(USERS);
}

export function fetchTasks() {
  return delay(TASKS);
}

export function fetchProducts() {
  return delay(PRODUCTS);
}
