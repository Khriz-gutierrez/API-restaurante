import {
    listarTodosPedidosQuery,
    obtenerPedidoPorIdQuery,
    crearPedidoQuery,
    actualizarPedidoQuery,
    actualizarEstadoPedidoQuery,
    calcularTotalPedidoQuery,
    eliminarPedidoQuery
} from '../db/pedidosQuery.js';

const listarPedidos = async (req, res) => {
    try {
        // Obtener filtros de query params
        const { estado, desde, hasta, mesa } = req.query;
        const filtros = {};
        
        if (estado) filtros.estado = estado;
        if (desde) filtros.desde = desde;
        if (hasta) filtros.hasta = hasta;
        if (mesa) filtros.id_mesa = mesa;

        const pedidos = await listarTodosPedidosQuery(filtros);
        res.json(pedidos);
    } catch (error) {
        console.error('Error en listarPedidos:', error);
        res.status(500).json({ 
            mensaje: 'Error al obtener los pedidos', 
            error: error.message 
        });
    }
};

const obtenerPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await obtenerPedidoPorIdQuery(id);

        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.json(pedido);
    } catch (error) {
        console.error('Error en obtenerPedido:', error);
        res.status(500).json({ 
            mensaje: 'Error al obtener el pedido', 
            error: error.message 
        });
    }
};

const crearPedido = async (req, res) => {
    try {
        const { id_mesa, comensales } = req.body;
        const id_usuario = req.usuario.id; // Asume autenticación

        if (!id_mesa || !comensales) {
            return res.status(400).json({ 
                mensaje: 'Datos incompletos: id_mesa y comensales son requeridos' 
            });
        }

        const nuevoPedido = await crearPedidoQuery({ 
            id_mesa, 
            comensales, 
            id_usuario 
        });

        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error('Error en crearPedido:', error);
        res.status(500).json({ 
            mensaje: 'Error al crear el pedido', 
            error: error.message 
        });
    }
};

const actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_mesa, comensales, estado } = req.body;

        const pedidoActualizado = await actualizarPedidoQuery(id, { 
            id_mesa, 
            comensales, 
            estado 
        });

        if (!pedidoActualizado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        // Recalcular total si hay cambios relevantes
        await calcularTotalPedidoQuery(id);

        res.json(pedidoActualizado);
    } catch (error) {
        console.error('Error en actualizarPedido:', error);
        res.status(500).json({ 
            mensaje: 'Error al actualizar el pedido', 
            error: error.message 
        });
    }
};

const cambiarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const id_usuario = req.usuario.id;

        if (!estado) {
            return res.status(400).json({ 
                mensaje: 'El nuevo estado es requerido' 
            });
        }

        const pedidoActualizado = await actualizarEstadoPedidoQuery(
            id, 
            estado, 
            id_usuario
        );

        if (!pedidoActualizado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        // Recalcular total
        await calcularTotalPedidoQuery(id);

        res.json(pedidoActualizado);
    } catch (error) {
        console.error('Error en cambiarEstadoPedido:', error);
        res.status(500).json({ 
            mensaje: 'Error al cambiar estado del pedido', 
            error: error.message 
        });
    }
};

const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoEliminado = await eliminarPedidoQuery(id);

        if (!pedidoEliminado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.json({ 
            mensaje: 'Pedido eliminado correctamente', 
            id: pedidoEliminado.id 
        });
    } catch (error) {
        console.error('Error en eliminarPedido:', error);
        res.status(500).json({ 
            mensaje: 'Error al eliminar el pedido', 
            error: error.message 
        });
    }
};

export {
    listarPedidos,
    obtenerPedido,
    crearPedido,
    actualizarPedido,
    cambiarEstadoPedido,
    eliminarPedido
};