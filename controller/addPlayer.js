function isDuplicate(array, name){
  for(var i = 0; i<array.length; i++){
    if (array[i].player === name){
      return true;
    }
  }
  return false;
}

exports.addPlayer = function(spielerLocation, fs, req, Player){

  var player = new Player(req.body);

  fs.stat(spielerLocation, function(err, stat){
    if(err=null){
      var json = [];
      json.push(player);
      fs.writeFile(spielerLocation, JSON.stringify(json));
    }else{
      fs.readFile(spielerLocation, function(err, data){
        let parsedData = JSON.parse(data);
        if(isDuplicate(parsedData, player.player)){
          console.log("New player is duplicate of " + player.player + ":\n" + JSON.stringify(player));
        }else{
          parsedData.push(player);
          let json = JSON.stringify(parsedData);
          fs.writeFile(spielerLocation, json);
        }


      });
    }
  });

  console.log(player.player + " has been added!");
}







/*var data = JSON.stringify(player);

console.log(player);

var Readable = require('stream').Readable;

//creating readstream for a string

var s = new Readable;
s.push(data);    // the string you want
s.push(null);    // indicates end-of-file basically - the end of the stream

//creating writestream to the database
//checking if file exists
//if file exists, only append to file
fs.stat(spielerLocation, function(err, stat){
  if(err=null){
    var db = fs.createWriteStream(spielerLocation);
    s.pipe(db);
  }else{
    fs.appendFile(spielerLocation, data);
  }
});
*/
