'use strict';
const express = require('express');
const movieData = require('./Movie Data/data.json');
const app = express();
const port = 3005;

app.get('/', moviesHandler);

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



app.get('/favorite', favoriteHandler);

function favoriteHandler(req,res){

    res.send("Welcome to Favorite Page")
}




app.listen(port, () => {
    console.log(`port:${port}`);
})
