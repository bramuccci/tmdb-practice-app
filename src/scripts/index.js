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

        clone.querySelector('.title').textContent = movie.title
        clone.querySelector(
            '.cover'
        ).src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

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

    genres.forEach(genre => {
        let { id, name } = genre
        name = name.replace(/ /g, '-')
        const clone = genreTemplate.cloneNode(true)
        const anchor = clone.querySelector('a')
        anchor.textContent = genre.name
        anchor.addEventListener(
            'click',
            () => (location.hash = `#category=${id}-${name}`)
        )
        fragment.append(clone)
    })

    genresList.append(fragment)
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

getTrendingMoviesPreview()
getGenresPreview()
