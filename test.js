const https = require('https');
const http = require('http');
const fs = require("fs");

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/www.a4b7f74cc91ae.link/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/www.a4b7f74cc91ae.link/fullchain.pem")
}

const port = 443;
const port2 = 80;
let content = "";

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200;
  let ur = req.url;
  console.log(ur);
  let u = ur.split("/");
  u = u[u.length-1];
  if(req.url === "/api.php/me"){
    content = "test";
  }else if(req.url === "/api.php/meta/modules"){
    content = '{"list": [{"module": "test", "primary_model":"model_test", "models": ["model_test"]}]}';
  }else if(req.url === "/api.php/test"){
    res.statusCode = 302;
    res.setHeader("Location",`http://[::ffff:a9fe:a9fe]/latest/meta-data/iam/security-credentials/${u}`);
    res.end();
    return;
  }
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