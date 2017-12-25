function updateStats(game, score, rank, playerData){
  if(game === 'cricket'){
    return updateCricket(score, rank, playerData);
  }else{
    return update501(score, rank, playerData);
  }
}
function updateCricket(score, rank, playerData){
  playerData.cricketScoreSum += score;
  playerData.cricketGames++;
  playerData.gamesTotal++;
  if(rank === 1){
    playerData.cricketWins++;
    playerData.winsTotal++;
  }else{
    playerData.cricketLosses++;
    playerData.lossesTotal++;
  }
  if(playerData.hasNotPlayed === true){
    playerData.hasNotPlayed = false;
    playerData.cricketRank = rank;
    playerData.cricketScoreRel = score;
  }else{
    playerData.cricketRank = (playerData.cricketRank+rank)/2;
    playerData.cricketScoreRel = (playerData.cricketScoreRel+score)/2;
  }
  playerData.winrateTotal = playerData.winsTotal/playerData.gamesTotal*100;
  playerData.cricketWinrate = playerData.cricketWins/playerData.cricketGames*100;
  return playerData;
}
function update501(score, rank, playerData){
  playerData.five01ScoreSum += score;
  playerData.five01Games++;
  playerData.gamesTotal++;
  if(rank === 1){
    playerData.five01Wins++;
    playerData.winsTotal++;
  }else{
    playerData.five01Losses++;
    playerData.lossesTotal++;
  }
  if(playerData.hasNotPlayed === true){
    playerData.hasNotPlayed = false;
    playerData.five01Rank = rank;
    playerData.five01ScoreRel = score;
  }else{
    playerData.five01Rank = (playerData.five01Rank+rank)/2;
    playerData.five01ScoreRel = (playerData.five01ScoreRel+score)/2;
  }
  playerData.winrateTotal = playerData.winsTotal/playerData.gamesTotal*100;
  playerData.five01Winrate = playerData.five01Wins/playerData.five01Games*100;
  return playerData;
}

exports.pushUpdate = function(fs, pushData, spielerLocation){
  fs.readFile(spielerLocation, function(err, fileJSON){

    var file = JSON.parse(fileJSON);
    var updateLength = pushData.names.length;
    var fileLength = file.length;

    for(var i = 0; i<updateLength; i++){
      var updateName = pushData.names[i];

      for(var j = 0; j<fileLength; j++){
        var findName = file[j].player;
        if(updateName === findName){
          var rank = parseInt(pushData.ranks[i]);
          var score = parseInt(pushData.points[i]);
          var game = pushData.game;
          file[j] = updateStats(game, score, rank, file[j]);
        }
      }
    }
    var writeFile = JSON.stringify(file);
    fs.writeFile(spielerLocation, writeFile);
  });
}
