var Player = function(player){
  this.player = player.player;
  this.cricket = 0;
  this.cricketGames = 0;
  this.cricketWins = 0;
  this.cricketLosses = 0;
  this.cricketWinrate = this.cricketGames/this.cricketWins;
  this.five01 = 0;
  this.five01Games = 0;
  this.five01Wins = 0;
  this.five01Losses = 0;
  this.five01Winrate = this.five01Games/this.five01Wins;
  this.gamesTotal = 0;
  this.winsTotal = 0;
  this.lossesTotal = 0;
  this.winrateTotal = this.games/this.wins;
};

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
  res.render(loadPage);
});
app.post('/addPlayer', function(req,res){
  var player = new Player(req.body);
  fs.readStream(__dirname + '/datenbank/spieler.txt',req.body,function(err){
    if (err){
      throw err;
    }
    console.log("New Player has been added!");
  });
});
app.use('/assets', express.static('assets'));

app.listen(3000);
