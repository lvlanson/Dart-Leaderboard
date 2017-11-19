var express = require('express');
var app = express();

app.get('/', function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/assets', express.static('assets'));

app.listen(3000);
