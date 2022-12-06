window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

trendingButton.addEventListener('click', () => (location.hash = '#trends'))
exploreButton.addEventListener('click', () => (location.hash = '#categories'))
backToHomeButton.addEventListener('click', () => (location.hash = ''))
backToCategoriesButton.addEventListener(
    'click',
    () => (location.hash = '#categories')
)
searchButton.addEventListener('click', () => (location.hash = '#search'))
searchInput.addEventListener(
    'change',
    e => (location.hash = `#search=${e.target.value}`)
)

const pages = document.querySelectorAll('.page')

function navigator() {
    pages.forEach(page => page.classList.remove('active'))
    // if (location.hash.startsWith('#movie')) console.log('Movie')
    if (location.hash.startsWith('#search')) printSearch()
    if (location.hash.startsWith('#trends')) printTrending()
    if (location.hash.startsWith('#categories')) printExplore()
    if (location.hash.startsWith('#category')) printMoviesByGenre()
    if (!location.hash) printHomepage()
}

function printHomepage() {
    homepage.classList.add('active')
}

function printTrending() {
    console.log('More trends')
}

function printExplore() {
    explore.classList.add('active')
}

function printMoviesByGenre() {
    genre.classList.add('active')
    const regex = /category=(\d+)-(.*)/
    const genreData = regex.exec(location.hash)
    getMoviesByGenre({ id: genreData[1], name: genreData[2] })
}

function printSearch() {
    search.classList.add('active')
    const regex = /^#search=(.+)$/
    let query = regex.exec(location.hash)
    if (!query) return
    query = query[1]
    getMoviesBySearch(query)
}
