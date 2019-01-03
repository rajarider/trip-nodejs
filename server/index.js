var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const cors =require("cors");
var port = 4001;
var app =express();
var dbo

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true
    })
);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

// app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(express.static('public'));


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("test");
    //Create a collection name "Trip":
    dbo.createCollection("Trip", function (err, res) {
    });
});

app.post('/plan-trip', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        Date : req.body.date,
        Place : req.body.place,
        Type : req.body.type
    };
    console.log("--------------->", response);
    // res.end(JSON.stringify(response));
    dbo.collection("Trip").insertOne(response, function (err, obj) {
        if (err) throw err;
        console.log("1 document inserted");
        res.redirect('http://localhost:3000/list');
    });
   

});

app.get('/show', function (req, res) {
    dbo.collection("Trip").find().toArray(function (err, result) {
        if (err) throw err;
        console.log("result =====>", result);
        res.end(JSON.stringify(result));
    });
})

app.listen(port, function(){
    console.log("server started on port: " + port);
})