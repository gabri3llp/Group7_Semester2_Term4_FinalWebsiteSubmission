const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

/*API CALL Written by Troy
    API call is different from RAPID API calls, TMDB does not use rapidAPI headers. 
    Each of you go to: https://developer.themoviedb.org/reference/getting-started
    Choose JS as the language
    Where it says Credentials, enter: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA
    On the left search for the call you'd like to make
    Adapt the async function as needed
*/

//Troy's Variables
const genres = [                                //taken from tmdb's 'genres/movielist'
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

let trendSAmoviesArray;
const heroSectionExp = document.querySelector('#heroSectionExp');
const trendSACardsExp = [document.querySelector('#trendSA1'), document.querySelector('#trendSA2'),document.querySelector('#trendSA3'),document.querySelector('#trendSA4')];
const horrorCardsExp = [document.querySelector('#horror1'), document.querySelector('#horror2'),document.querySelector('#horror3'),document.querySelector('#horror4')];
const topEarningCardsExp = [document.querySelector('#tE1'), document.querySelector('#tE2'),document.querySelector('#tE3'),document.querySelector('#tE4')];

//Troy's Functions
function getGenreName(genreId) {
    const genre = genres.find(g => g.id === genreId);
    // console.log(genre.name);
    return genre.name;
}

//Troy's API CALLS
//HeroSection
!async function() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
        const data = await response.json();

        const movies = data.results.filter(m => m.backdrop_path);
        if (!movies.length) return;

        const heroSection = heroSectionExp;
        const heroImg = document.querySelector('#heroImgExp');
        const titleHSExp = heroSection.querySelector('#titleHeroExp');
        const overviewHSExp = heroSection.querySelector('#overviewHeroExp');
        const genreHSExp = heroSection.querySelector('#genresExp');

        let index = 0;

        function showMovie(movie) {
            const imgUrl = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
            const genre = getGenreName(movie.genre_ids[0]);


            setTimeout(() => {
                heroImg.style.backgroundImage = `url(${imgUrl})`;
                titleHSExp.textContent = movie.title;
                overviewHSExp.textContent = movie.overview;
                genreHSExp.textContent = `Genre: ${genre}`;
                heroImg.classList.add('fade-in');
                setTimeout(() => heroImg.classList.remove('fade-in'), 1000);
            }, 500);
        }

        showMovie(movies[index]);

        setInterval(() => {
            index = (index + 1) % movies.length;
            showMovie(movies[index]);
        }, 12000);

    } catch (error) {
        console.error('Error fetching TMDB data:', error);
    }
}();

//TrendingSA
!async function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch(
            'https://api.themoviedb.org/3/trending/movie/week?region=ZA&language=en-US',
            options
        );
        const data = await response.json();
        const moviesArray = data.results.slice(0, 5);

        const container = document.querySelector('.landingMovies:nth-of-type(1) .landingList');
        const template = document.querySelector('#movieCardTemplate');

        container.innerHTML = '';

        moviesArray.forEach(movie => {
            const card = template.content.cloneNode(true);
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            card.querySelector('.card-title').textContent = movie.title;
            card.querySelector('#release').innerHTML = `Release: <br>${movie.release_date}`;
            card.querySelector('#rating').innerHTML = `Rating: <br>${movie.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching TMDB data (Trending South Africa):', error);
    }
}();


//Horror
!async function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=27&language=en-US&page=1&sort_by=popularity.desc',
            options
        );
        const data = await response.json();
        const moviesArray = data.results.slice(0, 5);

        const container = document.querySelector('.landingMovies:nth-of-type(2) .landingList');
        const template = document.querySelector('#movieCardTemplate');

        container.innerHTML = '';

        moviesArray.forEach(movie => {
            const card = template.content.cloneNode(true);
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            card.querySelector('.card-title').textContent = movie.title;
            card.querySelector('#release').innerHTML = `Release: <br>${movie.release_date}`;
            card.querySelector('#rating').innerHTML = `Rating: <br>${movie.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching TMDB data (Horror):', error);
    }
}();


//Top Earning
!async function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc',
            options
        );
        const data = await response.json();
        const moviesArray = data.results.slice(0, 5);

        const container = document.querySelector('.landingMovies:nth-of-type(3) .landingList');
        const template = document.querySelector('#movieCardTemplate');

        container.innerHTML = '';

        moviesArray.forEach(movie => {
            const card = template.content.cloneNode(true);
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            card.querySelector('.card-title').textContent = movie.title;
            card.querySelector('#release').innerHTML = `Release: <br>${movie.release_date}`;
            card.querySelector('#rating').innerHTML = `Rating: <br>${movie.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching TMDB data:', error);
    }
}();


//filterlogic
document.addEventListener('DOMContentLoaded', () => {
    const genreDropdown = document.querySelector('#genreFilter');
    const sortDropdown = document.querySelector('#sortFilter');
    const defaultSect = document.querySelector('.defaultPageEXP');
    const filterMode = document.querySelector('.filteredPageEXP');
    const container = document.querySelector('.filteredPageEXP .landingList');
    const template = document.querySelector('#movieCardTemplate');  


    function toggleDefault(hidden) {
        defaultSect.style.display = hidden ? 'none' : '';
        filterMode.style.display = hidden ? '' : 'none';
    }

    function showMovies(movies) {
        container.innerHTML = '';

        movies.forEach(movie => {
            const card = template.content.cloneNode(true);
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            card.querySelector('.card-title').textContent = movie.title;
            card.querySelector('#release').innerHTML = `Release: <br>${movie.release_date}`;
            card.querySelector('#rating').innerHTML = `Rating: <br>${movie.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
            container.appendChild(card)
        });        
    }

    async function fetchAndShow(genreId = null, sortMode = 'newest') {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
            }
        };

        let sortBy = 'primary_release_date.desc';
        if (sortMode === 'oldest') sortBy = 'primary_release_date.asc';
        if (sortMode === 'toprated') sortBy = 'vote_average.desc';

        let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortBy}&vote_count.gte=50&primary_release_date.lte=2025-10-31`;
        
        if (genreId) {
            url += `&with_genres=${genreId}`;
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            showMovies(data.results);
        } catch (error) {
            console.error('Error fetching TMDB data:', error);
        }
    }

    let currentGenre = null;
    let currentSort = 'newest';
    toggleDefault(false);

    genreDropdown.addEventListener('change', (e) => {
        const selectedValue = e.target.value.toLowerCase();
        const isAll = selectedValue === 'all';
        currentGenre = isAll ? null : selectedValue;

        toggleDefault(!isAll);
        fetchAndShow(currentGenre, currentSort);
    });

    sortDropdown.addEventListener('change', (e) => {
        currentSort = e.target.value;
        toggleDefault(currentGenre !== null);
        fetchAndShow(currentGenre, currentSort);
    });
});

//HomePage Cards
!async function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch(
            'https://api.themoviedb.org/3/trending/movie/week?region=ZA&language=en-US',
            options
        );
        const data = await response.json();
        const moviesArray = data.results.slice(0, 5);

        const container = document.querySelector('.homeMovies .landingList');
        const template = document.querySelector('#movieCardTemplate');

        container.innerHTML = '';

        moviesArray.forEach(movie => {
            const card = template.content.cloneNode(true);
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            card.querySelector('.card-title').textContent = movie.title;
            card.querySelector('#release').innerHTML = `Release: <br>${movie.release_date}`;
            card.querySelector('#rating').innerHTML = `Rating: <br>${movie.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching TMDB data (Trending HomePage):', error);
    }
}();

!async function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch(
            'https://api.themoviedb.org/3/discover/movie?with_genres=9648&sort_by=primary_release_date.desc&language=en-US&include_adult=false&page=1&primary_release_date.lte=2025-11-04',
            options
        );
        const data = await response.json();
        const moviesArray = data.results.slice(0, 5);

        const container = document.querySelector('.mysteryMovies .landingList');
        const template = document.querySelector('#movieCardTemplate');

        container.innerHTML = '';

        moviesArray.forEach(movie => {
            const card = template.content.cloneNode(true);
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            card.querySelector('.card-title').textContent = movie.title;
            card.querySelector('#release').innerHTML = `Release: <br>${movie.release_date}`;
            card.querySelector('#rating').innerHTML = `Rating: <br>${movie.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>`;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching Mystery movies:', error);
    }
}();
//End of Troy's Stuff

//individual movie page stuff
let movieName = '';


function fetchMovieInfo(title){
    !async function () {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=en-US&page=1`,
            options
        );
        const data = await response.json();
        const movie= data.results[0];
        
        const overlay = document.querySelector('.overlay');
        overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
        overlay.style.backgroundSize = 'cover';       
        overlay.style.backgroundPosition = 'center'; 
        overlay.style.backgroundRepeat = 'no-repeat'; 

        document.querySelector('.hero-title').textContent = movie.title;
        document.querySelector('#yor').textContent = movie.release_date;
        document.querySelector('#ageRestIND').textContent = movie.adult ? "18+" : "E - Everyone";
        document.querySelector('#ratingIND').textContent = `Rating: ${movie.vote_average}`;
        document.querySelector('#genresIND').textContent = `${getGenreName(movie.genre_ids[0])}`; 
        document.querySelector('.hero-description').textContent = movie.overview;

        
        

    } catch (error) {
        console.error('Error fetching TMDB data (indivpage):', error);
    }

    
}();
}



document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.card-img-top');
    if (!card) return;

    movieName = card.parentElement.querySelector('.card-title').textContent;
    console.log(`Clicked movie ID: ${movieName}`);

    sessionStorage.setItem('movieName', movieName);
    window.location.href = window.location.pathname.includes("/pages/") ? "individiul movie.html" : "pages/individiul movie.html";
});

document.addEventListener('DOMContentLoaded', () => {
    const movieName = sessionStorage.getItem('movieName');
    if (movieName) {
        fetchMovieInfo(movieName);
    }
});



//End of individual page

//Movie watchlist page

class Individual {
            constructor(title,release_date,rating,genre,overview){
        movie.title = title;
        movie.release_date = release_date;
        movie.vote_average = rating;
        movie.genre = genre;
        movie.overview = overview;
            }            
        };



const addWatchlist = document.getElementById('add-watchlist');

addWatchlist.addEventListener('onclick', (e) => {
    e.preventDefault();

    const title = document.getElementById('.hero-title').value;
    const release_date = document.getElementById('yor').value;
    const vote_average = document.getElementById('ratingIND').value;
    const genre = document.getElementById('signUpgenresINDPassword').value;
    const overview = document.getElementById('hero-description').value;

    const newIndividual = new Individual(title, release_date, vote_average,genre,overview);
    
    // let users = JSON.parse(localStorage.getItem('users')) || [];
    
    Individual.push(newIndividual);

    // localStorage.setItem("individual", JSON.stringify(users));

    console.log(Individual[0])
});



registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

