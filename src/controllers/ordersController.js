const Order = require('../models/Order');

class OrdersController {
    async addOrder(orderData) {
        const order = new Order(orderData);
        await order.save();
    }

    async getOrders() {
        return await Order.find();
    }

    async getOrdersbyCliente(clienteId) {
        return await Order.find({ cliente: clienteId });
    }

    async getProductosByName(productoName) {
        const searchTerm = productoName;
        const pipeline = [
            {
                $search: {
                    index: "producto", // Name of your Atlas Search index
                    autocomplete: {
                        query: searchTerm,
                        path: "producto", // Fields to search within
                    },
                    //text: {
                    //    query: searchTerm,
                    //    path: ["cliente", "producto", "createdAt"] // Fields to search within
                    //}

                }
            },
            {
                $sort: {
                    cliente: 1,
                }
            },
            {
                $project: {
                    _id: 0,
                    cliente: 1,
                    producto: 1,
                    createdAt: 1
                }
            },
        ];

        return await Order.aggregate(pipeline);
    }

    async getTotalbyCliente(clienteId) {
        const result = await Order.aggregate([
            { $match: { cliente: clienteId } },
            {
                $group: {
                    _id: "$cliente", // <-- required field for $group
                    totalAmount: { $sum: { $ifNull: ["$total", 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    cliente: "$_id",
                    totalAmount: 1
                }
            },
            {
                $sort: { cliente: 1 }
            }
        ]);

        //return result.length > 0 ? result[0].totalAmount : 0;
        return result;
    }

    async getUltimaVentabyCliente(clienteId) {
        const result = await Order.aggregate([
            { $match: { cliente: clienteId } },
            { $sort: { createdAt: -1 } }, // Sort by createdDate in descending order
            { $limit: 1 } // Limit to the first (most recent) document
        ]);
        return result;
    }

    async editOrder(id, updatedData) {
        return await Order.findByIdAndUpdate(id, updatedData, { new: true });
    }
}

module.exports = OrdersController;
