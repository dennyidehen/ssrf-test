const http = require('http');

const port = 80;
let content = "";

const server = http.createServer((req, res) => {
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

server.listen(port, () => {
  console.log(`Server running on ${port}/`);
});