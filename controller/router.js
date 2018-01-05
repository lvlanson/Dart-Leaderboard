const response = {
                  status  : 200,
                  success : 'Updated Successfully'
                 },
      errorMessage = '<p>Ein Fehler ist passiert</p><p>Bitte versuche es nochmal oder benachrichtige den Admin.</p>',
      log = require('./log'),
      get = require('./get'),
      model = require('../model/schema');

/*==========================================================
                      ADDING PLAYER TO DATABASE
==========================================================*/

exports.addPlayer = function(req, res){

  /**********************************************************
                        LOGGING EVENT
  **********************************************************/

  log.logEvent(req.body, 'addPlayer');

  /**********************************************************
                        ADDING PLAYER
                         TO DATABASE
  **********************************************************/
  var name = req.body.player;
  console.log(name);
  model.Player.create({
    player: name,
  },function(err, data){
    if(!err){
      console.log(data.player + " has been added to the database!");
      res.send('<p>'+name+' wurde hinzugefügt!</p>');
    }else{
      console.log(err);
      if(err.code===11000){
        res.send('<p>Spieler existiert bereits</p>');
      }else{
        res.send(errorMessage);
      }
    }
  });
};
/*========================================================
                  REMOVING PLAYER FROM
                        DATABASE
========================================================*/
exports.removePlayer = function(req, res){

  /**********************************************************
                        LOGGING EVENT
  **********************************************************/

  log.logEvent(req.body, 'removePlayer');

  /**********************************************************
                        REMOVING PLAYER
  **********************************************************/

  var removePlayer = req.body.name;
  var model = require('../model/schema');
  model.Player.findOne({player: removePlayer}, function(err, player){
    if(err){
      console.log(err);
      res.send(errorMessage);
    }
  }).remove(function(player){
    log.logEvent(player, 'playerRemoved');
    res.end();
  });
};


/*=========================================================
                    AUTHENTICATION PROCESS
==========================================================*/

/*=========================================================
                    LOAD REQUESTED PAGE
==========================================================*/

exports.loadPage = function(req,res){

  function isPageName(name){
    if (name === 'konfiguration' || name === 'cricket' || name === '501' || name === 'update' || name === 'spieler'){
      return true;
    }else{
      return false;
    }
  }

  var loadPage = req.params.loadPage;
  if(isPageName(loadPage)){
    console.log('Sending ' + loadPage + ' page');
    get.allPlayers().then((data) => {
                  res.render(loadPage, {data:data});
                })
                .catch((error) => {
                  console.log(error);
                });
  }else{
    res.render(loadPage);
  }
};


/****************************************************************
                      UPDATE FUNCTIONS
****************************************************************/
function updateStats(game, updateData){
  if(game === 'cricket'){
    return updateCricket(updateData);
  }else{
    return update501(updateData);
  }
}
function isWin(rank){
  if (rank===1){
    return 1;
  }else{
    return 0;
  }
}
function isLose(rank){
  if (!(rank===1)){
    return 1;
  }else{
    return 0;
  }
}

function updateCricket(updateData){
  /****************************************************************************
                          UPDATING DATA
  ****************************************************************************/
  for(let i = 0; i<updateData.names.length; i++){
    model.Player.findOne({'player': updateData.names[i]}, function(err, data){
      if(err){
        console.log(err);
      }
      data.cricket.games++;
      data.cricket.wins += isWin(updateData.ranks[i]);
      data.cricket.losses += isLose(updateData.ranks[i]);
      data.cricket.score += updateData.scores[i];
      data.cricket.scoreAverage = (data.cricket.scoreAverage+updateData.scores[i]) / 2;
      data.cricket.rank = (data.cricket.rank + updateData.ranks[i]) / 2;
      data.cricket.winrate = data.cricket.wins/data.cricket.games*100;
      data.total.games++;
      data.total.wins += isWin(updateData.ranks[i]);
      data.total.losses += isLose(updateData.ranks[i]);
      data.total.winrate = data.total.wins/data.total.games*100;
      if(data.hasPlayed === false){
        data.hasPlayed = true;
      }
/*****************************************************************************
                          Saving Data to Database
*****************************************************************************/
      data.save(function(err){
        if(err){
          console.log(err);
        }
        console.log('Data for "' + updateData.names[i] +'" saved!');
      });
    });
  }
}

function update501(updateData){
  model.Player.findOne({'player': updateData.names[i]}, function(err, data){
    if(err){
      console.log(err);
    }
    data.five01.games++;
    data.five01.wins += isWin(updateData.ranks[i]);
    data.five01.losses += isLose(updateData.ranks[i]);
    data.five01.score += updateData.scores[i];
    data.five01.scoreAverage = (data.five01.scoreAverage+updateData.scores[i]) / 2;
    data.five01.rank = (data.five01.rank + updateData.ranks[i]) / 2;
    data.five01.winrate = data.five01.wins/data.five01.games*100;
    data.total.games++;
    data.total.wins += isWin(updateData.ranks[i]);
    data.total.losses += isLose(updateData.ranks[i]);
    data.total.winrate = data.total.wins/data.total.games*100;
    if(data.hasPlayed === false){
      data.hasPlayed = true;
    }
/*****************************************************************************
                        Saving Data to Database
*****************************************************************************/
    data.save(function(err){
      if(err){
        console.log(err);
      }
      console.log('Data for "' + updateData.names[i] +'" saved!');
    });
  });
}

/*================================================================
              UPDATING DATABASE WITH NEW VALUES
================================================================*/

exports.pushUpdate = function(req,res){
  const pushData = req.body;
  log.logEvent(pushData, 'pushUpdate');

  const updateLength = pushData.names.length;
  let   names = pushData.names,
        ranks = pushData.ranks.map((data)=>parseInt(data)),
        scores = pushData.points.map((data)=>parseInt(data));
  const game = pushData.game,
        updateData = {
                        names: names,
                        ranks: ranks,
                        scores: scores
                     };
  updateStats(game, updateData);
};

exports.updateGamePage = function(req,res){
  const names = req.body.names;
  const game = req.body.game;
  if(names){
    if(game==='cricket'){
      res.render('updateCricket', {names: names});
    }else{
      res.render('update501', {names: names});
    }
  }
}
