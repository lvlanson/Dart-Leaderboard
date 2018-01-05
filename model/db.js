var mongoose = require('mongoose'),
    dbURI = 'mongodb://dartmaster:DartMaster123@ds131997.mlab.com:31997/dart-leaderboard';

/*********************************************
              CONNECTION SETUP
*********************************************/
mongoose.connect(dbURI, function(err){
  if(!err){
    console.log('Connected to the Dartleaderboard Database');
  }
});

/*********************************************
              DATABASE CONNECTION
                    EVENTS
*********************************************/

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/*this.player = player.player;
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
};*/
