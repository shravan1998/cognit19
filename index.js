const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var ejs = require("ejs");
var path= require("path");
const connection = mysql.createConnection({
    host:'localhost',
    username:'root',
    password:'',
    database:'med'
});
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/'));
app.get('/',function(req,res){
    res.render('index');
});
app.get('/db',function(req,res){
    res.render('database');
});
app.post('/',function(req,res){
    var obj={};
    var med= req.body.search;
    var sql="SELECT * FROM `med` WHERE `MED_NAME`='"+med+"';";
    connection.query(sql,function(err,results,field){
        if(err){
            throw err;
        }
        else
        {
            console.log(field);
           
        }
        return res.render('database',{med:results});
    });
});
app.set('views',__dirname);
app.set('view engine','ejs');
app.listen('8000',function(){
    console.log("connected");
});