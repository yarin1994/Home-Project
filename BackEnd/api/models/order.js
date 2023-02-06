const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    price: {type: Number, required: false},
    product_name: {type: String, required: false},
    quantity: {type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);