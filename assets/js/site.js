(() => {
  'use strict';

  const writings = document.querySelector('.writings');
  if (writings && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    writings.classList.add('motion-await');
    const reveal = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      writings.classList.add('is-revealed');
      observer.disconnect();
    }, { rootMargin: '0px 0px -25% 0px', threshold: 0.05 });
    reveal.observe(writings.querySelector('.section-heading'));
    reveal.observe(writings.querySelector('.writing-columns'));
  }

  const searchTools = document.querySelector('[data-search]');
  if (searchTools) {
    const input = document.querySelector('#post-search');
    const topic = document.querySelector('#topic-filter');
    const count = document.querySelector('#result-count');
    const countLabel = document.querySelector('#result-label');
    const empty = document.querySelector('.empty-results');
    const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
    const posts = [...document.querySelectorAll('[data-post]')].map((element) => ({
      element,
      text: normalize(element.dataset.searchText),
      tags: JSON.parse(element.dataset.tags || '[]') || [],
    }));
    const filter = () => {
      const words = normalize(input.value).trim().split(/\s+/).filter(Boolean);
      let visible = 0;
      for (const post of posts) {
        const match = words.every((word) => post.text.includes(word)) && (!topic.value || post.tags.includes(topic.value));
        post.element.hidden = !match;
        if (match) visible++;
      }
      count.textContent = visible;
      countLabel.textContent = visible === 1 ? countLabel.dataset.singular : countLabel.dataset.plural;
      empty.hidden = visible !== 0;
    };
    input.addEventListener('input', filter);
    topic.addEventListener('change', filter);
    document.querySelector('#reset-search').addEventListener('click', () => {
      input.value = '';
      topic.value = '';
      filter();
      input.focus();
    });
    searchTools.hidden = false;
    // Reconcile values restored by the browser when navigating back.
    window.addEventListener('pageshow', filter);
    filter();
  }

  const article = document.querySelector('.article-content');
  if (!article) return;

  const toc = document.querySelector('.toc');
  if (toc && window.matchMedia('(max-width: 800px)').matches) toc.open = false;

  if (navigator.clipboard && window.isSecureContext) {
    for (const block of article.querySelectorAll('.highlight')) {
      const code = block.querySelector('pre code');
      if (!code) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-button';
      button.textContent = article.dataset.copyLabel;
      button.setAttribute('aria-live', 'polite');
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          button.textContent = article.dataset.copiedLabel;
        } catch {
          button.textContent = article.dataset.copyError;
        }
        setTimeout(() => { button.textContent = article.dataset.copyLabel; }, 2200);
      });
      block.append(button);
    }
  }

  const progress = document.querySelector('.reading-progress');
  let pending = false;
  const updateProgress = () => {
    const bounds = article.getBoundingClientRect();
    const distance = Math.max(1, bounds.height - window.innerHeight);
    const fraction = Math.min(1, Math.max(0, -bounds.top / distance));
    progress.style.transform = `scaleX(${fraction})`;
    pending = false;
  };
  const scheduleProgress = () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateProgress);
    }
  };
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress);
  updateProgress();

  if (toc && 'IntersectionObserver' in window) {
    const links = [...toc.querySelectorAll('a')];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (decodeURIComponent(link.hash.slice(1)) === entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-5% 0px -75% 0px' });
    article.querySelectorAll('h2[id], h3[id], h4[id]').forEach((heading) => observer.observe(heading));
  }
})();
