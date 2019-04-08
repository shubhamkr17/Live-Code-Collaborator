var express = require('express');
var router = express.Router();

var request = require('request');


/* GET users listing. */
router.post('/compile', function(req, res) {
    var program = {
        script : req.body.source,
        stdin : req.body.input,
        language: req.body.lang,
        versionIndex: "0",
        clientId: "51f52d14c3847b83943decaeb14ae413",
        clientSecret:"2816a76d03e180c14b8b2bdd6c219fb66a475a73a5d46fb3c208555af98e3870"
    };
    request({
        url: 'https://api.jdoodle.com/execute',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        var resObj = {
            error : error,
            response : response,
            body : body
        }
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.send(resObj);
    });
    
});

module.exports = router;