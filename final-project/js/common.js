// common.js

import { loadHeaderFooter, setupBottomNavVisibility } from "./HeaderFooter.mjs";
import { updateActiveNav } from "./utils.mjs";

export async function initCommon() {
  await loadHeaderFooter();
  // Wait for dynamic content, then update the active nav
  updateActiveNav();
  setupBottomNavVisibility();
}
