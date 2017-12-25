var Player = function(player){
  this.player = player.player;
  this.cricketScoreSum = 0;
  this.cricketScoreRel = 0;
  this.cricketGames = 0;
  this.cricketWins = 0;
  this.cricketLosses = 0;
  this.cricketRank = 0;
  this.cricketWinrate = 0;
  this.five01ScoreSum = 0;
  this.five01ScoreRel = 0;
  this.five01Games = 0;
  this.five01Wins = 0;
  this.five01Losses = 0;
  this.five01Rank = 0;
  this.five01Winrate = 0;
  this.gamesTotal = 0;
  this.winsTotal = 0;
  this.lossesTotal = 0;
  this.winrateTotal = 0;
  this.hasNotPlayed = true;
};

var response = {
    status  : 200,
    success : 'Updated Successfully'
};

var spielerLocation = __dirname + '/datenbank/spieler.json';
var logLocation = __dirname + '/datenbank/log.json';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var favicon = require('serve-favicon');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.post('/pushUpdate', function(req,res){
  var data = req.body;
  console.log(data);
  require('./controller/log.js').logEvent(logLocation, fs, data, 'pushUpdate');
  require('./controller/pushUpdate.js').pushUpdate(fs, data, spielerLocation);
  res.json(response);
});

app.post('/updateGamePage', function(req,res){
  console.log(req.body);
  let names = req.body.names;
  let game = req.body.game;
  if(names){
    if(game==='cricket'){
      res.render('updateCricket', {names: names});
    }else{
      res.render('update501', {names: names});
    }
  }

});

app.post('/addPlayer', function(req,res){
  var data = req.body;
  require('./controller/addPlayer.js').addPlayer(spielerLocation, fs, req, Player);
  require('./controller/log.js').logEvent(logLocation, fs, data, 'addPlayer');
  res.json(response);
});

app.post('/delete', function(req,res){
  var data = req.body;
  require('./controller/removePlayer.js').removePlayer(spielerLocation, fs, req);
  require('./controller/log.js').logEvent(logLocation, fs, data, 'delete');
  res.json(response);
});

app.post('/passwort', function(req,res){
  console.log(req.body.data);
  var passwort = 'NudelSack';
  if(req.body.data === passwort){
    console.log('access');
    require('./controller/konfig.js').getKonfigData(spielerLocation, fs)
                                     .then((data) => {
                                       //console.log(data);
                                       res.render('konfiguration', {data:data});
                                     })
                                     .catch((error) => {
                                       console.log("Error:" + error);
                                     });
  }else{
    console.log('denied');
    res.render('denied');
  }
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/:loadPage',function(req,res){
  var loadPage = req.params.loadPage;
  if(isPageName(loadPage)){
    console.log('Sending ' + loadPage + ' page');
    require('./controller/konfig.js').getKonfigData(spielerLocation, fs)
                                     .then((data) => {
                                       //console.log(data);
                                       res.render(loadPage, {data:data});
                                     })
                                     .catch((error) => {
                                       console.log("Error:" + error);
                                     });
  }else{
    res.render(loadPage);
  }

});


app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));

app.listen(process.env.PORT || 8080);

function isPageName(name){
  if (name === 'konfiguration' || name === 'cricket' || name === '501' || name === 'update' || name === 'spieler'){
    return true;
  }else{
    return false;
  }
}
