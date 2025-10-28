# crisan-natura

## Overview
CriSan Natura is a web-based application built with Node.js and MongoDB. It allows users to register clients and add orders, while providing a dashboard (Charts.js) to display total amounts by year.

## Features
- Register new clients with email and phone number.
- Add new orders with details such as client name, product, quantity, price, and cycle.
- View a dashboard that displays total amounts by year.

## Project Structure
```
natura-dashboard-web
├── src
│   ├── server.js                # Entry point of the application
│   ├── app.js                   # Initializes Express application and middleware
│   ├── controllers
│   │   ├── ordersController.js   # Logic for managing orders
│   │   ├── clientesController.js  # Logic for managing clients
│   ├── models
│   │   ├── Order.js              # Order model schema
│   │   └── Cliente.js            # Cliente model schema
│   ├── views
│   │   ├── cliente.ejs           # Client registration page template
│   │   ├── index.ejs             # Home page template
│   │   ├── clientes_grid.ejs     # Main Grid
│   │   └── pedido                # Order addition page template
│   └── public
│       ├── css
│       │   └── natura.css        # CSS styles for the application
├── .env.example                  # Example environment configuration
├── .gitignore                    # Git ignore file
├── package.json                  # npm configuration file
└── README.md                     # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd crisan-natura
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file and configure your MongoDB connection.

## Usage
To start the application, run:
```
npm start
```
Visit `http://localhost:5000` in your web browser to access the application.