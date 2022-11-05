const http = require('http');

const port = 80;

const server = http.createServer((req, res) => {
  const content = '{"list": [{"module": "test", "primary_model":"model_test", "models": ["model_test"]}]}'
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', `${content.length}`);
  res.end(content);
});

server.listen(port, () => {
  console.log(`Server running on ${port}/`);
});