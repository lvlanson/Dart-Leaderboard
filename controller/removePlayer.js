exports.removePlayer = function(spielerLocation, fs, req){

  var removePlayer = req.body.name;
  console.log("Searching for player " + removePlayer);
  fs.readFile(spielerLocation, function(err, data){

    var playerList = JSON.parse(data);

    for (var i = 0; i<playerList.length; i++){
      if(removePlayer === playerList[i].player){
        console.log("Removing " + removePlayer);
        playerList.splice(i, 1);
      }
    }
    var playerObject = JSON.stringify(playerList);
    fs.writeFile(spielerLocation, playerObject);
  });

}
