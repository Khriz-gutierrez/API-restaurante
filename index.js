import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config.js'; // Ruta corregida

// Configurar variables de entorno
dotenv.config();

// Crear instancia de la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas de prueba y salud
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API Restaurante Operativa',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'OK',
      database: 'connected'
    });
  } catch (err) {
    res.status(503).json({
      status: 'ERROR',
      database: 'disconnected',
      error: err.message
    });
  }
});

// Rutas principales
import mesasRouter from './src/routes/mesasRoute.js';
import pedidosRouter from './src/routes/pedidosRouter.js';
import usuarioRouter from './src/routes/usuarioRouter.js';
import ingredientesRouter from './src/routes/ingredientesRouter.js';
import menuRouter from './src/routes/menuRouter.js';
import historialPedidosRouter from './src/routes/historialPedidosRouter.js';
import pedidoDetallesRouter from './src/routes/pedidoDetallesRouter.js';

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/mesas`, mesasRouter);
app.use(`${API_PREFIX}/pedidos`, pedidosRouter);
app.use(`${API_PREFIX}/pedidos/detalles`, pedidoDetallesRouter);
app.use(`${API_PREFIX}/historial`, historialPedidosRouter);
app.use(`${API_PREFIX}/usuarios`, usuarioRouter);
app.use(`${API_PREFIX}/ingredientes`, ingredientesRouter);
app.use(`${API_PREFIX}/menu`, menuRouter);

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicio del servidor
const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ================================
  🚀 Servidor iniciado en puerto ${PORT}
  ⏰ Hora: ${new Date().toLocaleTimeString()}
  🗄️  BD: ${process.env.DB_HOST ? 'Conectada' : 'No configurada'}
  ================================
  `);
});

// Configuraciones extra para Render
server.timeout = 60000;
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
