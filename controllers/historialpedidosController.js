import { listarHistorialPedidoQuery } from '../db/historialPedidosQuery.js'; 

const listarHistorialPedido = async (req, res) => {
    try {
        const id_pedido = req.params.id_pedido;
        const historial = await listarHistorialPedidoQuery(id_pedido);
        res.json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar historial del pedido', error: error.message });
    }
};

export {
    listarHistorialPedido
};