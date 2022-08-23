const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=d35b24b361166e540ee6c082ddecd6bf&language=es-MX';
const TRENDING_MOVIES_ENDPOINT = 'trending/movie/day';
const GENRE_ENDPOINT = 'genre/movie/list';
const POSTER_URL = 'https://image.tmdb.org/t/p/w200';
const BY_GENRE_ENDPOINT = `discover/movie`;
const MOVIES_BY_GENRE = 'discover/movie';


  async function getTrendingMovies(){

            try {
                const response = await axios.get(`${URL}/${TRENDING_MOVIES_ENDPOINT}?${API_KEY}`);
                const movies = response.data.results;
                    movies.forEach(movie => {
                       
                        
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
            } catch (error) {
                console.error(error);
            }

  }

// USING FETCH
// async function getTrendingMovies(){
//     const response = await fetch(`${URL}/${TRENDING_MOVIES_ENDPOINT}?${API_KEY}`);
//     const data = await response.json();
//     const movies = data.results;

//     movies.forEach(movie => {
//         // console.log(movie);

//         const horizontalMenu = document.getElementById('horizontal-scrollmenu');
//         const divElement = document.createElement('div');
//         divElement.classList.add('movie-container');

//         horizontalMenu.appendChild(divElement);

//         const imgElem = document.createElement('img');
//         divElement.appendChild(imgElem);
//         imgElem.src = `${POSTER_URL}/${movie.poster_path}`;

//         const trendingMovieTitle = document.createElement('h6');
//         trendingMovieTitle.innerHTML = movie.title;
//         divElement.appendChild(trendingMovieTitle);

        

//     });

// }


async function getGenreData(){

    const response = await fetch(`${URL}/${GENRE_ENDPOINT}?${API_KEY}`);
    const data = await response.json();
    const genresArray = data.genres;

    categoriesSection.innerHTML = '';
    
    const ulElem = document.createElement('ul');
    categoriesSection.appendChild(ulElem);

    genresArray.forEach(genre => {

        const genreId = genre.id

        const liContainer = document.createElement('div');
        const liElem = document.createElement('li');
        // const aElem = document.createElement('a');

        liElem.setAttribute('id', 'id'+genreId);

        liElem.addEventListener('click', () => { 
            location.hash = `#category=${genreId}-${genre.name}`;
            genericTitle.textContent = genre.name;

            getMoviesByGenre();

         })

        liElem.innerHTML = genre.name;
        // aElem.setAttribute('href', `${URL}/${BY_GENRE_ENDPOINT}?${API_KEY}&with_genres=${genreId}`);

        // liElem.appendChild(aElem);
        ulElem.appendChild(liElem);
        
    });
    
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

        const imgElem = document.createElement('img');
        genericSection.appendChild(imgElem);
        imgElem.src = `${POSTER_URL}/${movie.poster_path}`;
        
    });

}




