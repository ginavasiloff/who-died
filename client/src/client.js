(function () {
  const movieApiKey = 'TODO'
  const movieDbUrl = 'https://api.themoviedb.org/3'
  async function handleSubmit(e) {
    e.preventDefault()
    const title = document.getElementById('search-input').value
    fetch(`${movieDbUrl}/search/movie/?api_key=${movieApiKey}&query=${title}`, { mode: 'cors' })
      .then(r => console.log(r))
      .catch(err => console.error(err))
  }

  const filmSearch = document.getElementById('film-search')
  filmSearch.addEventListener('submit', handleSubmit)
})()
