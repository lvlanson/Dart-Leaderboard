var response = {
    status  : 200,
    success : 'Updated Successfully'
};

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    favicon     = require('serve-favicon'),
    db          = require('./model/db'),
    router      = require('./controller/router');

var spielerLocation = __dirname + '/datenbank/spieler.json';


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.post('/pushUpdate', router.pushUpdate);
app.post('/updateGamePage', router.updateGamePage);
app.post('/addPlayer', router.addPlayer);
app.post('/delete', router.removePlayer);
app.post('/passwort', function(req,res){
  /*console.log(req.body.data);
  var passwort = 'NudelSack';
  if(req.body.data === passwort){
    console.log('access');
    require('./controller/konfig.js').getKonfigData(spielerLocation, fs)
                                     .then((data) => {
                                       //console.log(data);
                                       res.render('konfiguration', {data:data});
                                     })
                                     .catch((error) => {
                                       console.log("Error:" + error);
                                     });
  }else{
    console.log('denied');
    res.render('denied');
  }*/
  res.redirect('/konfiguration');
});

app.get('/', function(req, res){
    res.render('index');
});
app.get('/:loadPage', router.loadPage);


app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));

app.listen(process.env.PORT || 8080);
