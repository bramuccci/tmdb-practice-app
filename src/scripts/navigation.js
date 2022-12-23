window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

trendingButton.addEventListener('click', () => (location.hash = '#trends'))
exploreButton.addEventListener('click', () => (location.hash = '#categories'))
backToCategoriesButton.addEventListener(
    'click',
    () => (location.hash = '#categories')
)
searchButton.addEventListener('click', () => (location.hash = '#search'))
searchInput.addEventListener('change', e => {
    let value = e.target.value.replace(/ /g, '-')
    location.hash = `#search=${value}`
})
buttonPreviousSearch.addEventListener('click', () => history.back())
buttonNextSearch.addEventListener('click', () => history.forward())
backToHomeButtons.forEach(button =>
    button.addEventListener('click', () => (location.hash = ''))
)

function navigator() {
    pages.forEach(page => page.classList.remove('active'))
    if (location.hash.startsWith('#movie')) printMovie()
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
    trends.classList.add('active')
    container = moviesOnTrendingComplete
    const page = generator(1)
    document.onscroll = () => getPaginatedMovies('trending/movie/day', {}, page)
}

function printExplore() {
    explore.classList.add('active')
}

function printMoviesByGenre() {
    genre.classList.add('active')
    const regex = /category=(\d+)-(.*)/
    const genreData = regex.exec(location.hash)
    const id = genreData[1]
    const name = genreData[2]

    container = moviesByGenre
    getMoviesByGenre({ id, name })
    const page = generator(1)

    document.onscroll = () =>
        getPaginatedMovies('discover/movie', { with_genres: id }, page)
}

function printSearch() {
    search.classList.add('active')
    const regex = /^#search=(.+)$/
    let query = regex.exec(location.hash)
    if (!query) return
    query = query[1].replace(/\-/g, ' ')
    getMoviesBySearch(query)
}

function printMovie() {
    moviePage.classList.add('active')
    const regex = /^#movie=(.+)$/
    let movieId = regex.exec(location.hash)[1]
    getMovieDetail(movieId)
}
