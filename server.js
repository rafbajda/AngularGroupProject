

var express = require('express');
var multer  = require('multer');
var sassMiddleware = require('node-sass-middleware');
var path = require("path");
var app=express();
var bodyParser = require('body-parser');
var fs = require('fs');


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){

        cb(null, req.body.nameInput + '_' + req.body.surnameInput  + '_' + req.body.idInput +
        path.extname(file.originalname));

    }
})

const upload = multer({
    storage: storage,    
}).single('photo')

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
var lecturers = require('./public/data/lecturers.json')

app.get('/api/getAllImages', function(req,res){
    var files = fs.readdirSync('./public/uploads/');
    res.send(files);
})

app.get('/',function(req,res){
    res.sendFile(__dirname + 'public/index.html');
});


app.get('/api/lessons',function(req,res){
    
    res.json(lessons);
});

app.get('/api/lecturers',function(req,res){
    
    res.json(lecturers);
});

app.get('/api/lecturers/:_id',function(req,res){
    var temp = lecturers.findIndex((lect) => lect.index==req.params._id);
    res.json(lecturers[temp]);
});

app.get('/api/lessons/:_id',function(req,res){
    var temp = lessons.findIndex((lesson) => lesson.index==req.params._id);
    res.json(lessons[temp]);
});

app.post('/uploadImg', (req,res) => {
    upload(req,res, (err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("../#!/prowadzacy");
        }
    } )
})


app.post('/api/lessons/add',function(req,res){
    console.log("add w konsoli");
    lessons.push(req.body);
    res.send(JSON.stringify(lessons));
});

app.post('/api/lecturers/add',function(req,res){
    console.log("add w konsoli");
    lecturers.push(req.body);
    res.send(JSON.stringify(lecturers));
});

app.post('/api/lecturers/update',function(req,res){
    var temp = lecturers.findIndex((lect) => lect.ind==req.body.ind);
    console.log("updejt w konsoli");
    lecturers[temp]=req.body;
    res.send(JSON.stringify(lecturers));
});

app.post('/api/lessons/update',function(req,res){
    var temp = lessons.findIndex((lesson) => lesson.ind==req.body.ind);
    console.log("updejt w konsoli");
    lessons[temp]=req.body;
    res.send(JSON.stringify(lessons));
});

app.delete('/api/lecturers/delete',function(req,res){
    var temp = lecturers.findIndex((lect) => lect.id==req.body.id);
    console.log("delejted w konsoli");
    lecturers.splice(temp,1);
    res.send(JSON.stringify(lecturers));
});

app.delete('/api/lessons/delete',function(req,res){
    var temp = lessons.findIndex((lesson) => lesson.day==req.body.day && lesson.start==req.body.start && lesson.grupa==req.body.grupa);
    console.log("delejted w konsoli");
    lessons.splice(temp,1);
    res.send(JSON.stringify(lessons));
});

app.listen(3000);
console.log('Dziala na porcie 3000');