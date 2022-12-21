for (let i = 0; i < 12; i++) {
    moviesOnTrending.append(cardSkeletonTemplate.cloneNode(true))
    moviesByGenre.append(cardSkeletonTemplate.cloneNode(true))
    moviesBySearch.append(cardSkeletonTemplate.cloneNode(true))
    moviesOnTrendingComplete.append(cardSkeletonTemplate.cloneNode(true))
    relatedMoviesContainer.append(cardSkeletonTemplate.cloneNode(true))
}

for (let i = 0; i < 18; i++) {
    genresList.append(genreSkeletonTemplate.cloneNode(true))
}

for (let i = 0; i < 3; i++) {
    movieGenres.append(genreSkeletonTemplate.cloneNode(true))
}
