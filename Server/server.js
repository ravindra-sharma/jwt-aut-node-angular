var express = require('express');
var cors = require('cors');
var mon = require('mongoose');
var auth = require('./auth');
var bp = require('body-parser')
var Post = require('./models/post')

var app = express();
app.use(express.static(__dirname + '\\frontend\\'))
app.use(cors())
app.use(bp.json())

mon.connect("mongodb://localhost:27017/pssocial",{ useNewUrlParser: true },function(err){
    if(!err){
        console.log("connected")
    }
})

app.get('/',function(req,res){
    res.sendFile(__dirname + '\\frontend\\index.html');
});
var posts = [
    {"name":"Ravindra","age":23},
    {"name":"Rakesh","age":21}
]
app.get('/posts',function(req,res){
    res.send(posts);
})

app.get('/users',async(req,res)=>{
    var users = await User.find({},'-password -__v');    
    res.status(200).send(users)
   
})

app.post('/post',(req,res)=>{
    var reqPost = req.body;
    reqPost.author = '5cb8993b815a31240c9b983a';
    var post = new Post(reqPost);
    post.save((err,result)=>{
        if(err)
            res.send(err)
        else
            res.send(result)
    })
})

app.get('/users/:id',async(req,res)=>{
    var id = req.params.id;
    var user = await User.findById(id,'-password -__v');    
    res.status(200).send(user)
})

app.use('/',auth);
app.listen(8000,function(){
    console.log('app is listening on 8000!');
})