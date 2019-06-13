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
  var url =  'http://api.ft.com/content/search/v1?';

  const callConfig = {
    headers: {
      'X-Api-Key':'',
      'Content-Type':'application/json'
    },
    queryString: article,
  };

  axios.post(url, callConfig)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));