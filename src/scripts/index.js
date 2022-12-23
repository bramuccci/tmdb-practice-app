//  DATA
const fragment = document.createDocumentFragment()
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        api_key: API_KEY,
    },
})

let maxPage
let container
let page = 1
function* generator(i) {
    while (true) {
        i++
        yield i
    }
}

function toggleLikedMovie(movie) {
    const likedMovies = JSON.parse(localStorage.getItem('liked_movies')) || {}

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined
    } else {
        likedMovies[movie.id] = movie
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
    console.log(JSON.parse(localStorage.getItem('liked_movies')))
}

//  UTILS

const lazyLoader = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target
            const url = target.getAttribute('data-img')
            target.setAttribute('src', url)
        }
    })
})

function createCards(movies, container, cleanContainer = true) {
    if (cleanContainer) container.innerHTML = ''

    movies.forEach(movie => {
        const clone = cardTemplate.cloneNode(true)
        const card = clone.querySelector('.card')
        const cover = card.querySelector('.cover')
        const title = card.querySelector('.title')
        const likeBtn = card.querySelector('.btn')

        cover.addEventListener(
            'click',
            () => (location.hash = `#movie=${movie.id}`)
        )

        title.textContent = movie.title
        cover.setAttribute(
            'data-img',
            `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        )
        cover.setAttribute('alt', movie.title)

        lazyLoader.observe(cover)

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('btn--liked')
            toggleLikedMovie(movie)
        })

        fragment.append(clone)
    })

    container.append(fragment)
}

function createGenreList(genres, container) {
    container.innerHTML = ''

    genres.forEach(genre => {
        let { id, name } = genre
        const clone = genreTemplate.cloneNode(true)
        const anchor = clone.querySelector('a')
        anchor.textContent = name

        name = name.replace(/ /g, '-')
        anchor.addEventListener(
            'click',
            () => (location.hash = `#category=${id}-${name}`)
        )
        fragment.append(clone)
    })
    container.append(fragment)
}

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day')
    const movies = data.results.splice(0, 12)

    createCards(movies, moviesOnTrending)
}

async function getGenresPreview() {
    const { data } = await api('genre/movie/list')
    const genres = data.genres

    createGenreList(genres, genresList)
}

async function getMoviesByGenre({ id, name }) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    })
    const movies = data.results
    maxPage = data.total_pages

    createCards(movies, moviesByGenre)
    genre.querySelector('.title').textContent = name
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    })
    const movies = data.results
    createCards(movies, moviesBySearch)
    search.querySelector('.title').textContent = query
}

async function getPaginatedMovies(endpoint, params = {}, pageGenerator) {
    if (page > maxPage) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const scrollIsInBottom = scrollTop + clientHeight >= scrollHeight - 30

    if (scrollIsInBottom) {
        page = pageGenerator.next().value
        params.page = page
        const { data } = await api(endpoint, {
            params,
        })
        const movies = data.results
        createCards(movies, container, false)
    }
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day')
    const movies = data.results
    maxPage = data.total_pages

    createCards(movies, moviesOnTrendingComplete)
}

async function getMovieDetail(movieId) {
    const { data: movie } = await api(`movie/${movieId}`)
    const title = moviePage.querySelector('.title')
    const cover = moviePage.querySelector('.movie-cover')
    const description = moviePage.querySelector('.movie-description')

    title.textContent = movie.title
    description.textContent = movie.overview
    cover.src = `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`
    createGenreList(movie.genres, movieGenres)

    getRelatedMovies(movieId)
}

async function getRelatedMovies(movieId) {
    const { data } = await api(`movie/${movieId}/recommendations`)
    const relatedMovies = data.results
    createCards(relatedMovies, relatedMoviesContainer)
}

getTrendingMoviesPreview()
getGenresPreview()
getTrendingMovies()
