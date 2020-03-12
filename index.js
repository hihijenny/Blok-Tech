const express = require('express');
const app = express();
const ejs = require("ejs");
// const mongo = require("mongodb");
// const slug = require("slug");
// const bodyParser = require("body-parser");
const port = 3000;

// const data = [
//   {
//   id: "sjoerd-bindels",
//   naam: "Sjoerd Bindels",
//   leeftijd: "23",
//   bio: "Hoi ik ben Sjoerd"
// },

// {
//   id: "tess-smit",
//   naam: "Tess Smit",
//   leeftijd: "19",
//   bio: "Hoi ik ben Tess"
// }, 

// { 
//   id: "sam-slotemaker",
//   naam: "Sam Slotemaker",
//   leeftijd: "19",
//   bio: "Hoi ik ben Sam"
// }  
// ]

// require("dotenv").config()

// let db = null
// let url = "mongodb//" + process.env.DB_HOST + ":" + process.env.DB_PORT

const choices = [ 
  "images/burrito.jpg", 
  "images/tacos.jpg",
  "images/burger.jpg",
  "images/hot-dog.jpg",
  "images/pasta.jpg",
  "images/pizza.jpeg"
 ]

const random = () => {
  return Math.floor(Math.random() * choices.length)
}

let image1 = random();
let image2 = random(); 

const images = {
  id: "afbeeldingen",
  img1: choices[image1],
  img2: choices[image2]
}

while (image1 === image2) {
  image1 = random()
}


console.log(image1);
console.log(image2);

app
  .use(express.static("public"))
  .set("view engine", "ejs")
  .set("views", "view")

app.get("/list", (req, res) => {
  res.render("list.ejs", {
    data
  })

});

app.get("/choice", (req, res) => {
  res.render("choice.ejs", {images})
});

app.use(function(req, res) {
  res.send("404: Page not found", 404);
});



app.listen(port, () => console.log(`app running on port: ${port}`));