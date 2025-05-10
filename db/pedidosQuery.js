import { pool } from '../config.js';

const listarTodosPedidosQuery = async (filtros = {}) => {
    try {
        let query = `
            SELECT p.*, 
                   m.numero as mesa_numero,
                   u.nombre as usuario_nombre,
                   COUNT(pd.id) as items_count,
                   SUM(pd.cantidad * pd.precio_unitario) as total_calculado
            FROM pedidos p
            LEFT JOIN mesas m ON p.id_mesa = m.numero
            LEFT JOIN usuarios u ON p.id_usuario = u.id
            LEFT JOIN pedido_detalles pd ON p.id = pd.id_pedido
        `;

        const condiciones = [];
        const valores = [];
        let contador = 1;

        // Filtros
        if (filtros.estado) {
            condiciones.push(`p.estado = $${contador}`);
            valores.push(filtros.estado);
            contador++;
        }

        if (filtros.desde) {
            condiciones.push(`p.fecha >= $${contador}`);
            valores.push(filtros.desde);
            contador++;
        }

        if (filtros.hasta) {
            condiciones.push(`p.fecha <= $${contador}`);
            valores.push(filtros.hasta);
            contador++;
        }

        if (filtros.id_mesa) {
            condiciones.push(`p.id_mesa = $${contador}`);
            valores.push(filtros.id_mesa);
            contador++;
        }

        if (condiciones.length > 0) {
            query += ` WHERE ${condiciones.join(' AND ')}`;
        }

        query += ` GROUP BY p.id, m.numero, u.nombre ORDER BY p.fecha DESC`;

        const result = await pool.query(query, valores);
        return result.rows;
    } catch (err) {
        console.error('Error en listarTodosPedidosQuery:', err);
        throw err;
    }
};

const obtenerPedidoPorIdQuery = async (id) => {
    try {
        const query = `
            SELECT p.*, 
                   m.numero as mesa_numero,
                   u.nombre as usuario_nombre
            FROM pedidos p
            LEFT JOIN mesas m ON p.id_mesa = m.numero
            LEFT JOIN usuarios u ON p.id_usuario = u.id
            WHERE p.id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error en obtenerPedidoPorIdQuery:', err);
        throw err;
    }
};

const crearPedidoQuery = async (pedido) => {
    const { id_mesa, comensales, id_usuario, estado = 'pendiente' } = pedido;
    try {
        const result = await pool.query(
            `INSERT INTO pedidos 
             (id_mesa, comensales, id_usuario, estado) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [id_mesa, comensales, id_usuario, estado]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error en crearPedidoQuery:', err);
        throw err;
    }
};

const actualizarPedidoQuery = async (id, pedido) => {
    const { id_mesa, comensales, estado } = pedido;
    try {
        const result = await pool.query(
            `UPDATE pedidos 
             SET id_mesa = $1, comensales = $2, estado = $3 
             WHERE id = $4 
             RETURNING *`,
            [id_mesa, comensales, estado, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error en actualizarPedidoQuery:', err);
        throw err;
    }
};

const actualizarEstadoPedidoQuery = async (id, nuevoEstado, id_usuario) => {
    try {
        // Obtener estado actual para el historial
        const estadoActual = await pool.query(
            'SELECT estado FROM pedidos WHERE id = $1', 
            [id]
        );

        if (estadoActual.rows.length === 0) {
            throw new Error('Pedido no encontrado');
        }

        // Actualizar estado del pedido
        const result = await pool.query(
            `UPDATE pedidos 
             SET estado = $1 
             WHERE id = $2 
             RETURNING *`,
            [nuevoEstado, id]
        );

        // Registrar en historial
        await pool.query(
            `INSERT INTO historial_pedidos 
             (id_pedido, estado_anterior, estado_nuevo, id_usuario) 
             VALUES ($1, $2, $3, $4)`,
            [id, estadoActual.rows[0].estado, nuevoEstado, id_usuario]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Error en actualizarEstadoPedidoQuery:', err);
        throw err;
    }
};

const calcularTotalPedidoQuery = async (id_pedido) => {
    try {
        const result = await pool.query(
            `UPDATE pedidos 
             SET total = (
                 SELECT COALESCE(SUM(cantidad * precio_unitario), 0) 
                 FROM pedido_detalles 
                 WHERE id_pedido = $1
             ) 
             WHERE id = $1 
             RETURNING total`,
            [id_pedido]
        );
        return result.rows[0].total;
    } catch (err) {
        console.error('Error en calcularTotalPedidoQuery:', err);
        throw err;
    }
};

const eliminarPedidoQuery = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM pedidos WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error en eliminarPedidoQuery:', err);
        throw err;
    }
};

export {
    listarTodosPedidosQuery,
    obtenerPedidoPorIdQuery,
    crearPedidoQuery,
    actualizarPedidoQuery,
    actualizarEstadoPedidoQuery,
    calcularTotalPedidoQuery,
    eliminarPedidoQuery
};