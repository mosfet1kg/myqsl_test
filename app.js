var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bookstore'
});

connection.connect();

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(55555, function(){
    console.log("This server is running on the port " + this.address().port );
});

app.get('/get_list', function(req ,res){

    connection.query("SELECT id, name, description, price, rate from bookstore", function(err, result){
        if(err) throw err;

        res.send({results: JSON.stringify(result)});
    });

});

app.post('/save_book', function(req, res){
    var data = JSON.parse(req.body.data);
    var value = [];

    data.forEach(function(item){
        value.push(item.value);
    });
    connection.query('INSERT INTO bookstore(name,description,price,rate) VALUES(?,?,?,?)', value, function (err, result) {
        if (err) throw err;

        res.send({status:'ok'});
    });
});

app.delete('/delete_item', function(req, res){
    var id = req.body.id;

    connection.query('DELETE from bookstore where id=?', [id], function (err, result) {
        if (err) throw err;

        res.send({status:'ok'});
    });
});





