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

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day')
    const movies = data.results.splice(0, 12)

    movies.forEach(movie => {
        const clone = cardTemplate.cloneNode(true)

        clone.querySelector('.title').textContent = movie.title
        clone.querySelector(
            '.cover'
        ).src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        fragment.append(clone)
    })

    moviesOnTrending.append(fragment)
}

async function getGenresPreview() {
    const { data } = await api('genre/movie/list')
    const genres = data.genres

    genres.forEach(genre => {
        const { id, name } = genre
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

    movies.forEach(movie => {
        const clone = cardTemplate.cloneNode(true)

        clone.querySelector('.title').textContent = movie.title
        clone.querySelector(
            '.cover'
        ).src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

        fragment.append(clone)
    })

    moviesByGenre.append(fragment)
    genre.querySelector('.title').textContent = name
}

getTrendingMoviesPreview()
getGenresPreview()
