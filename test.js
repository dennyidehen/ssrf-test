const https = require('https');
const http = require('http');
const fs = require("fs");

const options = {
  //key: fs.readFileSync(""),
  //cert: fs.readFileSync("")
}

const port = 443;
const port2 = 80;
let content = "";

const server = https.createServer((req, res) => {
  console.log(req.url);
  if(req.url === "/api.php/me"){
    content = "test";
  }else if(req.url === "/api.php/meta/modules"){
    content = '{"list": [{"module": "test", "primary_model":"model_test", "models": ["model_test"]}]}';
  }
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', `${content.length}`);
  res.end(content);
});

const server2 = http.createServer((req, res) => {
  console.log(req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', `${content.length}`);
  res.end("HTTP");
});

server.listen(port, () => {
  console.log(`Server running on ${port}/`);
});

server2.listen(port2, () => {
  console.log(`Server2 running on ${port2}/`);
});