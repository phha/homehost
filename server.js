var _ = require('underscore');
var figlet = require('figlet');
var fs = require('fs');
var node_dir = require('node-dir');
var bluebird = require('bluebird');
var yaml = require('js-yaml');

const path = require('path');	
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var config = yaml.safeLoad(fs.readFileSync('./config-sample.yml'));

var moviesData = require('./movies.json');
var musicData = require('./music.json'); 
var tvData = require('./tv.json'); 

app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/api/hello', (req, res) => {
  let hello = { 'homehost-demo': 'Hello', config};
  res.json(hello);
});

app.get('/api/movies', (req, res) => {
  res.json(moviesData.movies);
});

app.get('/api/music', (req, res) => {
  res.json(musicData.music)
});

app.get('/api/tv', (req, res) => {
  res.json(tvData.tv)
});

app.get('/api/movies/:id', function(req, res) {
  var movie = _.where(moviesData.movies, {id: parseInt(req.params.id)});
  res.json(movie);
});

app.get('/api/music/albums/:id', function(req, res) {
  var album = _.where(musicData.music, {id: req.params.id});
  res.json(album);
});

app.get('/api/tv/seasons/:id', function(req, res) {
  var season = _.where(tvData.tv, {id: req.params.id});
  res.json(season);
});

// send the user to the index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/public/index.html'));
});

/**
 * Demo omitted:
 *  BASE_URL/music, BASE_URL/movies stream endpoints
 *  generateMetaData functions
 */

console.log(figlet.textSync('homehost-demo', 
  {
    font: 'Larry 3D',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }
));

app.listen(port, () => console.log(`Listening on port ${port}`));