'use strict';
const express = require('express');
const cors = require ('cors');
const axios = require('axios');
require('dotenv').config();
const movieData = require('./Movie Data/data.json');
const app = express();
const port = process.env.port;

app.get('/', moviesHandler);
app.get('/favorite', favoriteHandler);
app.get('/trending', trendingHandler);
app.get('/search',searchHandler);
app.get('/upComingMovie',upComingMovieHandler);
app.get('/nowPlaying',nowPlayingHandler)
app.get('*',handleNotFoundError);
app.use(cors())



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

function favoriteHandler(req,res){

    res.send("Welcome to Favorite Page")

}
function trendingHandler(req,res){
    let trendingMovie = req.query.name;

    let url= `https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US`;
    // let result={};
        // let trendingMovie = new Movie (movieData.id,movieData.title,movieData.release_date,movieData.poster_path,movieData.overview);
        // let result= trendingMovie;
    axios.get(url)
    .then((result)=>{
        // res.json(result);
        let trendingMovie = result.data.results.map((trending)=>{
            return new Requets(trending.id, trending.title,trending.release_date,trending.poster_path,trending.overview)
        })
        res.json(trendingMovie);
    })
       
    .catch((err)=>{
        res.send("Error");
    })
}

function searchHandler (req,res){
    let movieName = req.query.name;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2`;
    axios.get(url)
    .then((result)=>{

        let dataSearch = result.data.results.map((search)=>{
            return new Requets(search.id, search.title,search.release_date,search.poster_path,search.overview)
        })
        res.json(dataSearch);
    })
    .catch((err)=>{
        res.send("Error");
    })

} 

function nowPlayingHandler (req,res){

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=326b8311b1e8a565cab3b10b651c097b&language=en-US&page=1`;
    axios.get(url)
    .then((result)=>{

        let datanowPlaying = result.data.results.map((now)=>{
            return new Requets(now.title,now.overview)
        })

        res.json(datanowPlaying);
    })
    .catch((err)=>{
        res.send("Error");
    })

} 


function upComingMovieHandler (req,res){

    let url = `https://api.themoviedb.org/3/search/movie?api_key=326b8311b1e8a565cab3b10b651c097b&language=en-US&query=The&page=2`;
    axios.get(url)
    .then((result)=>{

        let dataUpcomingMovie = result.data.results.map((up)=>{
            return new Requets(up.title,up.overview)
        })

        res.json(dataUpcomingMovie);
    })
    .catch((err)=>{
        res.send("Error");
    })

} 

function Movie(title,poster_path,overview,id,release_date){
    
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
    this.id=id;
    this.release_date=release_date;
}








app.listen(port, () => {
    console.log(`port:${port}`);
})
