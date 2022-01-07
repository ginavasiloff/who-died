<script>
export let name
const serverUrl = 'http://localhost:8085'
export let movies = []
export let cast = []
$: isResultsListVisible = movies.length > 0
$: isCastListVisible = cast.length > 0

export async function handleSubmit(e) {
  e.preventDefault()
	cast = []
  const title = document.getElementById('search-input').value
  const response = await fetch(`${serverUrl}/who-died?q=${title}`)
	const jsonData = await response.json()
	movies = jsonData.results
	isResultsListVisible = movies.length > 0
}

export async function getMovieDetails(id) {
	const response = await fetch(`${serverUrl}/who-died/${id}`)
	const jsonData = await response.json()
	movies = []
	cast = jsonData.cast
}
</script>

<main>
	<section>
		<form id="film-search" on:submit={handleSubmit}>
			<label for="search-input">Movie or Show Name</label>
			<input id="search-input" type="search" bind:value={name} />
		</form>{#if isResultsListVisible}
			<ul>
			{#each movies as movie}
			<li><button id={movie.id} on:click|once={() => getMovieDetails(movie.id)}>{movie.title}</button></li>
			{/each}</ul>
		{/if}
		{#if isCastListVisible}
		<ul>
			{#each cast as member}
				<li class='{member.deathday ? "dead" : "alive"}'>{member.name} - {member.deathday}
					<img src={`http://api.themoviedb.org/3${member.profile_path}`} alt="" />
				</li>
			{/each}
		</ul>
		{/if}
	</section>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: auto;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	input {
		line-height: 1.5rem;
	}

	ul {
		width: 400px;
		list-style-type: none;
	}

	li {
		text-align: left;
	}

	.dead {
		color: red;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
