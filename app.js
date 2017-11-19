var express = require('express');
var app = express();


app.set('view engine', 'ejs');

app.get('/:loadPage',function(req,res){
  var loadPage = req.params.loadPage;
  if(loadPage === ''){
    res.render('index');
  }else{
    res.render(loadPage);
  }

});
app.use('/assets', express.static('assets'));



app.listen(8080);
