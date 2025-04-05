// utils.mjs
export function updateActiveNav() {
    // Get current path and normalize
    const currentPath = window.location.pathname
      .replace(/\/$/, "") // Remove trailing slash
      .replace(/\.html$/, ""); // Remove .html extension
  
    document.querySelectorAll('#bottomNav li').forEach(item => {
      const link = item.querySelector('a');
      const href = link.pathname
        .replace(/\/$/, "") // Remove trailing slash
        .replace(/\.html$/, ""); // Remove .html extension
  
      // Special case for home page
      const isHome = currentPath === "/index" || currentPath === "" || currentPath === "/";
      const isHomeLink = href === "/index" || href === "" || href === "/";
  
      if ((isHome && isHomeLink) || (!isHome && href === currentPath)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }