var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    methodOveride = require('method-override');
    // alert = require('alert');
mongoose.connect("mongodb://localhost/search_app",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOveride("_method"));
app.use(express.static("public"));

// SCHEMA
var studentSchema = new mongoose.Schema({
    rollno : Number,
    name : String,
    branch : String,
    mobile : String
});
var Student = mongoose.model("Student", studentSchema);
// ROUTES  

// save route
app.get("/", function(req, res){
    res.render("save");
});

//Index route
app.post("/", function(req, res){
    Student.create(req.body.student, function(err, newStudent){
        if(err){
            console.log(err);
            res.render("save");
        }else {
            res.render("success");
        }
    });
});

//search route
app.get("/search" , function(req , res){
    res.render("search");
})

//show route
app.get("/show" , function(req, res){
   var value = req.query.SearchWord;
   Student.findOne({name :value}  , function(err , data){
       if(err){
           console.log(err);
       }
       else{
           res.render("show" , {result : data});
       }
   })
})

//edit route
app.get("/edit/:id", function (req, res) {
    var id = req.params.id;
    Student.findById(id, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("edit", { result: data });
        }
    })
})

//update route
app.put("/edit/:id", function (req, res) {
    var id = req.params.id;
    console.log(req.body.result);
    Student.findByIdAndUpdate(id, req.body.result, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            // alert("Successfully changed");
            res.redirect("/search");
        }
    })
})
app.listen(3000, function(){
    console.log("Server started!!");
})
