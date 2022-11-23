const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /orders"
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: "Handling POST requests to /orders",
        order: order
    })
})

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Updated orders",
        id: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Deleted orders",
        id: req.params.orderId

    })
})

module.exports = router;