var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var coll;

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, database) => {
    if (err) return console.error(err);
    coll = database.db('examen').collection('overtredingen');

    /* GET ALL ITEMS */
    /*
        MONGOCLIENT -> FIND({});
    */
    router.get('/', (req, res) => {
        coll.find().toArray((err, result) => {
            if (err) return;
            res.json(result);
        });
    });

    
    /* SEARCH opnameplaats_straat */
    router.post('/searchOne', (req, res) => {
        var query = { opnameplaats_straat: req.body.opnameplaats_straat }
        coll.find(query).toArray((err, result) => {
            if (err) return;
            res.json(result);
        });
    });

    /* SEARCH aantal_overtredingen_snelheid */
    router.post('/searchTwo', (req, res) => {
        var resultArray = [];
        coll.find().toArray((err, results) => {
            if (err) return;
            
            results.forEach(result => {
                if(result.aantal_overtredingen_snelheid >= req.body.aantal_overtredingen_snelheid){
                    resultArray.push(result);
                }
            });

            res.json(resultArray);
        });
    });
});

module.exports = router;
