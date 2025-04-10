export const USER_KEY = 'skimmerUser';

export function getUser() {
  return localStorage.getItem(USER_KEY) || 'Guest';
}

export function isLoggedIn() {
  return localStorage.getItem(USER_KEY) !== null;
}

export function login(username) {
  localStorage.setItem(USER_KEY, username);
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export function authGuard() {
  if (!isLoggedIn() && !window.location.pathname.endsWith('login.html')) {
    let redirectTimer = 10;
    
    const countdown = setInterval(() => {
      if (redirectTimer <= 0) {
        clearInterval(countdown);
        // Use absolute path
        window.location.href = '/pages/login.html';
      }
      redirectTimer--;
    }, 500);

    window.addEventListener('beforeunload', () => clearInterval(countdown));
  }
}