var express = require('express');
var router = express.Router();
const axios = require('axios');
const DB_URL = "http://localhost:5984/movies/";
const DB_VIEWS = "_design/views/_view/";

// FORM
router.get('/searchMovie', (req, res) => {
    // Render the search form, nothing to pass through
    res.render('searchMovies.ejs', {});
  });
// ACTUAL SEARCHING
router.post('/searchMovie', (req, res) => {
  axios.get(DB_URL + DB_VIEWS + `searchMovie?key="${req.body.name}"`)
    .then((response) => {
      if(response.data.rows[0]) {
        // render 'search_result_movie.ejs' and pass through the actors
        console.log(response.data.rows[0].value);
        res.render('search_result_movie.ejs',  { actors: response.data.rows[0].value });
      }
      else
        // render 'search_not_found.ejs', nothing needs to pass through
        res.render('search_not_found.ejs', {});
    })
    .catch((err) => {
      console.error(err);
    });
});

// MAKE ACTOR SEARCHING
// FORM
router.get('/searchActor', (req, res) => {
  // Render the search form, nothing to pass through
  res.render('searchActors.ejs', {});
});
// ACTUAL SEARCHING
router.post('/searchActor', (req, res) => {
axios.get(DB_URL + DB_VIEWS + `searchActor`)
  .then((response) => {
    // We get returned all item as KEY('actor list') VALUE('movie name')
    var resultArray = [];

    console.log(req.body.name);
    response.data.rows.forEach(movie => {
      if(movie.key.includes(req.body.name)){
        resultArray.push(movie.value);
      }
    });

    if(resultArray[0]){
      res.render('search_result_actor.ejs', { movies: resultArray });
    } else {
      res.render('search_not_found.ejs', {});
    }
  })
  .catch((err) => {
    console.error(err);
  });
});

module.exports = router;
