import { getUser } from './auth.mjs'; // Add this at the top


export function displayGreeting() {
    const greeting = document.getElementById("greeting");
    user.textContent = getUser();

    if (!greeting || !user) return;

    const currentHour = new Date().getHours();
    let greetingMessage = "";
    let icon = "";

    // Fix the typo here: current.Hour → currentHour
    if (currentHour >= 6 && currentHour < 12) {
        greetingMessage = "Good Morning";
        icon = '<i class="fas fa-sun"></i>';
    } else if (currentHour >= 12 && currentHour < 18) { // Fixed line
        greetingMessage = "Good Afternoon";
        icon = '<i class="fas fa-sun"></i>';
    } else {
        greetingMessage = "Good Evening";
        icon = '<i class="fas fa-moon"></i>';
    }

    user.textContent = getUser(); // Use the auth function instead of hardcoded
    greeting.innerHTML = `${icon} ${greetingMessage}!`;
}