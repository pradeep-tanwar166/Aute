// Here we're going to do Authentication and Authorization part-2 
// In this module we will cover all the concept relate to Authentication 
const cookieParser=require('cookie-parser');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path =require("path");

const userModel=require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // async hamesa await ke parent function par lagaya jata hai toh abb hmm async ko yaha par likhenge
      let userdata = await userModel.create({
        username,
        email,
        password:hash,
        age,
      });
     let token= jwt.sign({email},"shhhhhhhh");
     res.cookie("token",token);
      console.log("user created :", userdata);
      res.redirect("/read");
    });
  });
});

app.get("/read", async (req, res) => {
  let data = await userModel.find();
  res.send(data);
});

app.get("/login",(req,res)=>{
    res.render('login');
})

app.post("/login",async (req,res)=>{
  let user= await userModel.findOne({email:req.body.email});
 if(!user) return res.send("something went wrong ");

 bcrypt.compare(req.body.password,user.password,function(err,result){
    if(result){
        let token=jwt.sign({email:user.email},"shhhhhhhh");
        res.cookie("token",token);
        res.send("yes you can login");
    }
    else res.send("something is wrong");
 })
})


app.get("/logout",(req,res)=>{
res.cookie("token","");
res.redirect("/")// this is used to go any Route 
})// if we don't want to make any change in server then we use get and if we need to made any change in our form then we use post 

app.listen(3000, () => {
  console.log("The server is working well");
});
