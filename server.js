var express = require('express');
var app = express();
var fs = require("fs");
var sqlite3 = require("sqlite3");
app.use(express.static('public'));
var db = new sqlite3.Database('./db/database.db');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))




app.get('/', function (req, res) {
  var html = fs.readFileSync("./views/index.html", "utf8");
  res.send(html);
});

app.get('/books', function(req, res){
  db.all("SELECT * FROM books;", function(err, data){
    var json = JSON.stringify(data);
    res.send(json);
  })
});

app.post('/books', function(req, res){
  var author = req.body.author;
  var title = req.body.title;
  var pageCount = req.body.pageCount;
  var myThoughts = req.body.myThoughts;
  var genre = req.body.genre;
  var imageUrl = req.body.imageUrl;
  var payload = "'" +author + "','" + title + "','" + pageCount + "','"+ myThoughts + "','" + genre + "','" + imageUrl + "'";
  var sql = "INSERT INTO books (author, title, pageCount, myThoughts, genre, imageUrl) VALUES (" + payload + ");"
  db.run(sql, function(data){
  })
});

app.delete('/books/:id', function(req, res){
  var id = req.params.id;
  var sql= "DELETE FROM books WHERE id="+id;
  db.run(sql);
});


var port = process.env.PORT || 3000;


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});