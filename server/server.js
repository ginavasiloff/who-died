import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const key = process.env.MOVIE_DB_API_KEY

const movieDbApiUrl = process.env.MOVIE_DB_API_URL
const movieDbApiUrlCast = process.env.MOVIE_DB_API_URL_CAST
app.use(express.json())
app.use(cors())

app.get('/who-died', async (req, res) => {
  const url = `${movieDbApiUrl}/search/movie/?api_key=${key}&query=${req.query?.q}`
  const data = await fetch(url)
  const result = await data.json()
  res.send(result)
})

app.get('/who-died/:id', async (req, res) => {
  const movieId = req.params.id
  const creditsUrl = `${movieDbApiUrl}/movie/${movieId}/credits?api_key=${key}`
  const response = await fetch(creditsUrl)
  const data = await response.json()
  const final = data.cast.reduce( (all, current) => {
   return [...all, current]
  },[])
  const test = await getIndividualDetails(final)
  res.send({ cast: test})
})

async function getIndividualDetails(people) {
  return await Promise.all(people.map(async p => {
    const memberUrl = `${movieDbApiUrlCast}/person/${p.cast_id}?api_key=${key}`
    const memberResponse = await fetch(memberUrl)
    return await memberResponse.json()
  }))
}

const server = app.listen(8085, 'localhost', () => {
  const { address, port } = server.address()
  console.log(`server listening on http://${address}:${port}`)
})
