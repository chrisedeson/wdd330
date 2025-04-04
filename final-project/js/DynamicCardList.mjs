// File: js/scrollableCards.mjs
export async function createScrollableCards({ selector, fetcher, renderCard, infiniteScroll = false }) {
    const container = document.querySelector(selector);
    
    // Clear any existing content
    container.innerHTML = '';
  
    // Fetch data
    const data = await fetcher();
  
    // Render cards
    data.forEach(item => {
      const card = renderCard(item);
      container.appendChild(card);
    });
  
    // Optional: Infinite scroll behavior
    if (infiniteScroll) {
      const cards = container.querySelectorAll(':scope > *');
      cards.forEach(card => {
        let clone = card.cloneNode(true);
        container.appendChild(clone);
      });
  
      // Seamless scroll reset
      container.addEventListener('scroll', () => {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      });
    }
  }
  