<script lang="ts">
export let name
const serverUrl = 'http://localhost:8085'
export let movies = []
export let cast = []
$: isResultsListVisible = movies.length > 0
$: isCastListVisible = cast.length > 0

export async function handleSubmit(e) {
  e.preventDefault()
	cast = []
	const input = <HTMLInputElement>document.getElementById('search-input')
  const title = input.value
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
			<li id={movie.id} on:click|once={() => getMovieDetails(movie.id)}>
				<img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt="" />
				<div class="details">
					<span class="title">{movie.title}</span>
					<span class="year">{movie.release_date}</span>
				</div>
			</li>
			{/each}</ul>
		{/if}
		{#if isCastListVisible}
		<ul>
			{#each cast as member}
				<li class='{member.deathday ? "dead" : "alive"}'>
					<img src={`https://image.tmdb.org/t/p/w92${member.profile_path}`} alt="" />
						<div class="details"><span class="title">{member.name}</span>
						<span class="year">{member.deathday}</span></div>
				</li>
			{/each}
		</ul>
		{/if}
	</section>
</main>

<style>
	:root {
		background-color: #000000;
	}
	main {
		color: #f3e9e7;
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
    border: 1px solid #f3e9e7;
		display: flex;
		align-items: center;
		column-gap: 1rem;
	}

 li img {
		height: 4.5rem;
	}

	li .title {
		align-self: middle;
	}

	.dead .year {
		color: red;
	}

	li:hover {
		cursor: pointer;
	}

	.details {
		display: flex;
		flex-direction: column;
	}

	.details .year {
		font-size: 0.8rem;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
