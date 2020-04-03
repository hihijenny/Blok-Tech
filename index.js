const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const mongo = require("mongodb");
const port = 3000;

require("dotenv").config()

let collection = null;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@blok-tech-ezc4c.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(function (err, client) {
  if (err) {
    throw err
  }

  collection = client.db("blok-tech").collection("sendChoice");
})

//Array met de image objects om uit te kiezen
const choices = [
  { imageUrl: "images/burrito.jpg", name:"burrito" },
  { imageUrl: "images/tacos.jpg", name:"tacos" },
  { imageUrl: "images/burger.jpg", name:"burger" },
  { imageUrl: "images/hot-dog.jpg", name:"hot-dog" },
  { imageUrl: "images/pasta.jpg", name:"pasta" },
  { imageUrl: "images/pizza.jpg", name:"pizza" }
 ]

//genereren van een random afbeelding uit de array
const getImage = () => {
  return choices[(Math.floor(Math.random() * Math.floor(choices.length)))]
}

 //genereren van een random afbeelding uit de array
const getImageSet = () => {
  let image1 = getImage();
  let image2 = getImage();

  //zorgt er voor dat je nooit twee keer dezelfde img object terug krijgt
  while (image1 === image2) {
    image1 = getImage()
  }

  return [image1, image2]
}

//object om data uit te halen en naar de ejs template te sturen
const data = {
  id: "profiel",
  naam: "Jenny Nijhof",
  imageSet1: getImageSet(),
  imageSet2: getImageSet(),
  imageSet3: getImageSet()
};

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

function sendChoice(req, res, next) {
  collection.insertOne({
    Interest1: req.body.food1,
    Interest2: req.body.food2,
    Interest3: req.body.food3
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/choice')
    }
  }
}

//404 foutmelding
app.use(function(req, res) {
  res.send("404: Page not found", 404);
});

app.listen(port, () => console.log(`app running on port: ${port}`));