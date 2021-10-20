const express = require('express');
const ProductsService = require('../services/productService');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const router = express.Router();
// Creamos una instancia del servicio que creamos
const service = new ProductsService();

router.get('/', async (req,res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
  res.send('Soy un filter')
})

router.get('/:id',
// definimos que schema queremos validar y en donde puede encontrar esa informacion
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct);
  }
);

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id
  });
})


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product);
    } catch (error) {
      next(error);
    }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
})

module.exports = router;
