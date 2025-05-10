import { pool } from '../config.js';

const listarIngredientesQuery = async () => {
    try {
        const result = await pool.query('SELECT * FROM ingredientes ORDER BY nombre');
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const obtenerIngredientePorIdQuery = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM ingredientes WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const crearIngredienteQuery = async (ingrediente) => {
    const { nombre, stock, unidad, costo } = ingrediente;
    try {
        const result = await pool.query(
            'INSERT INTO ingredientes (nombre, stock, unidad, costo) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, stock, unidad, costo]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const actualizarIngredienteQuery = async (id, ingrediente) => {
    const { nombre, stock, unidad, costo } = ingrediente;
    try {
        const result = await pool.query(
            'UPDATE ingredientes SET nombre = $1, stock = $2, unidad = $3, costo = $4 WHERE id = $5 RETURNING *',
            [nombre, stock, unidad, costo, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const eliminarIngredienteQuery = async (id) => {
    try {
        const result = await pool.query('DELETE FROM ingredientes WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    listarIngredientesQuery,
    obtenerIngredientePorIdQuery,
    crearIngredienteQuery,
    actualizarIngredienteQuery,
    eliminarIngredienteQuery
};