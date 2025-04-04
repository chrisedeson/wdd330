export function displayGreeting() {
    const greeting = document.getElementById("greeting");
    const user = document.getElementById("user");

        // Get the current hour (0-23)
        const currentHour = new Date().getHours();

        // Determine the time of day and icon to use
        let greetingMessage = "";
        let icon = "";

        if (currentHour >= 6 && currentHour < 12) {
            // Morning (6 AM to 12 PM)
            greetingMessage = "Good Morning";
            icon = '<i class="fas fa-sun"></i>';
        } else if (currentHour >= 12 && currentHour < 18) {
            // Afternoon (12 PM to 6 PM)
            greetingMessage = "Good Afternoon";
            icon = '<i class="fas fa-sun"></i>';
        } else {
            // Evening/Night (6 PM to 6 AM)
            greetingMessage = "Good Evening";
            icon = '<i class="fas fa-moon"></i>';
        }

        // Assuming you want to insert a user's name (e.g., "User")
        user.textContent = "Christopher"

        // Set the text content with the icon and greeting
        greeting.innerHTML = `${icon} ${greetingMessage}!`;
}