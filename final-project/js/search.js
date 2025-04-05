import { initCommon } from "../js/common.js";

// ! Make sure this is function is called in all the remaining JS files of the remaining pages, notificaiton... bla bla, if needed
document.addEventListener("DOMContentLoaded", async () => {
  await initCommon();
  // Page-specific code here
});