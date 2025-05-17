import { Router } from 'express';
import {
  obtenerDetalles,
  crearPedidoDetalles,
  eliminarPedidoDetalles
} from '../controllers/pedidoDetallesController.js';

const router = Router();

router.get('/:id', obtenerDetalles);
router.post('/', crearPedidoDetalles);
router.delete('/:id', eliminarPedidoDetalles);

export default router;
