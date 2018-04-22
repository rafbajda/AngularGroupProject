

var express =require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require("path");
var app=express();
var bodyParser = require('body-parser');

app.use(sassMiddleware({
    src: path.join(__dirname, 'public', 'styles', 'scss'),
    dest: path.join(__dirname, 'public', 'styles', 'css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/styles/css'
}));



app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var lessons = require('./public/data/lessons.json')




app.get('/',function(req,res){
    res.sendFile(__dirname + 'public/index.html');
});

app.get('/api/lessons',function(req,res){
    
    res.json(lessons);
});

app.get('/api/lessons/:_id',function(req,res){
    var temp = lessons.findIndex((lesson) => lesson.index==req.params._id);
    res.json(lessons[temp]);
});

app.post('/api/lessons/add',function(req,res){
    console.log("add w konsoli");
    lessons.push(req.body);
    res.send(JSON.stringify(lessons));
});

app.post('/api/lessons/update',function(req,res){
    var temp = lessons.findIndex((lesson) => lesson.ind==req.body.ind);
    console.log("updejt w konsoli");
    lessons[temp]=req.body;
    res.send(JSON.stringify(lessons));
});

app.delete('/api/lessons/delete',function(req,res){
    var temp = lessons.findIndex((lesson) => lesson.day==req.body.day && lesson.start==req.body.start && lesson.grupa==req.body.grupa);
    console.log("delejted w konsoli");
    lessons.splice(temp,1);
    res.send(JSON.stringify(lessons));
});

app.listen(3000);
console.log('Dziala na porcie 3000');