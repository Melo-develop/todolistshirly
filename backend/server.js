const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // ← IMPORTANTE para Render

server.use(middlewares);
server.use(jsonServer.bodyParser);

// CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

server.use(router);

server.listen(PORT, HOST, () => {
  console.log(`JSON Server corriendo en http://${HOST}:${PORT}`);
});