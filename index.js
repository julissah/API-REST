const express = require('express');
const routerApi = require('./routes/index');

const app = express();
const port = 3001;

app.get('/', (req,res) => {
  res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req,res) => {
  res.send('Hola, soy una nueva ruta');
})

routerApi(app);

app.listen(port, () => {
  console.log('Mi port' + port);
})

