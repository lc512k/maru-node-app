var express = require('express');
var app = express();
const fs = require('fs');
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
  let data = '';

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
    .then(response => {
      console.log("got response");
      console.log(response.data);
      // response.on('data', (chunk) => {
      //   data += chunk;
      // });      
      var html = fs.readFileSync(__dirname + '/index.html', 'utf8' );
      html = html.replace('{message}', response.data);
      res.send(html);
    })
    .catch(function (error) {
      console.log(error);
    });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));