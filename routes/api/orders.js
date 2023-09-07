const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../config/ensureLoggedIn');
const orderController = require('../../controllers/api/orders');

router.get('/', isLoggedIn, orderController.getAllOrders);
router.get('/:id',isLoggedIn, orderController.fetchOrderById);
router.post('/', isLoggedIn, orderController.createOrder);
router.put('/:id', isLoggedIn, orderController.updateOrder);
router.delete('/:id', isLoggedIn, orderController.deleteOrder);

module.exports = router;
//ok