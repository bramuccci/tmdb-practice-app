window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {
    if (location.hash.startsWith('#trends')) console.log('Trends')
    if (location.hash.startsWith('#search')) console.log('Search')
    if (location.hash.startsWith('#movie')) console.log('Movie')
    if (location.hash.startsWith('#category')) console.log('Categories!')
    if (!location.hash) console.log('home')
}
