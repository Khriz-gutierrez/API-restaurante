import { Router } from 'express';
import {
    listarPedidos,
    obtenerPedido,
    crearPedido,
    actualizarPedido,
    cambiarEstadoPedido,
    eliminarPedido
} from '../controllers/pedidosController.js';

const router = Router();

// Obtener todos los pedidos (con filtros opcionales)
router.get('/', listarPedidos);

// Obtener un pedido específico
router.get('/:id', obtenerPedido);

// Crear un nuevo pedido
router.post('/', crearPedido);

// Actualizar un pedido (datos generales)
router.put('/:id', actualizarPedido);

// Cambiar estado de un pedido
router.patch('/:id/estado', cambiarEstadoPedido);

// Eliminar un pedido
router.delete('/:id', eliminarPedido);

export default router;



