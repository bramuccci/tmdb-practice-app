// APP
const app = document.getElementById('app')

// PAGES
const homepage = document.getElementById('homepage')
const explore = document.getElementById('explore')
const genre = document.getElementById('genre')

// TEMPLATES
const cardTemplate = document.getElementById('card-template').content
const genreTemplate = document.getElementById('genre-template').content

// SECTIONS
const genresList = explore.querySelector('.genres-list')
const moviesOnTrending = document.querySelector('.movies-on-trending')
const moviesByGenre = document.querySelector('.movies-by-genre')

// BUTTONS
const trendingButton = homepage.querySelector('.btn-trending')
const exploreButton = homepage.querySelector('.btn-explore')
const backToHomeButton = explore.querySelector('.btn-back-to-homepage')
const backToCategoriesButton = genre.querySelector('.btn-back-to-categories')
