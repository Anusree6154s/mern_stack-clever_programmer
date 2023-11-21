/* 
🌟 APP: Make Netflix

Here we have the Netflix app but it's up to you to make it work by pulling all the movies using an API!

Create a fetchMovies() function that will make a dynamic API call to what you need 👇
========================================

- fetchMovies()

** fetchMovies takes in an URL, a div id or class from the HTML, and a path (poster or backdrop)



These are the 3 main functions and their URL'S you must create  👇
========================================

- getOriginals()
  * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

- getTrendingNow()
  * URL : 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

- getTopRated()
  * URL : 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'


** These functions will provide the URL you need to fetch() movies of that genere **

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 CLASS 👉 'original__movies' = Div that holds Netflix Originals
#2 ID 👉 'trending' = Div that holds trending Movies
#3 ID 👉 'top_rated' = Div that holds top rated Movies
*/

// Call the main functions the page is loaded
window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
  getNewReleases()
  getTopSearches()

  console.log("wishlistObject.results.length: " + wishlistObject.results.length)
  const wishlist = document.querySelector('.wishlistDiv');
  wishlist.style.display = 'none';
}

var id
var jsonMovie
let wishlistObject = {
  results: []
}
const defaultTrailer = [
  {
    "iso_639_1": "en",
    "iso_3166_1": "US",
    "name": "New Trailer",
    "key": "uYPbbksJxIg",
    "site": "YouTube",
    "size": 1080,
    "type": "Trailer",
    "official": true,
    "published_at": "2023-05-08T07:01:04.000Z",
    "id": "6458a73277d23b0170372259"
  },
  {
    "iso_639_1": "en",
    "iso_3166_1": "US",
    "name": "Official Trailer",
    "key": "bK6ldnjE3Y0",
    "site": "YouTube",
    "size": 1080,
    "type": "Trailer",
    "official": true,
    "published_at": "2022-12-19T00:29:01.000Z",
    "id": "639fb365223e20007d3d3618"
  }
]
// ** Helper function that makes dynamic API calls **
// path_type 👉 (backdrop, poster)
// dom_element 👉 (trending, top rated)
// fetchMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1', 'top_rated', 'backdrop_path')
function fetchMovies(url, dom_element, path_type, background_img) {
  // Use Fetch with the url passed down 

  fetch(url).then((res) => res.json()).then((data) => {
    showMovies(data, dom_element, path_type, background_img)
  })

  // Within Fetch get the response and call showMovies() with the data , dom_element, and path type
}

//  ** Function that displays the movies to the DOM **
showMovies = (movies, dom_element, path_type, background_img) => {


  // Create a variable that grabs id or class (dom_element)
  var moviesEl = document.querySelector(dom_element)

  // Clear the display element if dom_element is "#wishlist"
  if (dom_element === "#wishlist") {
    moviesEl.innerHTML = '';
  }

  // console.log(movies.result)
  // insert movies into each img element of every section
  for (var movie of movies.results) {
    console.log("movie: ")
    console.log(movie)

    // Within loop create an img element
    var imageElement = document.createElement('img')

    // Set attributes to imageElement
    imageElement.setAttribute('movie', JSON.stringify(movie)) //convert json object movie to string version of movie before storing
    imageElement.setAttribute('background-img', `https://image.tmdb.org/t/p/original${movie[background_img]}`)
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`

    // Add event listener to handleMovieSelection() onClick of imageElement
    imageElement.addEventListener('click', e => {
      handleMovieSelection(e)
    })

    // Append the imageElement to the dom_element selected
    moviesEl.appendChild(imageElement)
  }

}

const handleMovieSelection = e => {
  const movie = e.target.getAttribute('movie')
  jsonMovie = JSON.parse(movie) //convert the string movie back to json
  const backgroundImg = e.target.getAttribute('background-img')

  console.log("jsonMovie after handleMovieSelection(e): ")
  console.log(jsonMovie)

  if (jsonMovie.title) {
    document.querySelector(".title").innerHTML = jsonMovie.title
  } else {
    document.querySelector(".title").innerHTML = jsonMovie.name
  }


  // Select the .featured element
  const featuredElement = document.querySelector('.image');
  // Set the background image using linear gradient and the image, and other background properties
  featuredElement.style.backgroundImage = `linear-gradient(to right, black, transparent 10%), url(${backgroundImg})`;
  featuredElement.style.backgroundSize = 'cover';
  featuredElement.style.backgroundPosition = 'center 20%';
  featuredElement.style.backgroundRepeat = 'no-repeat';

  if (!wishlistObject.results.some(objects => objects.id === jsonMovie.id)) {
    // If not, change to plus my list
    console.log("this movie is not added to wishlist. therefore plus sign")
    document.querySelector(".button__mylist").innerHTML = `<i class="fas fa-plus"></i> My List`
  } else {
    // If it already exists, change to check my list
    console.log("this movie is already added to wishlist. therefore check sign")
    document.querySelector(".button__mylist").innerHTML = `<i class="fas fa-check"></i> My List`
  }
}

// Add event listener to the ".button__trailer"
document.querySelector(".button__trailer").addEventListener('click', async () => {
  if (jsonMovie.id) {
    const data = await getMovieTrailer(jsonMovie.id);
    if (data.results) {
      const result = data.results
      const youtubeTrailers = result.filter(result => result.site === 'YouTube' && result.type === 'Trailer');
      // Call setTrailer when the button is clicked
      setTrailer(youtubeTrailers);
    } else {
      setTrailer(data);
    }
  } else {
    // set default trailer of oppenheimer
    setTrailer(defaultTrailer);
  }
});

document.querySelector(".button__mylist").addEventListener('click', () => {
  console.log("jsonMovie: ")
  console.log(jsonMovie)
  console.log("jsonMovie.id: ")
  console.log(jsonMovie.id)
  // Check if the selected movie ID is not already in the array
  // console.log("wishlist.results")
  if (!wishlistObject.results.some(objects => objects.id === jsonMovie.id)) {
    // If not, add it to the array
    wishlistObject.results.push(jsonMovie);
    console.log(`Added movie ${jsonMovie} to My List`);
    document.querySelector(".button__mylist").innerHTML = `<i class="fas fa-check"></i> My List`
    console.log("this movie is just added to wishlist. therefore check sign")


    getWishList()
    const wishlist = document.querySelector('.wishlistDiv');
    wishlist.removeAttribute('style');

  } else {
    // If it already exists, you might want to remove it or handle it accordingly
    let indexToRemove = wishlistObject.results.findIndex(obj => obj.id === jsonMovie.id);
    wishlistObject.results.splice(indexToRemove, 1);
    console.log(`Removed movie ${jsonMovie} from My List`);
    document.querySelector(".button__mylist").innerHTML = `<i class="fas fa-plus"></i> My List`
    console.log("this movie is just removed from wishlist. therefore plus sign")

    if (wishlistObject.results.length === 0) {
      const wishlist = document.querySelector('.wishlistDiv');
      wishlist.style.display = 'none';
    } else {
      getWishList()
    }
  }
});

// ** Function that fetches Netflix Originals **
function getOriginals() {
  var url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '.original__movies', 'poster_path', 'backdrop_path')
}

// ** Function that fetches Trending Movies **
function getTrendingNow() {
  var url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#trending', 'backdrop_path', 'backdrop_path')
}

// ** Function that fetches Top Rated Movies **
function getTopRated() {
  var url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(url, '#top_rated', 'backdrop_path', 'backdrop_path')
}

// ** Function that fetches New Releases **
function getNewReleases() {
  var url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045&page=2'
  fetchMovies(url, '#new_releases', 'backdrop_path', 'backdrop_path')
}

// ** Function that fetches Top Searches **
function getTopSearches() {
  var url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=2'
  fetchMovies(url, '#top_searches', 'backdrop_path', 'backdrop_path')
}

// ** Function that fetches WishList Movies **
function getWishList() {
  console.log("wishlistObject.results: ")
  console.log(wishlistObject.results)
  console.log("wishlistObject: ")
  console.log(wishlistObject)
  showMovies(wishlistObject, '#wishlist', 'backdrop_path', 'backdrop_path')
  // insertMovies(wishlistObject.results)

}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  //URL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`);
  return res.json()
}


// ** Function that adds movie data to the DOM
const setTrailer = trailers => {
  // Set up iframe variable to hold id of the movieTrailer Element
  const iframe = document.getElementById('movieTrailer')

  // Set up variable to select .movieNotFound element
  const movieNotFound = document.querySelector('.movieNotFound')

  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    movieNotFound.classList.add('d-none')
    iframe.classList.remove('d-none')
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
    // add youtube link with trailers key to iframe.src
  } else {
    iframe.classList.add('d-none')
    movieNotFound.classList.remove('d-none')
  }

  // open modal
  $('#trailerModal').modal('show')
}

