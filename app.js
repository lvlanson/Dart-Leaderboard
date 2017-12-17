var Player = function(player){
  this.player = player.player;
  this.cricket = 0;
  this.cricketGames = 0;
  this.cricketWins = 0;
  this.cricketLosses = 0;
  this.five01 = 0;
  this.five01Games = 0;
  this.five01Wins = 0;
  this.five01Losses = 0;
  this.gamesTotal = 0;
  this.winsTotal = 0;
  this.lossesTotal = 0;
};
var spielerLocation = __dirname + '/datenbank/spieler.json';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get('/favico.ico' , function(req , res){
});


app.get('/', function(req, res){
    res.render('index');
});


app.get('/:loadPage',function(req,res){
  var loadPage = req.params.loadPage;
  if(loadPage === 'konfiguration'){
    console.log('Sending konfig Data');
    require('./controller/konfig.js').getKonfigData(spielerLocation, fs)
                                     .then((data) => {
                                       console.log(data);
                                       res.render(loadPage, {data:data});
                                     })
                                     .catch((error) => {
                                       console.log("Error:" + error);
                                     });
  }else{
    res.render(loadPage);
  }

});

app.post('/addPlayer', function(req,res){
  require('./controller/addPlayer.js').addPlayer(spielerLocation, fs, req, Player);
});

app.post('/delete', function(req,res){
  require('./controller/removePlayer.js').removePlayer(spielerLocation, fs, req);
});


app.use('/assets', express.static('assets'));

app.listen(8080);
