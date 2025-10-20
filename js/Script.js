// Custom TMDB API integration for your movie detail page.
// Fetches movie info, trailers, and suggestions dynamically.

(async function () {
  // 🔑 TMDB API key
  const apiKey = '0363063badd97c1049612cbbac78bf57';
  const apiBase = 'https://api.themoviedb.org/3';
  const imageBase = 'https://image.tmdb.org/t/p/';

  const popularURL = `${apiBase}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  async function getJSON(url) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (err) {
      console.error('Fetch failed:', err);
      return null;
    }
  }

  const imgURL = (path, size = 'original') => path ? `${imageBase}${size}${path}` : '';

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');

  const hero = document.querySelector('.hero');
  const titleEl = document.querySelector('.hero-title');
  const descEl = document.querySelector('.hero-description');
  const metaSpans = document.querySelectorAll('.hero-meta span');
  const suggestionsEl = document.querySelector('.suggested') || document.querySelector('#suggested-list');
  const playBtn = document.querySelector('.hero-buttons .btn.btn-dark');
  const infoBtn = document.querySelector('.hero-buttons .btn-outline-dark');
  const addWatchlistBtn = document.querySelector('#add-watchlist');
  const markWatchedBtn = document.querySelector('#mark-watched');

  async function fetchMovie(id) {
    if (!id) return null;
    const url = `${apiBase}/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos,similar`;
    return await getJSON(url);
  }

  const popularData = await getJSON(popularURL);
  let movie = null;

  if (movieId) {
    movie = await fetchMovie(movieId);
    if (!movie && popularData?.results) {
      movie = popularData.results.find(m => String(m.id) === movieId) || null;
    }
  }

  if (!movie && popularData?.results?.length) {
    movie = popularData.results[0];
  }

  if (!movie) {
    if (titleEl) titleEl.textContent = 'Movie not found';
    if (descEl) descEl.textContent = '';
    return;
  }

  const title = movie.title || movie.original_title || 'Untitled';
  const description = movie.overview || 'No description available.';
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const age = movie.adult ? '18+' : 'PG';
  const rating = movie.vote_average ? `${movie.vote_average}/10` : 'N/A';
  const genres = movie.genres?.map(g => g.name).join(', ') || 'N/A';
  const background = imgURL(movie.backdrop_path || movie.poster_path);

  if (hero && background) hero.style.backgroundImage = `url('${background}')`;
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = description;

  if (metaSpans.length >= 4) {
    metaSpans[0].textContent = year;
    metaSpans[1].textContent = age;
    metaSpans[2].textContent = rating;
    metaSpans[3].textContent = genres;
  }

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  if (trailer && playBtn) {
    playBtn.addEventListener('click', () => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank'));
  } else if (playBtn && infoBtn) {
    playBtn.addEventListener('click', () => infoBtn.scrollIntoView({ behavior: 'smooth' }));
  }

  if (infoBtn) infoBtn.addEventListener('click', () => descEl.scrollIntoView({ behavior: 'smooth' }));

  
  if (addWatchlistBtn) {
    addWatchlistBtn.addEventListener('click', () => {
      addWatchlistBtn.textContent = 'Added';
      addWatchlistBtn.disabled = true;
      addWatchlistBtn.style.opacity = '0.7';
    });
  }

  if (markWatchedBtn) {
    markWatchedBtn.addEventListener('click', () => {
      markWatchedBtn.textContent = 'Watched';
      markWatchedBtn.disabled = true;
      markWatchedBtn.style.opacity = '0.7';
    });
  }

  
  async function loadSuggestions() {
    let suggestions = [];

    const rec = await getJSON(`${apiBase}/movie/${movie.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`);
    if (rec?.results?.length) suggestions = rec.results;
    if (!suggestions.length && movie.similar?.results?.length) suggestions = movie.similar.results;
    if (!suggestions.length && popularData?.results?.length)
      suggestions = popularData.results.filter(m => m.id !== movie.id).slice(0, 6);

    if (!suggestionsEl) return;

    suggestionsEl.innerHTML = '';
    suggestions.slice(0, 6).forEach(s => {
      const card = document.createElement('div');
      card.className = 'suggested';
      card.style.cursor = 'pointer';
      const img = imgURL(s.poster_path || s.backdrop_path, 'w342');
      card.innerHTML = `
        <div class="suggested-img" style="background-image: url('${img}')"></div>
        <p class="mt-2 mb-0 fw-bold" style="font-size:.95rem">${s.title || s.name}</p>
        <small class="text-muted">${s.release_date?.split('-')[0] || ''}</small>
      `;
      card.addEventListener('click', () => location.search = `?id=${encodeURIComponent(s.id)}`);
      suggestionsEl.appendChild(card);
    });
  }

  await loadSuggestions();
})();