import { pool } from '../config.js';  // Cambiar config por pool

const listarTodasMesasQuery = async () => {
    try {
        const result = await pool.query('SELECT * FROM mesas');  // Usar pool en lugar de config
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const listarMesaPorNumeroQuery = async (numero) => {
    try {
        const result = await pool.query('SELECT * FROM mesas WHERE numero = $1 LIMIT 1', [numero]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
};


const crearMesaQuery = async (mesa) => {
    const { numero, capacidad, estado } = mesa;
    try {
        const result = await pool.query(
            'INSERT INTO mesas (numero, capacidad, estado) VALUES ($1, $2, $3) RETURNING *',
            [numero, capacidad, estado || 'disponible'] // Estado por defecto
        );
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const actualizarMesaQuery = async (numero, mesa) => {
    const { capacidad, estado } = mesa;
    try {
        const result = await pool.query(
            'UPDATE mesas SET capacidad = $1, estado = $2 WHERE numero = $3 RETURNING *',
            [capacidad, estado, numero]
        );
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const eliminarMesaQuery = async (numero) => {
    try {
        const result = await pool.query(
            'DELETE FROM mesas WHERE numero = $1 RETURNING *',
            [numero]
        );
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodasMesasQuery,
    listarMesaPorNumeroQuery,
    crearMesaQuery,
    actualizarMesaQuery,
    eliminarMesaQuery   
};