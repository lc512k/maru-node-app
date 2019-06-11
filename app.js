var express = require('express');
var app = express();
var path = require('path');
const axios = require('axios');
app.use(express.urlencoded());

const port = 3000

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/submit-form', (req, res) => {
  const article = req.body.article;
  const callConfig = {
    method: 'get',
    url: 'http://api.ft.com/content/search/v1?',
    responseType: 'stream',
    headers: {
      'X-Api-Key':'',
      'Content-Type':'application/json'
  },
  queryString: article,
  };
  res = await axios(callConfig);

  console.log("res.status " + res.status);
  console.log("res.data " + res.data);

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))