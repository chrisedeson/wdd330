// loading.js
let loadingElement = null;

export function showLoading() {
  if (!loadingElement) {
    loadingElement = document.createElement('div');
    loadingElement.className = 'loading-spinner';
    loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #558386;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(loadingElement);
}

export function hideLoading() {
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }
}