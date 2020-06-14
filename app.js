var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/search_app",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
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
//save route
app.get("/", function(req, res){
    res.render("save");
});
//create route
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
// delete
app.delete("/delete/:id", function(req, res) {
    Student.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
        }else {
            res.render("delete");
        }
    });
});
app.listen(3000, function(){
    console.log("Server started!!");
})
