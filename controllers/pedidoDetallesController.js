import { obtenerDetallesDePedido, crearPedidoDetalle, eliminarPedidoDetalle } from '../db/pedidoDetallesQuery.js';

// Obtener los detalles de un pedido específico
const obtenerDetalles = async (req, res) => {
    try {
        const { id } = req.params;  // 'id' es el ID del pedido
        const detalles = await obtenerDetallesDePedido(id);

        if (detalles.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron detalles para este pedido' });
        }

        res.status(200).json(detalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los detalles del pedido', error: error.message });
    }
};

// Crear un nuevo detalle de pedido
const crearPedidoDetalles = async (req, res) => {
    try {
        const { pedidoId, menuItemId, cantidad, precioUnitario, notas } = req.body;

        if (!pedidoId || !menuItemId || !cantidad || !precioUnitario) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const nuevoDetalle = await crearPedidoDetalle(pedidoId, menuItemId, cantidad, precioUnitario, notas);
        res.status(201).json(nuevoDetalle);  // Responde con el detalle creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el detalle del pedido', error: error.message });
    }
};

// Eliminar un detalle de pedido
const eliminarPedidoDetalles = async (req, res) => {
    try {
        const { id } = req.params;  // 'id' es el ID del detalle
        const detalleEliminado = await eliminarPedidoDetalle(id);

        if (!detalleEliminado) {
            return res.status(404).json({ mensaje: 'Detalle de pedido no encontrado' });
        }

        res.status(200).json({ mensaje: 'Detalle de pedido eliminado', id: detalleEliminado.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el detalle del pedido', error: error.message });
    }
};

export { obtenerDetalles, crearPedidoDetalles, eliminarPedidoDetalles };
