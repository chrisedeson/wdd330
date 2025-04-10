import { login, authGuard } from "./auth.mjs";

// Cache DOM elements properly
const loginBtn = document.getElementById("loginBtn");
const firstNameInput = document.getElementById("firstName"); // Get input directly
const errorMessage = document.querySelector(".login-error-message");

let inputVisible = false;

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputVisible) {
    // Show input container
    firstNameInput.classList.add("visible");
    errorMessage.textContent = "";
    inputVisible = true;
    loginBtn.textContent = "Submit";
    firstNameInput.focus(); // Use cached reference
  } else {
    // Handle submission
    const firstName = firstNameInput.value.trim();

    if (firstName) {
      login(firstName);
      const returnUrl = sessionStorage.getItem("returnUrl") || "/index.html";
      window.location.href = returnUrl;
    } else {
      errorMessage.textContent = "Please enter your first name";
      firstNameInput.focus();
    }
  }
});

// Store return URL
if (!window.location.pathname.includes("login.html")) {
  sessionStorage.setItem("returnUrl", window.location.href);
}
