// APP
const app = document.getElementById('app')

// PAGES
const homepage = document.getElementById('homepage')
const explore = document.getElementById('explore')
const genre = document.getElementById('genre')
const search = document.getElementById('search')
const pages = document.querySelectorAll('.page')

// TEMPLATES
const cardTemplate = document.getElementById('card-template').content
const genreTemplate = document.getElementById('genre-template').content

// SECTIONS
const genresList = explore.querySelector('.genres-list')
const moviesOnTrending = document.querySelector('.movies-on-trending')
const moviesByGenre = document.querySelector('.movies-by-genre')
const moviesBySearch = document.querySelector('.movies-by-search')

// BUTTONS
const trendingButton = homepage.querySelector('.btn-trending')
const exploreButton = homepage.querySelector('.btn-explore')
const backToHomeButton = explore.querySelector('.btn-back-to-homepage')
const backToCategoriesButton = genre.querySelector('.btn-back-to-categories')
const searchButton = homepage.querySelector('.btn-search')
const buttonPreviousSearch = search.querySelector('.btn-search-back')
const buttonNextSearch = search.querySelector('.btn-search-next')

// INPUTS
const searchInput = search.querySelector('.search-input')
