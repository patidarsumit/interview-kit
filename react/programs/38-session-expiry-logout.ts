export function handleSessionExpired() {
  localStorage.removeItem('access_token');
  sessionStorage.clear();
  window.location.assign('/login?expired=true');
}

