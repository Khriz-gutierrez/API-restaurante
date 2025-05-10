import { pool } from '../config.js'; // 
 // Asegúrate de tener la configuración de la base de datos en config.js

// Obtener todos los detalles de un pedido
const obtenerDetallesDePedido = async (pedidoId) => {
    const query = 'SELECT * FROM pedido_detalles WHERE id_pedido = $1';
    const result = await pool.query(query, [pedidoId]);
    return result.rows;
};

// Crear un detalle de pedido
const crearPedidoDetalle = async (pedidoId, menuItemId, cantidad, precioUnitario, notas) => {
    const query = `
        INSERT INTO pedido_detalles (id_pedido, id_menu_item, cantidad, precio_unitario, notas)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const { rows } = await pool.query(query, [pedidoId, menuItemId, cantidad, precioUnitario, notas]);
    return rows[0];  // Retorna el detalle de pedido creado
};

// Eliminar un detalle de pedido
const eliminarPedidoDetalle = async (id) => {
    const query = 'DELETE FROM pedido_detalles WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Retorna el detalle eliminado
};

export { obtenerDetallesDePedido, crearPedidoDetalle, eliminarPedidoDetalle };
