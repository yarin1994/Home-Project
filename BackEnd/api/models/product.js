const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    img: {type: String, required: false},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);