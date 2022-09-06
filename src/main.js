const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=d35b24b361166e540ee6c082ddecd6bf&language=es-MX';
const TRENDING_MOVIES_ENDPOINT = 'trending/movie/day';
const GENRE_ENDPOINT = 'genre/movie/list';
const POSTER_URL = 'https://image.tmdb.org/t/p/w200';
const BY_GENRE_ENDPOINT = `discover/movie`;
const MOVIES_BY_GENRE = 'discover/movie';
const SEARCH_MOVIE = 'search/movie';
const MOVIE_DETAILS_ENDPOINT = 'movie'

// RESOURSES
// https://takeout85.github.io/movie-app
// https://devnielote.github.io/quick-watch/#
// https://khisus19moviefinder.netlify.app/index.html

// REUSABLE FUNCTIONS // UTILS 
function getAndDisplayMoviePosters(posterPath, sectionToAppend, movieId) { 

    const imgElem = document.createElement('img');
    imgElem.src = `${POSTER_URL}/${posterPath}`;
    sectionToAppend.appendChild(imgElem);

    imgElem.addEventListener('click', () => { 
        location.hash=`#movie=${movieId}`;
        console.log("clicked");
        // getMovieDetails(movie.id);
     })

}

function createCategoriesList(sectionToAppend, genresArray){

    const ulElem = document.createElement('ul');
    sectionToAppend.appendChild(ulElem);

    genresArray.forEach(genre => {
        const genreId = genre.id
        const liElem = document.createElement('li');
        // const aElem = document.createElement('a');

        liElem.setAttribute('id', 'id'+ genreId);

        liElem.addEventListener('click', () => { 
            location.hash = `#category=${genreId}-${genre.name}`;
            // genericTitle.innerHTML = genre.name;
            getMoviesByGenre();

         })

        liElem.innerHTML = genre.name;
        // aElem.setAttribute('href', `${URL}/${BY_GENRE_ENDPOINT}?${API_KEY}&with_genres=${genreId}`);

        // liElem.appendChild(aElem);
        ulElem.appendChild(liElem);
        
    });

}

// API CALLS
async function getTrendingMovies(){
    try {
        const response = await axios.get(`${URL}/${TRENDING_MOVIES_ENDPOINT}?${API_KEY}`);
        const movies = response.data.results;

        movies.forEach(movie => {      
            const divElement = document.createElement('div');
            divElement.classList.add('movie-container');

            getAndDisplayMoviePosters(movie.poster_path, divElement, movie.id);

            horizontalMenu.appendChild(divElement);
            const trendingMovieTitle = document.createElement('h6');
            trendingMovieTitle.innerHTML = movie.title;
            divElement.appendChild(trendingMovieTitle);
  
        });
    } 
    catch (error) {
        console.error(error);
    }
}

async function getGenreData(){

    const response = await fetch(`${URL}/${GENRE_ENDPOINT}?${API_KEY}`);
    const data = await response.json();
    const genresArray = data.genres;

    categoriesSection.innerHTML = '';

    createCategoriesList(categoriesSection, genresArray);
 
}


async function getMoviesByGenre(){

    const splitedText = location.hash.split('=');
    // console.log(splitedText);
    const secondSplit = splitedText[1].split('-');
    const genreTitle = secondSplit[1];
    const genreId = secondSplit[0];
    // console.log(genreId);

    const response = await fetch(`${URL}/${MOVIES_BY_GENRE}?${API_KEY}&with_genres=${genreId}`);
    const data = await response.json();
    const moviesByGenreArray = data.results;
   
    genericSection.innerHTML = '';
    const genreTitleElem = document.createElement('h2');
    genreTitleElem.innerHTML = genreTitle;
    genericSection.appendChild(genreTitleElem);

    moviesByGenreArray.forEach(movie => {

        getAndDisplayMoviePosters(movie.poster_path, genericSection, movie.id);

    });

}

async function  searchMoviesByButton(){

    const splitedText = location.hash.split('=');
    // console.log(splitedText);
    const search_query = splitedText[1];
    console.log(search_query);

    const response = await fetch(`${URL}/${SEARCH_MOVIE}?${API_KEY}&query=${search_query}`);
    const data = await response.json();
    const moviesBySearchQuery = data.results;

    genericSection.innerHTML = '';

    moviesBySearchQuery.forEach(movie => {

        getAndDisplayMoviePosters(movie.poster_path, genericSection, movie.id)        
    });

    console.log(data.results);

}

async function getMoviesByTrend(){

    try {
        const response = await axios.get(`${URL}/${TRENDING_MOVIES_ENDPOINT}?${API_KEY}`);
        const movies = response.data.results;

        genericSection.innerHTML = '';

            movies.forEach(movie => {

                getAndDisplayMoviePosters(movie.poster_path, genericSection, movie.id);

            });
    } catch (error) {
        console.error(error);
    }

}

async function getMovieDetails(id){

    try {
        
        const response = await axios.get(`${URL}/${MOVIE_DETAILS_ENDPOINT}/${id}?${API_KEY}`);
        const movie = response.data;

        movieDetailCategories.innerHTML = '';

        // for the main Poster
        getAndDisplayMoviePosters(movie.poster_path, movieDetailPoster, id);

         // To add Movie Title and Description
        movieDetailTitle.textContent = movie.title;
        movieDescription.textContent = movie.overview;

        // To create categories and dispplay them
        createCategoriesList(movieDetailCategories, movie.genres);

        // To get related movies and display them
        getRelatedMovies(id);

    }
    catch(error){
        console.error(error);
    }
}

async function getRelatedMovies(movieId){

    relatedMoviesSection.innerHTML  = "";

    try {
        const response = await axios.get(`${URL}/movie/${movieId}/similar?${API_KEY}`);
        const similarMovies = response.data.results;
        // console.log("SIMILAR MOVIES", similarMovies);
        similarMovies.forEach( movie => {

            getAndDisplayMoviePosters(movie.poster_path, relatedMoviesSection, movie.id);
    });

    }
    catch(error){
        console.error(error);
    }

}




