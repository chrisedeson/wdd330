import { getUser } from "./auth.mjs";

export function displayGreeting() {
  const greeting = document.getElementById("greeting");
  const user = document.getElementById("user");

  if (!greeting || !user) return;

  const currentHour = new Date().getHours();
  let greetingMessage = "";
  let icon = "";

  if (currentHour >= 6 && currentHour < 12) {
    greetingMessage = "Good Morning";
    icon = '<i class="fas fa-sun"></i>';
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Good Afternoon";
    icon = '<i class="fas fa-sun"></i>';
  } else {
    greetingMessage = "Good Evening";
    icon = '<i class="fas fa-moon"></i>';
  }

  user.textContent = getUser();
  greeting.innerHTML = `${icon} ${greetingMessage}!`;
}
