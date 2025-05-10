import { pool } from '../config.js';

const listarMenuItemsQuery = async () => {
    try {
        const result = await pool.query('SELECT * FROM menu_items ORDER BY nombre');
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const obtenerMenuItemPorIdQuery = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const crearMenuItemQuery = async (menuItem) => {
    const { nombre, descripcion, precio, categoria } = menuItem;
    try {
        const result = await pool.query(
            'INSERT INTO menu_items (nombre, descripcion, precio, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, descripcion, precio, categoria]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const actualizarMenuItemQuery = async (id, menuItem) => {
    const { nombre, descripcion, precio, categoria, activo } = menuItem;
    try {
        const result = await pool.query(
            'UPDATE menu_items SET nombre = $1, descripcion = $2, precio = $3, categoria = $4, activo = $5 WHERE id = $6 RETURNING *',
            [nombre, descripcion, precio, categoria, activo, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const eliminarMenuItemQuery = async (id) => {
    try {
        const result = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const obtenerIngredientesMenuItemQuery = async (id_menu_item) => {
    try {
        const result = await pool.query(
            `SELECT i.id, i.nombre, mi.cantidad, i.unidad 
             FROM menu_item_ingredientes mi
             JOIN ingredientes i ON mi.id_ingrediente = i.id
             WHERE mi.id_menu_item = $1`,
            [id_menu_item]
        );
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    listarMenuItemsQuery,
    obtenerMenuItemPorIdQuery,
    crearMenuItemQuery,
    actualizarMenuItemQuery,
    eliminarMenuItemQuery,
    obtenerIngredientesMenuItemQuery
};