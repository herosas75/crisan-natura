const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
    },
    telefono: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;