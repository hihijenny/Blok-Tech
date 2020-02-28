const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   app.use(express.static("public"));
// })

// app.get('/about', (req, res) => {
//   res.send("hoi");
// })

// app.get('/index', (req, res) => {
//   res.send("index");
// });

//404 error

app.use(function(req, res) {
  res.send("404: Page not found", 404);
});
app.listen(port, () => console.log(`running on port ${port}`))
