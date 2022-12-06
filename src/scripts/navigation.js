window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

trendingButton.addEventListener('click', () => (location.hash = '#trends'))
exploreButton.addEventListener('click', () => (location.hash = '#categories'))
backToHomeButton.addEventListener('click', () => (location.hash = ''))
backToCategoriesButton.addEventListener(
    'click',
    () => (location.hash = '#categories')
)

const pages = document.querySelectorAll('.page')

function navigator() {
    pages.forEach(page => page.classList.remove('active'))
    // if (location.hash.startsWith('#search')) console.log('Search')
    // if (location.hash.startsWith('#movie')) console.log('Movie')
    if (location.hash.startsWith('#trends')) printTrending()
    if (location.hash.startsWith('#categories')) printExplore()
    if (location.hash.startsWith('#category')) printMoviesByGenre()
    if (!location.hash) printHomepage()
}

function printHomepage() {
    homepage.classList.add('active')
}

function printTrending() {}

function printExplore() {
    explore.classList.add('active')
}

function printMoviesByGenre() {
    genre.classList.add('active')
    const regex = /category=(\d+)-(.*)/
    const genreData = regex.exec(location.hash)
    getMoviesByGenre({ id: genreData[1], name: genreData[2] })
}
