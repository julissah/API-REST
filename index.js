const express = require('express');
const routerApi = require('./routes/index');
const { logErrors, errorHandler } = require('./middlewares/error.handler')
const app = express();
const port = 3002;
// Permite recibir informacion de tipo JSON que nos envian por POST
app.use(express.json());

app.get('/', (req,res) => {
  res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req,res) => {
  res.send('Hola, soy una nueva ruta');
})

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
})


