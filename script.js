//1. Firstly getting an API key from the TMDB website and assigning it to the variable for accessing it further.
//2. BASE_URL gives us the base url from which we can access the movie database for particular end points such as movie 
// based on the popularity or search through the input given.

// 3.API_URL gives the common url which describes the search though the popularity.
// 4.IMG_URL gives the images of the movies getting displayed.
// 5.searchURL gives the movie based on the search results.


const API_KEY = "api_key=fe104304b38f134fb117a2d5f3d4f660";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" +API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const searchURL = BASE_URL + "/search/movie?"+API_KEY;

// 6.Declaring the elements of id to a variable.
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// 7. using the function getMovies() to fetch the data from the API and use the then chaining method to getting access to the data.
function getMovies(url)
{
    fetch(url).then(res =>res.json())
    .then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}
getMovies(API_URL);

// 8.ShowMovies() function is the important function which really deals in displaying the data to the screen.
// 9.Using foreach method to access the data by iterating over all required data.

function showMovies(data){
// 10.Clearing the previously occured data by giving it to the empty string.
    main.innerHTML="";
    data.forEach(movie => {
    // 11.Using object destructuring method for accessing particular data from the json object.
        const{title,poster_path,vote_average,overview,release_date} = movie;
        const movie_date = new Date(release_date).toDateString();

        // Creating a div element and assigning it to the variable and finally appending it to the main element. 
        const movieEl = document.createElement("div");
        // adding the classList to the created element 
        movieEl.classList.add("movie");
        // Using template literal and string interpolation to display the details.
        movieEl.innerHTML = `<img src="${IMG_URL+poster_path}" alt="movie">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="release-date">Released-Date:${movie_date}</div>
        <div class="overview">
            <h3>Overview</h3>
           ${overview}
        </div>`
        main.appendChild(movieEl);
    })
}

// getcolor function is used to give the color to the rating of the movie.
function getColor(vote){
    if(vote >=8){
        return "green" 
    }
    else if(vote>=5){
        return "orange"
    }
    else{
        return "red"
    }
}
// Adding submit event to the search field to make the movie listing based on the search.
form.addEventListener("submit",(e) =>{
    e.preventDefault();

    const searchTerm=search.value;
// adding search query to the url to get the movie based on the search.
    if(searchTerm){
        getMovies(searchURL+"&query="+searchTerm);
    }
    else{
        getMovies(API_URL);
    }
})