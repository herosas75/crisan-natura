const Cliente = require('../models/Cliente');

class ClientesController {
    // Register a new cliente
    async register(clienteData) {
        const newCliente = new Cliente(clienteData);
        await newCliente.save();
    }

    //Edit a cliente
    async edit(id, updatedData) {
        return await Cliente.findByIdAndUpdate(id, updatedData, { new: true });
    }

    // Delete a cliente
    async delete(id) {
        return await Cliente.findByIdAndDelete(id);
    }
    /*
        // Get all clientes
        async getClientes() {
            return await Cliente.find();
        }
    */

    // Get all clientes with total order amount and last order date
    async getClientes() {
        return await Cliente.aggregate([
            {
                $lookup: {
                    from: "pedidos",
                    let: { clienteId: "$nombre" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$cliente", "$$clienteId"] } } },
                        {
                            $group: {
                                _id: null,
                                totalOrderAmount: { $sum: "$total" },
                                lastOrderDate: { $max: "$createdAt" }
                            }
                        }
                    ],
                    as: "orderStats"
                }
            },
            {
                $unwind: {
                    path: "$orderStats",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    nombre: 1,
                    email: 1,
                    telefono: 1,
                    direccion: 1,
                    totalOrderAmount: "$orderStats.totalOrderAmount",
                    lastOrderDate: "$orderStats.lastOrderDate"
                }
            }

        ])
    }
}

module.exports = ClientesController;