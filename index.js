const express = require('express');
const app = express();
const ejs = require("ejs");
// const slug = require("slug");
// const bodyParser = require("bodyParser");
const port = 3000;

var data = [
  {
  id: "fight-club",
  title: "Fight Club",
  summary: "Really good movie with Edward Norton and Brad Pitt."
},

{
  id: "american-history-x",
  title: "American History X",
  summary: "Another really good movie with Edward Norton."
}, 

{ 
  id: "the-hulk",
  title: "The Hulk",
  summary: "This movie is ok. I'd give it 3 stars just because Edward Norton is starring in it"
}  
]

app
  .use(express.static("public"))
  .set("view engine", "ejs")
  .set("views", "view")

app.get("/list", (req, res) => {
  res.render("list.ejs", {
    data
  })

});

app.use(function(req, res) {
  res.send("404: Page not found", 404);
});



app.listen(port, () => console.log(`app running on port: ${port}`));