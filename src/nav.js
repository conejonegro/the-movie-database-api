
window.addEventListener('hashchange', navigator, false);

window.addEventListener('DOMContentLoaded', navigator);

function navigator(){
    console.log(location);

    if(location.hash.startsWith("#trends")){
       trendsPage();
    }
    else if(location.hash.startsWith('#search=')){
       searchView();
    }
    else if(location.hash.startsWith('#movie=')){
        movieDetailsView();
    }
    else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }
    else{
        homePage();
    }
    
}

function trendsPage(){
    console.log("TrendsView");
}

function searchView(){
    console.log('searchView');

    searchBar.classList.remove('inactive');
    trendsSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
}

function movieDetailsView(){
    console.log("Movie Detail View");

    searchBar.classList.remove('inactive');
    trendsSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
}

function categoriesPage(){
    console.log("Categories view");
    
    searchBar.classList.remove('inactive');
    trendsSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    backArrow.classList.remove('inactive');
    inputGroup.classList.remove('justify-content-end');
    inputGroup.classList.add('justify-content-space-between');
     

}

function homePage(){

    console.log("HOMEPAGE VIEW");

    horizontalMenu.innerHTML = '';
    categoriesSection.innerHTML = '';

    searchBar.classList.remove('inactive');
    trendsSection.classList.remove('inactive');
    categoriesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    backArrow.classList.add('inactive');
    inputGroup.classList.add('justify-content-end');

    getTrendingMovies();
    getGenreData();
}
