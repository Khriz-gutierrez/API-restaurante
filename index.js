import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

// Import routers
import mesasRouter from './src/routes/mesasRoute.js';
import pedidosRouter from './src/routes/pedidosRouter.js';
import usuarioRouter from './src/routes/usuarioRouter.js'; 
import ingredientesRouter from './src/routes/ingredientesRouter.js';
import menuRouter from './src/routes/menuRouter.js';
import historialPedidosRouter from './src/routes/historialPedidosRouter.js';
import pedidoDetallesRouter from './src/routes/pedidoDetallesRouter.js';  // CORRECCIÓN: Asegúrate de importar este archivo

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/mesas', mesasRouter);
app.use('/pedidos', pedidosRouter);  // Ruta para pedidos
app.use('/pedidos/detalles', pedidoDetallesRouter);  // CORRECCIÓN: Añadir /detalles como ruta para los detalles de los pedidos
app.use('/pedidos', historialPedidosRouter);
app.use('/usuarios', usuarioRouter);
app.use('/ingredientes', ingredientesRouter);
app.use('/menu', menuRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
