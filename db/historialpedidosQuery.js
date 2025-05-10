import { pool } from '../config.js';

const listarHistorialPedidoQuery = async (id_pedido) => {
    try {
        const result = await pool.query(
            `SELECT h.*, u.nombre as usuario_nombre
             FROM historial_pedidos h
             LEFT JOIN usuarios u ON h.id_usuario = u.id
             WHERE h.id_pedido = $1
             ORDER BY h.fecha_cambio DESC`,
            [id_pedido]
        );
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    listarHistorialPedidoQuery
};