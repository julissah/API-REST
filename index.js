const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');


const app = express();
const port = 3002;
// Permite recibir informacion de tipo JSON que nos envian por POST
app.use(express.json());
// Si nuestra API no es publica y solo queremos que solo algunos dominios puedan acceder
// podemos crear un array con los dominios que tendran acceso
const whiteList = [
  'http://localhost:8080',
  'https: //myapp.com'
];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}

// para utlizar cors, se utiliza como un middleware
// ahora nuestra API aceptara cualquier origen  de cualquier dominio
app.use(cors(options));

app.get('/', (req,res) => {
  res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req,res) => {
  res.send('Hola, soy una nueva ruta');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
})


