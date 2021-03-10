const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let tasks =[];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/", (req, res) => {

    var today = new Date();
    var currentDay = today.getDay();
    let options = {
        weekday:"long" , day:"numeric", month:"long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", { listTitle: day , newListItems:tasks });
});

app.post("/", (req,res)=>{
    let task = req.body.newItem;

    if(req.body.list ==="Work"){
        workItems.push(task);
        res.redirect("/work");
    }
    else {
    tasks.push(task);
    res.redirect("/");
    }
});

app.get("/work", (req,res)=>{
    res.render("list", { listTitle: "Work list" , newListItems: workItems} )
})

app.post("/work", (req,res)=>{
    let item =req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.get("/about", (req,res)=>{
    res.render("about");
})

app.listen("3000", () => {
    console.log("server running at port 3000");
});




