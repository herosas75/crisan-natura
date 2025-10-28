const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    ciclo: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Inventario', orderSchema);

module.exports = Order;