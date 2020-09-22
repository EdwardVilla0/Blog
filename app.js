var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app", {useUnifiedTopology: true, useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Blog/mongoose model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTful Routes
app.get("/", function(req, res){
  res.redirect("blogs");
});

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err);
    }else{
      res.render("index", {blogs: blogs});
    }
  });
});

app.listen(3000, process.env.IP, function(){
  console.log("server started");
});
