const GA_ID = 'G-N1GBY1QN04';

// 1) load the gtag.js library
const s = document.createElement('script');
s.async = true;
s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
document.head.appendChild(s);

// 2) set up dataLayer & gtag()
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
window.gtag = gtag;

// 3) initialize
gtag('js', new Date());
gtag('config', GA_ID, { page_path: window.location.pathname });
