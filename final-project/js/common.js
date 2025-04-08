import { loadHeaderFooter, setupBottomNavVisibility } from './HeaderFooter.mjs';
import { updateActiveNav } from "./utils.mjs";
import { authGuard } from "./auth.mjs";

export const initCommon = async () => {
  await loadHeaderFooter();
  setupBottomNavVisibility();
  updateActiveNav();
  authGuard();

  // When storing return URL
sessionStorage.setItem('returnUrl', window.location.pathname);
};