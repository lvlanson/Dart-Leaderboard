var model = require('../model/schema');
exports.allPlayers = function(){
  return new Promise(function(resolve, reject){
    model.Player.find({},function(err,players){
      if(!err){
        resolve(players);
      }else{
        reject(err);
      }
    });
  });
};

exports.players = function(updateData, i){
  return new Promise(function(resolve, reject){
    model.Player.findOne({'player':updateData.names[i]}, function(err, player){
      if(!err){
        var promiseObject={
                            updateData: {
                              'ranks': updateData.ranks[i],
                              'score': updateData.scores[i]
                            },
                            'databankData': player
                          };
        resolve(promiseObject);
      }else{
        reject(err);
      }
    });
  });
};
