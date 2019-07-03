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
      'X-Api-Key': process.env.MYAPIKEY,
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
      console.log(response.data.results[0].results);   
      var obj = response.data;
      var html = fs.readFileSync(__dirname + '/index.html', 'utf8' );
      html = html.replace('{message}', JSON.stringify(obj.results[0].results));
      res.send(html);
    })
    .catch(function (error) {
      console.log(error);
    });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));