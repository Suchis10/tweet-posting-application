const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content : "I teach coding to students",
    },
    {
        id:uuidv4(),
        username: "Suchismita Roy",
        content: "I love coding!",
    },
    {
        id:uuidv4(),
        username:"Subham Roy",
        content: "I am excited to join college",
    }
]
app.listen(port, () =>{
    console.log("listening to port: 8080");
});

app.get("/posts", (req,res) =>{
    res.render("views.ejs",{posts});
});

app.get("/posts/new",(req,res) =>{
    console.log("post request sended successfully");
    res.render("new.ejs");
});

app.post("/posts",(req,res) =>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) =>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newcontent = req.body.content;
    console.log(newcontent);
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) =>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    console.log(posts);
    res.redirect("/posts");
});