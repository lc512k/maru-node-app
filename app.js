var express = require('express');
var app = express();
var path = require('path');
const axios = require('axios');
app.use(express.urlencoded());

const port = 3000;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/submit-form', (req, res) => {
  const article = req.body.article;
  var url =  'http://api.ft.com/content/search/v1?';

  const callConfig = {
    headers: {
      'X-Api-Key': '59cbaf20e3e06d3565778e7bde0b7e265f5844ddb68d827a9f3b7879',
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'cache-control': 'no-cache'
    },
  };
  const body = { 
    queryString: article
  };

  axios.post(url, body, callConfig)
    .then(function (response) {
      console.log("got response");
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));