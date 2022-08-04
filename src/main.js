const API_KEY = 'api_key=d35b24b361166e540ee6c082ddecd6bf';
const URL = 'https://api.themoviedb.org/3/';

const test_movie_endpoint = 'https://api.themoviedb.org/3/movie/550?api_key=d35b24b361166e540ee6c082ddecd6bf';

async function apiCall(){
    const response = await fetch(test_movie_endpoint);
    const data = await response.json();
    console.log(data);
    return data;
}

apiCall()