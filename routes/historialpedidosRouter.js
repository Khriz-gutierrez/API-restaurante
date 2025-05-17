import { Router } from 'express';
import { listarHistorialPedido } from '../controllers/historialpedidosController.js';

const router = Router();

router.get('/:id_pedido/historial', listarHistorialPedido);

export default router;
