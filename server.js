const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
var express = require("express")
var app = express()
const PORT = 3000;
const path = require('path');
const opers = require("./modules/Operations.js")
app.use(express.json());
console.log(opers)



app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
