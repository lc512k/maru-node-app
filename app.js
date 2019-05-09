var express = require('express')
var app = express()
var path = require('path');
// app.use(express.urlencoded())

const port = 3000

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/submit-form', (req, res) => {
  const article = req.body.article
  console.log(article)

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))