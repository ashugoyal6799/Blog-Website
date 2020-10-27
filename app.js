const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const postCollection=[];  // we can push something to a const object

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function(req,res){
    res.render('home',{homeStartingContent : homeStartingContent, postCollection : postCollection});
})

app.get('/about',function(req,res){
    res.render('about',{aboutContent : aboutContent});
})

app.get('/contact',function(req,res){
    res.render('contact',{contactContent : contactContent});
})

app.get('/compose',function(req,res){
    res.render('compose');
})

app.post('/compose',function(req,res){
    let post = {
        title : req.body.titleData,
        content : req.body.postData
    };
    postCollection.push(post);
    res.redirect('/');
})

app.get('/posts/:postName',function(req,res){
    postCollection.forEach(function(post){
        if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
            res.render('post',{selectedPost : post})
        }
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
