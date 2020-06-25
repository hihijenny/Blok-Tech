const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const mongo = require("mongodb");
const port = 3000;

require("dotenv").config()

//connecten naar MongoDB
let collection;
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

//Array met de Objects om uit te kiezen, selected staat op false omdat er nog niks is geselecteerd
// const choices = [
//   { imageUrl: "images/burrito.jpg", name:"burrito", selected: false },
//   { imageUrl: "images/tacos.jpg", name:"tacos", selected: false },
//   { imageUrl: "images/burger.jpg", name:"burger", selected: false },
//   { imageUrl: "images/hot-dog.jpg", name:"hot-dog", selected: false},
//   { imageUrl: "images/pasta.jpg", name:"pasta", selected: false },
//   { imageUrl: "images/pizza.jpg", name:"pizza", selected: false }
//  ]

//genereren van een afbeelding uit de Array
// const getImage = () => {
//   for ( i = 0; i < choices.length; i++)
//   returnchoices[i]
// }

 //genereren van een random afbeelding uit de array
// const getImageSet = () => {
//   let image1 = getImage();
//   let image2 = getImage();

  //zorgt dat image1 en image2 niet het zelfde zijn
  // while (image1 === image2) {
  //   image1 = getImage()
  // }

//   return [image1, image2]
// }

//object om data uit te halen en naar de ejs template te sturen
const formData = {
  id: '', //lege id om een id in op te slaan
  naam: "Jenny Nijhof",
  imageSet1: [{ imageUrl: "images/burrito.jpg", name:"burrito", selected: false },
  { imageUrl: "images/tacos.jpg", name:"tacos", selected: false }],

  imageSet2: [{ imageUrl: "images/burger.jpg", name:"burger", selected: false },
  { imageUrl: "images/hot-dog.jpg", name:"hot-dog", selected: false}],

  imageSet3: [{ imageUrl: "images/pasta.jpg", name:"pasta", selected: false },
  { imageUrl: "images/pizza.jpg", name:"pizza", selected: false }]
};

//routes
app
  .use(express.static("public"))
  .set("view engine", "ejs")
  .set("views", "view")
  .use(bodyParser.urlencoded({extended: true}))
  .post("/sendChoice", sendChoice)
  .get("/choice", choice)
  .get("/answers", answers)
  .post("/updateAnswer", updateAnswer)

function choice(req, res)  {
  res.render("choice.ejs", {formData})
}

function answers(req, res) {
  res.render("answers.ejs", {formData})

}


//functie om de al eerder opgeslagen antwoorden te veranderen
function updateAnswer(req, res) {
  let form = req.body;

  //Update de interests maar haal de Id uit de formData
  collection.findOneAndUpdate(
    { _id: formData.id },
    { 
      $set: {
        Interest1: form.food1,
        Interest2: form.food2,
        Interest3: form.food3 
      }
    }, done);

    function done(err, data) {
      if (err) {
        return;
      } else {
        resetSelectedImages();
        formData.imageSet1.find(x => x.name === form.food1).selected = true;
        formData.imageSet2.find(x => x.name === form.food2).selected = true;
        formData.imageSet3.find(x => x.name === form.food3).selected = true;
        res.redirect('/answers');
      }
    }
}

//reset alle images en zet selected op false
function resetSelectedImages() {
  for(i = 0; i < formData.imageSet1.length; i++) {
    formData.imageSet1[i].selected = false;
  }
  for(i = 0; i < formData.imageSet2.length; i++) {
    formData.imageSet2[i].selected = false;
  }
  for(i = 0; i < formData.imageSet3.length; i++) {
    formData.imageSet3[i].selected = false;
  }
}


function sendChoice(req, res, next) {
  let form = req.body;

  collection.insertOne({
    Interest1: form.food1,
    Interest2: form.food2,
    Interest3: form.food3
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      formData.id = data.insertedId;
      formData.imageSet1.find(x => x.name === form.food1).selected = true;
      formData.imageSet2.find(x => x.name === form.food2).selected = true;
      formData.imageSet3.find(x => x.name === form.food3).selected = true;
      res.redirect('/answers');
    }
  }
}

//404 foutmelding
app.use(function(req, res) {
  res.send("404: Page not found", 404);
});

app.listen(port, () => console.log(`app running on port: ${port}`));


/* Gebruikte bronnen: 

Node Js. (z.d.). Express routing. Geraadpleegd op 6 april 2020, van https://expressjs.com/en/guide/routing.html

MongoDB. (z.d.). Db.collection.findOneAndUpdate() — MongoDB Manual. Geraadpleegd op 6 april 2020, 
van https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate

Yaapa, H. (2019, 23 mei). Express.js: Custom 404 and 500 error pages. Geraadpleegd op 6 april 2020, 
van https://www.hacksparrow.com/webdev/express/custom-error-pages-404-and-500.html

Button image as form input submit button? (2010, 1 augustus). Geraadpleegd op 6 april 2020, 
van https://stackoverflow.com/questions/3381609/button-image-as-form-input-submit-button


*/