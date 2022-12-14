// APP
const app = document.getElementById('app')

// PAGES
const homepage = document.getElementById('homepage')
const explore = document.getElementById('explore')
const genre = document.getElementById('genre')
const search = document.getElementById('search')
const trends = document.getElementById('trends')
const moviePage = document.getElementById('movie')
const pages = document.querySelectorAll('.page')

// TEMPLATES
const cardTemplate = document.getElementById('card-template').content
const genreTemplate = document.getElementById('genre-template').content

// SECTIONS
const genresList = explore.querySelector('.genres-list')
const moviesOnTrending = document.querySelector('.movies-on-trending')
const moviesByGenre = document.querySelector('.movies-by-genre')
const moviesBySearch = document.querySelector('.movies-by-search')
const moviesOnTrendingComplete = document.querySelector(
    '.movies-on-trending-complete'
)
const movieGenres = moviePage.querySelector('.movie-genres')
const relatedMoviesContainer = moviePage.querySelector('.related-movies')
const favoritesMovies = homepage.querySelector('.favorites-movies')

// BUTTONS
const trendingButton = homepage.querySelector('.btn-trending')
const exploreButton = homepage.querySelector('.btn-explore')
const backToHomeButtons = document.querySelectorAll('.btn-back-to-homepage')
const backToCategoriesButton = genre.querySelector('.btn-back-to-categories')
const searchButton = homepage.querySelector('.btn-search')
const buttonPreviousSearch = search.querySelector('.btn-search-back')
const buttonNextSearch = search.querySelector('.btn-search-next')

// INPUTS
const searchInput = search.querySelector('.search-input')

// SKELETON
const cardSkeletonTemplate = document.getElementById(
    'card-skeleton-template'
).content

const genreSkeletonTemplate = document.getElementById(
    'genre-skeleton-template'
).content
