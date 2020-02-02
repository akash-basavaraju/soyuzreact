const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const dbName = 'Dictionary';
const collName = 'words';
const uri = "mongo db uri to be added here"

var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/build')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});
app.get('/words/:category',(req,res)=>{
    MongoClient.connect(uri, function(err, client) {
        if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }else{
            console.log('Connected...');
        }
        const db = client.db(dbName);
        //db.createCollection('words',(res)=>console.log('Collection Created'));
        //db.collection('words').insertOne(wordsJson,(res)=>console.log('words Added'));
        //console.log(db.collection('words').find({}).result);    return db;

        db.collection(collName).find({category: req.params.category}).toArray(function(err,docs){
            //console.log(docs);
            res.send({array: docs});
        });
        client.close();
    });
});
app.get('/words',(req,res)=>{
    MongoClient.connect(uri, function(err, client) {
        if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }else{
            console.log('Connected...');
        }
        const db = client.db(dbName);
        //db.createCollection('words',(res)=>console.log('Collection Created'));
        //db.collection('words').insertOne(wordsJson,(res)=>console.log('words Added'));
        //console.log(db.collection('words').find({}).result);    return db
        db.collection(collName).find({}).toArray(function(err,docs){
            //console.log(docs);
            res.send({array: docs});
        });
        client.close();
    });
});
app.post('/addword',(req,response)=>{
    MongoClient.connect(uri, function(err, client) {
        if(err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }else{
            console.log('Connected...');
        }
        const db = client.db(dbName);
        //db.createCollection('words',(res)=>console.log('Collection Created'));
        db.collection(collName).insertOne({"word": req.body.word,"defination":req.body.defination,"category":'general'},(res)=>{
            console.log('Word Added :'+res);
            response.status = 200;
            response.send();
        });
        //console.log(db.collection('words').find({}).result);    return db;
        //db.collection(collName).find({},{word: 1, defination: 0}).toArray(function(err,docs){
        //console.log(docs);

    client.close();
    });
});
//app.listen(3000,()=>console.log('Server is listening at localhost:3000'));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
