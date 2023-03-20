'use strict';
const express = require('express');
const movieData = require('./Movie Data/data.json');
const app = express();
const port = 3005;

app.get('/', moviesHandler);
app.get('/favorite', favoriteHandler);
app.get('*',handleNotFoundError);



function handleNotFoundError(req,res){
    res.status(404).send("Not Found")
}

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


function moviesHandler(req,res){

    let result={};
    let newMovie = new Movie (movieData.title,movieData.poster_path,movieData.overview);
    result= newMovie;
    res.json(result);
}
function Movie(title,poster_path,overview){
    
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}




function favoriteHandler(req,res){

    res.send("Welcome to Favorite Page")
}




app.listen(port, () => {
    console.log(`port:${port}`);
})
