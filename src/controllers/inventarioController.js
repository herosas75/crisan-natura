const Inventario = require('../models/Inventario');

class InventarioController {
    // Register a new inventario Item
    async register(InventarioData) {
        const newInventario = new Inventario(InventarioData);
        await newInventario.save();
    }

    // Delete a inventario item
    async delete(id) {
        return await Inventario.findByIdAndDelete(id);
    }

    // Get all productos in inventario
    async getInventario() {
        return await Inventario.find();
    }
}

module.exports = InventarioController;