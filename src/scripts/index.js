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

function createCards(movies, container) {
    movies.forEach(movie => {
        const clone = cardTemplate.cloneNode(true)
        clone
            .querySelector('.card')
            .addEventListener(
                'click',
                () => (location.hash = `#movie=${movie.id}`)
            )

        clone.querySelector('.title').textContent = movie.title
        clone.querySelector(
            '.cover'
        ).src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        fragment.append(clone)
    })

    container.append(fragment)
}

function createGenreList(genres, container) {
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

    moviesByGenre.innerHTML = ''
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
    moviesBySearch.innerHTML = ''
    createCards(movies, moviesBySearch)
    search.querySelector('.title').textContent = query
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day')
    const movies = data.results

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
    movieGenres.innerHTML = ''
    createGenreList(movie.genres, movieGenres)
}

getTrendingMoviesPreview()
getGenresPreview()
getTrendingMovies()
