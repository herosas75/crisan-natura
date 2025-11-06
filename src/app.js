const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ClientesController = require('./controllers/clientesController');
const OrdersController = require('./controllers/ordersController');
const InventarioController = require('./controllers/inventarioController');

const controllerCliente = new ClientesController();
const controllerOrder = new OrdersController();
const controllerInventario = new InventarioController();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse incoming request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Home Route to display index.ejs
app.get('/', (req, res) => {
    res.render('index'); // Renders 'index.ejs'
});

// Cliente Routes
app.get('/cliente', (req, res) => {
    res.render('cliente'); // Renders 'clientes.ejs'
});

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await controllerCliente.getClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/cliente/register', async (req, res) => {
    try {
        const clienteData = req.body;
        const savedCliente = await controllerCliente.register(clienteData);
        res.status(201).json({ message: 'Cliente registrado!', cliente: savedCliente });

    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.put('/cliente/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCliente = await controllerCliente.edit(id, updatedData);
        res.status(200).json({ message: 'Cliente actualizado', cliente: updatedCliente });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.delete('/cliente/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await controllerCliente.delete(id);
        res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// Order Routes
app.get('/pedido'), async (req, res) => {
    res.render('pedido'); // Renders 'pedido.ejs'
};

app.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await controllerOrder.getOrders();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.get('/buscar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pedidos = await controllerOrder.getProductosByName(id);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.post('/pedido/register', async (req, res) => {
    try {
        const pedidoData = req.body;
        const savedPedido = await controllerOrder.addOrder(pedidoData);
        res.status(201).json({ message: 'Pedido registrado', pedido: savedPedido });

    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.put('/pedido/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPedido = await controllerOrder.editOrder(id, updatedData);
        res.status(200).json({ message: 'Pedido actualizado', pedido: updatedData });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.get('/pedidos/pedidos-by-cliente/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pedidosByCliente = await controllerOrder.getOrdersbyCliente(id);
        res.status(200).json(pedidosByCliente);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

module.exports = app;
