'use strict';

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const key = 'c09021b86145f685d6204dd7cf1ca3d5';
const movieDbUrl = 'http://api.themoviedb.org/3';
app.use(express.json());
app.use(cors());


app.get('/who-died', async (req, res) => {
  const url = `${movieDbUrl}/search/movie/?api_key=${key}&query=${req.query?.q}`;
  fetch(url, (err, meta, body) => {
    res.send(body.toString());
  });
});
console.log("test");
app.get('/who-died/:id', async (req, res) => {
  const movieId = req.params.id;
  const creditsUrl = `${movieDbUrl}/movie/${movieId}/credits?api_key=${key}`;
  const response = await fetch(creditsUrl);
  res.send(response.body);
  // const castDetails = await credits?.cast.reduce( async (members, member) =>{
  //   const memberUrl = `${movieDbUrl}/person/${member.id}/?api_key=${key}`
  //   const results = await fetchUrl(memberUrl, (err, meta, body) => {
  //     return body.toString()
  //   })
  //   return [...members, results]
  // },[])
  // res.send({ cast: castDetails})
});

const server = app.listen(8085, 'localhost', () => {
  const { address, port } = server.address();
  console.log(`server listening on http://${address}:${port}`);
});
