const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        api_key: API_KEY,
    },
})

const fragment = document.createDocumentFragment()
const cardTemplate = document.getElementById('card-template').content
const moviesOnTrending = document.querySelector('.movies-on-trending')

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

getTrendingMoviesPreview()

const genresList = document.querySelector('.genres-list')
const genreTemplate = document.getElementById('genre-template').content

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

getGenresPreview()
