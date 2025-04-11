# [Click here to visit Skimmer!](https://skimmer-chef.netlify.app/)

# Skimmer: A fast, responsive recipe-skimming app.

![PollyGlot Screenshot](images/skimmer-screenshot.jpg)

---

## 🛠 Installation & Usage

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/chrisedeson/wdd330.git
cd wdd330/final-project
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run in development
```bash
npm run dev
```

---

## Features

- **Search Recipes**: Quickly find recipes by keyword.
- **Recipe Details Modal**: Randomly generate a recipe open a full-screen dialog with ingredients & instructions.
- **Favorites**: Mark Recipes you love and view them in your profile.
- **User Authentication**: Simple login flow to save preferences and favorites.
- **Notifications**: Clear and manage recipe reminders or alerts.
- **Responsive Design**: 
    - **Mobile**: Bottom navigation
    - **Desktop**: Top header navigation and wider layouts

---

## Project Structure

```
final-project/
├── index.html            # Main HTML entry point; loads CSS & JS modules
├── package.json          # NPM metadata, dependencies & custom scripts
├── package-lock.json     # Exact dependency tree lockfile
├── vite.config.js        # Vite bundler configuration (aliases, plugins, etc.)
├── .env                  # Environment variables file (should be gitignored!)
├── images/               # Static image assets (backgrounds, icons, favicons…)
│   ├── favicon/          # Favicons & site manifest icons
│   ├── hero/             # Hero section background images
│   ├── icons/            # UI icons & placeholders
│   ├── bg-1.png          # Example background image
│   ├── bg-2.jpg          # …
│   ├── bg-nature.jpg     # …
│   ├── fall-back-image.png
│   ├── no-favorite.gif
│   └── signature.png
├── js/                   # All JS modules & page scripts
│   ├── DynamicCardList.mjs   # Renders horizontal card lists
│   ├── FeaturedRecipe.mjs    # Featured recipe component logic
│   ├── FetchRecipes.mjs      # API calls to fetch recipe data
│   ├── Greeting.mjs          # User greeting module
│   ├── HeaderFooter.mjs      # Inserts header & footer markup
│   ├── RecipeDialog.mjs      # Controls recipe detail modal
│   ├── auth.mjs              # Authentication helpers
│   ├── common.js             # Shared utilities & polyfills
│   ├── home.js               # Homepage initialization
│   ├── loading.js            # Loading spinner logic
│   ├── login.js              # Login page behavior
│   ├── notificationPage.js   # Notifications page logic
│   ├── profilePage.js        # Profile page logic
│   ├── renderers.mjs         # Generic render helper functions
│   ├── search.js             # Search page interactions
│   └── utils.mjs             # Miscellaneous utility functions
├── pages/                # Static HTML pages for routing
│   ├── partials/         # Reusable HTML snippets (header, footer)
│   ├── login.html        # Login screen
│   ├── notification.html # Notifications view
│   ├── profile.html      # User profile page
│   └── search.html       # Recipe search results
└── styles/               # All CSS stylesheets
    ├── common.css        # Global resets & shared utilities
    ├── index.css         # Homepage-specific styles
    ├── recipe-dialog.css # Modal/dialog styling
    ├── login.css         # Login page styles
    ├── notification.css  # Notifications page styles
    ├── profile.css       # Profile page styles
    └── search.css        # Search page styles```
```
---

## 🤝 Contributing
Feel free to fork this repository and submit pull requests. Contributions are welcome! 🚀
