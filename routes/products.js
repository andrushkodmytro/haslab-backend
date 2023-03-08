const { Router } = require('express');
// const auth = require('../middleware/auth.middleware.js');
const Products = require('../models/Products');
const router = Router();
const paginate = require('../middleware/paginate.middleware');

const productsController = require('../controllers/products.js');

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Is the service in a good state
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         type: string
 *       - name: sortBy
 *         in: query
 *         required: false
 *         type: string
 *       - name: orderBy
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *        description: Ok
 *   post:
 *     tags:
 *      - Products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: description
 *         in: body
 *         required: false
 *         type: string
 *       - name: price
 *         in: body
 *         required: false
 *         type: number
 *       - name: companyId
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *        description: Ok
 */

router.get('/', paginate(Products), productsController.productsGet);
router.get('/new', productsController.newProductsGet);
router.post('/', productsController.productsPost);
router.get('/:id', productsController.productGetById);

module.exports = router;
