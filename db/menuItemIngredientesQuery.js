import { pool } from '../config.js';

const listarIngredientesMenuItemQuery = async (id_menu_item) => {
    try {
        const result = await pool.query(
            `SELECT mi.*, i.nombre as ingrediente_nombre, i.unidad
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

const agregarIngredienteMenuItemQuery = async (id_menu_item, id_ingrediente, cantidad) => {
    try {
        const result = await pool.query(
            `INSERT INTO menu_item_ingredientes 
             (id_menu_item, id_ingrediente, cantidad) 
             VALUES ($1, $2, $3) RETURNING *`,
            [id_menu_item, id_ingrediente, cantidad]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const actualizarIngredienteMenuItemQuery = async (id, cantidad) => {
    try {
        const result = await pool.query(
            'UPDATE menu_item_ingredientes SET cantidad = $1 WHERE id = $2 RETURNING *',
            [cantidad, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const eliminarIngredienteMenuItemQuery = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM menu_item_ingredientes WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    listarIngredientesMenuItemQuery,
    agregarIngredienteMenuItemQuery,
    actualizarIngredienteMenuItemQuery,
    eliminarIngredienteMenuItemQuery
};