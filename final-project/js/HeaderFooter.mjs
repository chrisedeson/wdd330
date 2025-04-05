async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch template from ${path}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Error loading template from ${path}:`, error);
    throw error;
  }
}

// Function to load and render the header and footer templates
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("../pages/partials/header.html");
    const footerTemplate = await loadTemplate("../pages/partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) {
      headerElement.innerHTML = headerTemplate;
    } else {
      console.debug('Header element not found. The header might not be required on this page.');
    }

    if (footerElement) {
      footerElement.innerHTML = footerTemplate;
    } else {
      console.debug('Footer element not found. The footer might not be required on this page.');
    }
  } catch (error) {
    console.error("Error loading header or footer:", error);
  }
}

// Function to manage the visibility of the bottom navigation based on scroll position
export function setupBottomNavVisibility() {
  let lastScrollY = window.scrollY;
  const bottomNav = document.getElementById('bottomNav');

  if (!bottomNav) {
    console.debug('Bottom navigation element not found. Skipping bottom nav visibility setup.');
    return;
  }

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Ignore very small scroll differences (e.g., less than 5px)
    if (Math.abs(currentScrollY - lastScrollY) < 5) {
      return;
    }

    // If scrolling down, hide the nav; if scrolling up, show the nav
    if (currentScrollY > lastScrollY) {
      bottomNav.classList.remove('show');
    } else {
      bottomNav.classList.add('show');
    }

    lastScrollY = currentScrollY;
  });
}

// Initialize everything by calling the necessary functions after the DOM content is loaded
document.addEventListener('DOMContentLoaded', async function() {
  // Ensure header and footer are loaded first
  await loadHeaderFooter();
  
  // Then initialize the bottom navigation visibility
  setupBottomNavVisibility();
});
