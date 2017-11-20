var express = require('express');
var app = express();


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
app.use('/assets', express.static('assets'));

app.listen(3000);
