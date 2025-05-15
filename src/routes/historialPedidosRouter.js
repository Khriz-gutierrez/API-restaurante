import { Router } from 'express';
import { listarHistorialPedido } from '../../controllers/historialPedidosController.js';  // Corregir la ruta

const router = Router();

router.get('/:id_pedido/historial', listarHistorialPedido);

export default router;
