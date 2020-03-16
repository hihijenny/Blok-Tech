const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const mongo = require("mongodb");
const slug = require("slug");
const port = 3000;

require("dotenv").config()

let db = null;
let url = "mongodb//" + process.env.DB_HOST + ":" + process.env.DB_PORT;

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

  
//route
function choice(req, res)  {
  res.render("choice.ejs", {data})
}


function sendChoice(req, res) {
  data.push({
   food: req.body.food //require food uit body
  })

  res.redirect('/choice');
};

//404 foutmelding
app.use(function(req, res) {
  res.send("404: Page not found", 404);
});



app.listen(port, () => console.log(`app running on port: ${port}`));