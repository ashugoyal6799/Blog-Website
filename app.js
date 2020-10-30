const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const {MONGOURI} = require('./config');

const homeStartingContent = "Lorem Ipsum  of Lorem Ipsum.";
const aboutContent = "Lorem Ipsum  including versions of Lorem Ipsum";
const contactContent = "Lorem Ipsum  versions of Lorem Ipsum";


// const postCollection=[];  // we can push something to a const object
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(MONGOURI,{ useNewUrlParser: true , useUnifiedTopology: true});

const PostSchema ={
    title : String,
    content  : String
};
const Post = mongoose.model('Post', PostSchema);

app.get('/',function(req,res){
    Post.find({}, function(err, posts){
        res.render("home", {
            homeStartingContent : homeStartingContent,
            postCollection : posts
            });
      });
    // res.render('home',{homeStartingContent : homeStartingContent, postCollection : Post});
});

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
    const post = new Post ({
        title: req.body.titleData,
        content: req.body.postData
    });
    // let post = {
    //     title : req.body.titleData,
    //     content : req.body.postData
    // };
    // postCollection.push(post);
    // post.save();
    post.save(function(err){
        if (!err){
            res.redirect("/");
        }
    });
    // res.redirect('/');
})

app.get('/posts/:postTitle',function(req,res){
    // postCollection.forEach(function(post){
    //     if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
    //         res.render('post',{title: post.title , content : post.content})
    //     }
    // });
    const requestedPostTitle = req.params.postTitle;

    Post.findOne({title: requestedPostTitle}, function(err, post){
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
});

app.get('/delete',function(req,res){
    res.render('delete');
});

app.post('/delete',function(req,res){
    var requestedPostTitle = req.body.deletePostTitle;
    Post.deleteOne({ title: requestedPostTitle }, function (err) {
        if (err) {
            console.log(err);
        }else{
            res.redirect('/');
        }
        // deleted at most one tank document
    });
});

app.get('/delete/:postTitle',function(req,res){
    const requestedPostTitle = req.params.postTitle;

    Post.deleteOne({ title: requestedPostTitle }, function (err) {
        if (err) {
            console.log(err);
        }else{
            res.redirect('/');
        }
        // deleted at most one tank document
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
