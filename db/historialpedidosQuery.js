import { pool } from '../config.js';

const listarHistorialPedidoQuery = async (id_pedido) => {
    try {
        const result = await pool.query(
            `SELECT * 
             FROM historial_pedidos 
             WHERE id_pedido = $1 
             ORDER BY fecha_cambio DESC`,
            [id_pedido]
        );
        return result.rows;
    } catch (err) {
        console.error('Error en historialPedidosQuery:', err.message);
        throw err;
    }
};

export { listarHistorialPedidoQuery };




