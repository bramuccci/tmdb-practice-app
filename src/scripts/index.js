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
        const clone = genreTemplate.cloneNode(true)
        clone.querySelector('li').textContent = genre.name
        fragment.append(clone)
    })

    genresList.append(fragment)
}

getTrendingMoviesPreview()
getGenresPreview()
