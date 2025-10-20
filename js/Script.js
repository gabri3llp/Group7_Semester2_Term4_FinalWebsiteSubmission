(async function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const base = '/api/movies';

  const q = sel => document.querySelector(sel);
  const titleEl = q('.hero-title');
  const descEl = q('.hero-description');
  const heroEl = q('.hero');
  const playBtn = q('.hero-buttons .btn.btn-dark');
  const moreBtn = q('.hero-buttons .btn-outline-dark');
  const suggestedContainer = q('.suggested');
  const metaSpans = document.querySelectorAll('.hero-meta span');
  const addWatchlistBtn = q('#add-watchlist');
  const markWatchedBtn = q('#mark-watched');

  async function tryFetch(url) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) { return null; }
  }

  let movie = null;

  if (id) {
    movie = await tryFetch(`${base}/${encodeURIComponent(id)}`);
    if (!movie) {
      const alt = await tryFetch(`${base}?id=${encodeURIComponent(id)}`);
      movie = Array.isArray(alt) ? alt[0] : alt;
    }
  }

  if (!movie) {
    const list = await tryFetch(base);
    if (Array.isArray(list) && list.length) {
      movie = id ? list.find(m => String(m.id) === id || String(m.slug) === id || String(m.title) === id) || list[0] : list[0];
    }
  }

  if (!movie) {
    if (titleEl) titleEl.textContent = 'Movie not found';
    if (descEl) descEl.textContent = '';
    return;
  }

  const title = movie.title || movie.name || 'Untitled';
  const description = movie.description || movie.overview || movie.synopsis || '';
  const year = movie.releaseDate || movie.year || movie.release || 'N/A';
  const age = movie.ageRating || movie.age || movie.age_limit || 'N/A';
  const rating = movie.score || movie.rating || (movie.vote_average ? `${movie.vote_average}/10` : 'N/A');
  const genres = Array.isArray(movie.genres) ? movie.genres.join(', ') : (movie.genres || 'N/A');

  if (titleEl) titleEl.innerHTML = title;
  if (descEl) descEl.textContent = description;
  if (metaSpans && metaSpans.length >= 4) {
    metaSpans[0].textContent = year;
    metaSpans[1].textContent = age;
    metaSpans[2].textContent = rating;
    metaSpans[3].textContent = genres;
  }

  const backdrop = movie.backdrop || movie.backdrop_path || movie.background || movie.image || movie.poster;
  if (backdrop && heroEl) heroEl.style.backgroundImage = `url('${backdrop}')`;

  const trailer = movie.trailer || movie.trailerUrl || movie.videoUrl || movie.trailer_url;
  if (trailer && playBtn) playBtn.addEventListener('click', () => { window.open(trailer, '_blank'); });
  else if (playBtn) playBtn.addEventListener('click', () => { if (moreBtn) moreBtn.scrollIntoView({ behavior: 'smooth' }); });

  if (moreBtn) moreBtn.addEventListener('click', () => { if (descEl) descEl.scrollIntoView({ behavior: 'smooth' }); });

  // Watchlist / Mark watched UI (no backend)
  if (addWatchlistBtn) {
    addWatchlistBtn.addEventListener('click', () => {
      addWatchlistBtn.textContent = 'Added';
      addWatchlistBtn.disabled = true;
      addWatchlistBtn.style.opacity = '0.8';
    });
  }
  if (markWatchedBtn) {
    markWatchedBtn.addEventListener('click', () => {
      markWatchedBtn.textContent = 'Watched';
      markWatchedBtn.disabled = true;
      markWatchedBtn.style.opacity = '0.8';
    });
  }

  // Build suggestions area (replace existing suggested content)
  if (suggestedContainer) {
    suggestedContainer.innerHTML = ''; // clear sample content
    const suggestions = movie.similar || movie.suggestions || movie.recommended || [];
    const fillFromApi = async () => {
      const all = await tryFetch(base);
      return Array.isArray(all) ? all.filter(s => String(s.id) !== String(movie.id)).slice(0, 4) : [];
    };

    let items = Array.isArray(suggestions) && suggestions.length ? suggestions.slice(0, 4) : await fillFromApi();

    items.forEach(s => {
      const imgUrl = s.poster || s.image || s.backdrop || '';
      const card = document.createElement('div');
      card.className = 'suggested';
      card.style.margin = '0.5rem';
      card.style.minWidth = '140px';
      card.style.textAlign = 'center';
      card.innerHTML = `
        <div class="suggested-img" style="background-image:url('${imgUrl}');"></div>
        <p class="mt-2 mb-0 fw-bold" style="font-size:.95rem">${s.title||s.name||''}</p>
        <small class="text-muted">${s.releaseDate||s.year||''}</small>
      `;
      // clicking navigates to same page with id param (keeps routing convention)
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const sid = s.id || s.slug || s.title || s.name;
        if (sid) location.search = `?id=${encodeURIComponent(sid)}`;
      });
      suggestedContainer.appendChild(card);
    });
  }

})();