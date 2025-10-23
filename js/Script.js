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
let moviesArray;
const trendSACards = [document.querySelector('#trendSA1'), document.querySelector('#trendSA2'),document.querySelector('#trendSA3'),document.querySelector('#trendSA4'), ];

//Troy's Objects

//Troy's API CALLS
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
            const card = trendSACards[i];
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