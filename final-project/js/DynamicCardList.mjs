export async function createScrollableCards({ selector, fetcher, renderCard, infiniteScroll = false }) {
    const container = document.querySelector(selector);
    
    container.innerHTML = '';
  
    const data = await fetcher();
  
    data.forEach(item => {
      const card = renderCard(item);
      container.appendChild(card);
    });
  
    if (infiniteScroll) {
      const cards = container.querySelectorAll(':scope > *');
      cards.forEach(card => {
        let clone = card.cloneNode(true);
        container.appendChild(clone);
      });
  
      container.addEventListener('scroll', () => {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      });
    }
  }
  