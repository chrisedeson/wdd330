// Utility function to load templates
const loadTemplate = async (path) => {
  try {
    const response = await fetch(new URL(path, window.location.href));
    return await response.text();
  } catch (error) {
    console.error(`Template load error (${path}):`, error);
    return '<div class="template-error">Template failed to load</div>';
  }
};

export const loadHeaderFooter = async () => {
  try {
    const [headerHTML, footerHTML] = await Promise.all([
      loadTemplate("/pages/partials/header.html"),  // Add leading slash
      loadTemplate("/pages/partials/footer.html")   // Add leading slash
    ]);

    // Add existence checks
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    
    if (headerElement) headerElement.innerHTML = headerHTML;
    if (footerElement) footerElement.innerHTML = footerHTML;

  } catch (error) {
    console.error("Header/Footer load failed:", error);
  }
};
// Bottom nav visibility controller
export const setupBottomNavVisibility = () => {
  const bottomNav = document.getElementById('bottomNav');
  if (!bottomNav) return;

  let lastScroll = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (Math.abs(currentScroll - lastScroll) < 5) return;
    
    bottomNav.classList.toggle('show', currentScroll < lastScroll);
    lastScroll = currentScroll;
  });
};