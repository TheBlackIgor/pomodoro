const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
var express = require("express");
const Collection = require('mongodb/lib/collection');
var app = express()
const PORT = 3000;
const path = require('path');
const opers = require("./modules/Operations.js")
app.use(express.json());
let _db;



app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post("/", function (req, res) {
    let zwrot = []
    mongoClient.connect(`mongodb://localhost/pomodoro`, function (err, db) {
    if (err){ 
        console.log(err)
    }else{
        console.log("mongo podłączone!")
        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
        // pod zmienną widoczną na zewnątrz    
        _db = db;
    
        db.createCollection("taskList", function (err, coll) {  
           
            coll.find({}).toArray(function (err,items){
                if(err){
                    console.log(err)
                }else{
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(items))
                }
            })
        })

       
        console.log("ZWROT" + zwrot)

        
        
    }
    })

})

app.post("/h", function (req, res) {
    let zwrot = []
    mongoClient.connect(`mongodb://localhost/pomodoro`, function (err, db) {
    if (err){ 
        console.log(err)
    }else{
        console.log("mongo podłączone!")
        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
        // pod zmienną widoczną na zewnątrz    
        _db = db;
    
        db.createCollection("historyList", function(err,coll){
            coll.find({}).toArray(function (err,items){
                if(err){
                    console.log(err)
                }else{
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(items))
                }
            })
        })

        
        
    }
    })

})

app.post("/hist", function(req,res){
    let length = req.body.length
    let short = req.body.short
    let long = req.body.long
    let after = req.body.after
    let goal = req.body.goal

    mongoClient.connect(`mongodb://localhost/pomodoro`, function (err, db) {
      let zwrot = []
    if (err){ 
        console.log(err)
    }else{
        console.log("mongo podłączone!")
        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
        // pod zmienną widoczną na zewnątrz    
        _db = db;
    
        db.createCollection("historyList", function (err, coll) {  
            coll.insert({length:length,short:short,long:long,after:after,goal:goal}, function (err, result) {                
                console.log("dokument powstał, sprawdź efekt w konsoli klienta mongo")
            });
            coll.find({}).toArray(function (err,items){
                if(err){
                    console.log(err)
                }else{
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(items))
                }
            })
        })
    }
    })

})

app.post("/add", function (req, res) {
    let opis = req.body.opis
    let kategoria = req.body.kategoria

    mongoClient.connect(`mongodb://localhost/pomodoro`, function (err, db) {
      let zwrot = []
    if (err){ 
        console.log(err)
    }else{
        console.log("mongo podłączone!")
        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
        // pod zmienną widoczną na zewnątrz    
        _db = db;
    
        db.createCollection("taskList", function (err, coll) {  
            coll.insert({opis:opis, kategoria:kategoria}, function (err, result) {                
                console.log("dokument powstał, sprawdź efekt w konsoli klienta mongo")
            });
            coll.find({}).toArray(function (err,items){
                if(err){
                    console.log(err)
                }else{
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(items))
                }
            })
        })
    }
    })

})

app.post("/del", function (req, res) {
    let id = req.body.id

    mongoClient.connect(`mongodb://localhost/pomodoro`, function (err, db) {
    if (err){ 
        console.log(err)
    }else{
        console.log("mongo podłączone!")
        //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
        // pod zmienną widoczną na zewnątrz    
        _db = db;
    
        
            let coll = _db.collection("taskList")
            opers.DeleteById(ObjectID, coll, id)
            coll.find({}).toArray(function (err,items){
                if(err){
                    console.log(err)
                }else{
                    console.log(items)
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(items))
                }
            })
    

        
    }
    })

})



