const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=d35b24b361166e540ee6c082ddecd6bf';
const TRENDING_MOVIES_ENDPOINT = 'trending/movie/day';
const POSTER_URL = 'https://image.tmdb.org/t/p/w200'

async function getTrendingMovies(){
    const response = await fetch(`${URL}/${TRENDING_MOVIES_ENDPOINT}?${API_KEY}`);
    const data = await response.json();
    const movies = data.results;

    movies.forEach(movie => {
        console.log(movie);

        const horizontalMenu = document.getElementById('horizontal-scrollmenu');
        const divElement = document.createElement('div');
        divElement.classList.add('movie-container');

        horizontalMenu.appendChild(divElement);

        const imgElem = document.createElement('img');
        divElement.appendChild(imgElem);
        imgElem.src = `${POSTER_URL}/${movie.poster_path}`;

        const trendingMovieTitle = document.createElement('h6');
        trendingMovieTitle.innerHTML = movie.title;
        divElement.appendChild(trendingMovieTitle);

        

    });

}

getTrendingMovies()