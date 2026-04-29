// ─── DOM references ─────────────────────────────────────
if (typeof document === 'undefined') {
  throw new Error('This script must run in a browser with DOM access');
}

const loader = document.getElementById('loader');
const errorBox = document.getElementById('error');
const userList = document.getElementById('user-list');

if (!loader || !errorBox || !userList) {
  throw new Error('Missing required DOM elements: loader, error, or user-list');
}

// ─── Helper: show/hide states ────────────────────────────
function showLoading() {
  loader.hidden   = false;
  errorBox.hidden = true;
  userList.innerHTML = '';
}

function showError(message) {
  loader.hidden   = true;
  errorBox.hidden = false;
  errorBox.textContent = `Error: ${message}`;  // ← textContent, NOT innerHTML (XSS!)
}

function showUsers(users) {
  loader.hidden = true;
  users.forEach(user => {
    const li = document.createElement('li');   // ← never use innerHTML with data
    li.textContent = `${user.name} — ${user.email}`;
    userList.appendChild(li);
  });
}

// ─── Main fetch function ─────────────────────────────────
async function fetchUsers() {
  showLoading();

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // ← Senior move: check HTTP status explicitly
    if (!response.ok) {
      throw new Error(`HTTP error — status: ${response.status}`);
    }

    const users = await response.json();
    showUsers(users);

  } catch (error) {
    // catches both network errors AND our manual throw above
    showError(error.message);
  }
}

// ─── Run on page load ────────────────────────────────────
fetchUsers();
