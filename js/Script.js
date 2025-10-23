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
    console.log(genre.name);
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

        const firstMovie = data.results[2];
        if (firstMovie) {
            const movie = {
                title: firstMovie.title,
                overview: firstMovie.overview,
                img: 'https://image.tmdb.org/t/p/original' + firstMovie.backdrop_path,
                overview: firstMovie.overview,
                genre: getGenreName(firstMovie.genre_ids[0]),
            };

            const heroSection = heroSectionExp;
            document.querySelector('#heroImgExp').style.backgroundImage = `url(${movie.img})`;
            heroSection.querySelector('#titleHeroExp').textContent = movie.title;
            heroSection.querySelector('#overviewHeroExp').textContent = movie.overview;
            heroSection.querySelector('#genresExp').textContent = `Genre: ${movie.genre}`;
        }

       

    } catch (error) {
        console.error('Error fetching TMDB data:', error);
    }
}();

//TrendingSA
!async function() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-ZA&region=ZA&page=1', options);
        const data = await response.json();

        trendSAmoviesArray = data.results.map(movie => {
            return {
                title: movie.title,
                releaseDate: movie.release_date,
                rating: movie.vote_average,
                popularity: movie.popularity,
                overview: movie.overview,
                posterUrl: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            };
        });

        trendSAmoviesArray.forEach((movie, i) => {
            const card = trendSACardsExp[i];
            if (card) { 
                card.querySelector('img').src = movie.posterUrl;
                card.querySelector('.card-title').textContent = movie.title;
                const shortRating = movie.rating.toFixed(2);
                card.querySelector('#rating').textContent = `Rating: ${shortRating}`;
                card.querySelector('#release').textContent = `Release: ${movie.releaseDate}`;
            }
        });

    } catch (error) {
        console.error('Error fetching TMDB data:', error);
    }
}();

//Horror
!async function() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=27', options);
        const data = await response.json();

        moviesArray = data.results.map(movie => {
            return {
                title: movie.title,
                releaseDate: movie.release_date,
                rating: movie.vote_average,
                popularity: movie.popularity,
                overview: movie.overview,
                posterUrl: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            };
        });

        moviesArray.forEach((movie, i) => {
            const card = horrorCardsExp[i];
            if (card) { 
                card.querySelector('img').src = movie.posterUrl;
                card.querySelector('.card-title').textContent = movie.title;
                const shortRating = movie.rating.toFixed(2);
                card.querySelector('#rating').textContent = `Rating: ${shortRating}`;
                card.querySelector('#release').textContent = `Release: ${movie.releaseDate}`;
            }
        });

    } catch (error) {
        console.error('Error fetching TMDB data:', error);
    }
}();

//Top Earning
!async function() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjQxYjVkZjM4OWQzNGNkNjA3NDAxYjhjMGFiNDY3MSIsIm5iZiI6MTc2MTE3ODkyNC4yODEsInN1YiI6IjY4Zjk3NTJjMWQ1MTQ1MzUzODQ4ZWZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lj9vtUp62zyRkE6p4x6o0aJm1mqbNyLiHk7wG3Ju4dA'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=revenue.desc', options);
        const data = await response.json();

        moviesArray = data.results.map(movie => {
            return {
                title: movie.title,
                releaseDate: movie.release_date,
                rating: movie.vote_average,
                popularity: movie.popularity,
                overview: movie.overview,
                posterUrl: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            };
        });

        moviesArray.forEach((movie, i) => {
            const card = topEarningCardsExp[i];
            if (card) { 
                card.querySelector('img').src = movie.posterUrl;
                card.querySelector('.card-title').textContent = movie.title;
                const shortRating = movie.rating.toFixed(2);
                card.querySelector('#rating').textContent = `Rating: ${shortRating}`;
                card.querySelector('#release').textContent = `Release: ${movie.releaseDate}`;
            }
        });

    } catch (error) {
        console.error('Error fetching TMDB data:', error);
    }
}();

//End of Troy's Stuff



registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})