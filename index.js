const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const mongo = require("mongodb");
const slug = require("slug");
const port = 3000;

require("dotenv").config()

let collection = null;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@blok-tech-ezc4c.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

client.connect(function (err, client) {
  if (err) {
    throw err
  }

  collection = client.db("blok-tech").collection("sendChoice");
})

mongo.MongoClient.connect(uri, function (err, client){
  if(err) throw errdb = client.db(process.nextTick.DB_)
})


//Array met de Images om uit te kiezen
const choices = [ 
  "images/burrito.jpg", 
  "images/tacos.jpg",
  "images/burger.jpg",
  "images/hot-dog.jpg",
  "images/pasta.jpg",
  "images/pizza.jpeg"
 ]

 //genereren van een random afbeelding uit de array
const random = () => {
  return Math.floor(Math.random() * choices.length) 
};

//toewijzen van een random img aan de variabele
let image1 = random();
let image2 = random(); 


//object om data uit te halen en naar de ejs template te sturen
const data = {
  id: "profiel",
  naam: "Jenny Nijhof",
  img1: choices[image1],
  img2: choices[image2]
};

//zorgt er voor dat je nooit twee keer dezelfde img terug krijgt
while (image1 === image2) {
  image1 = random()
};

//log welke img er worden getoond
console.log(image1);
console.log(image2);



//routes
app
  .use(express.static("public"))
  .set("view engine", "ejs")
  .set("views", "view")
  .use(bodyParser.urlencoded({extended: true}))
  .post("/sendChoice", sendChoice)
  .get ("/choice", choice)

  

function choice(req, res)  {
  res.render("choice.ejs", {data})
}

function sendChoice(req, res) {
  collection.insertOne({
    food: req.body.food
  })
 console.log(req.body.food);
   res.redirect('/choice')
 
   
 };

//404 foutmelding
app.use(function(req, res) {
  res.send("404: Page not found", 404);
});



app.listen(port, () => console.log(`app running on port: ${port}`));