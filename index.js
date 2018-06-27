"use strict";
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
var dotenv = require('dotenv');
var fs = require('fs');
var bodyParser = require('body-parser')

const result = dotenv.config({
  path: '.env'
});

console.log(process.env);
process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');
const server = config.get('server');

app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.post("/getFileUseDetails", function(req, res) {
  var path = req.body.mountPoint;
  if (path.length < 2) {
    res.send("Usage: path/to/directory");
  }else {
    fs.readdir(path, function(err, items) {
      if(err){
        res.send(JSON.stringify({status:false,desc:"Invalid path/to/directory"}));
      }
      var contents = [];
      for (var i = 0; i < items.length; i++) {
        var file = path + '/' + items[i];
        var filesize = fs.statSync(file).size;
        contents.push([file,filesize]);
      }
      res.send(JSON.stringify(contents));
    });
  }
});

app.get("/",function(req,res) {
  res.render("index");
})
app.listen(server.port, function() {
  console.log('Example app listening on port ' + server.port);
});
