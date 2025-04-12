import {
    listarTodasMesasQuery,
    listarMesaPorNumeroQuery,
    crearMesaQuery,
    actualizarMesaQuery,
    eliminarMesaQuery
} from "../db/mesasQuery.js";


// Mejorar manejo de errores
const listarTodasMesas = async (req, res) => {
    try {
        const mesas = await listarTodasMesasQuery();
        res.status(200).json({
            success: true,
            data: mesas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener mesas',
            error: error.message
        });
    }
};

/**
 * Obtener la mesa con el número especificado en la query / url
 * @param {*} req 
 * @param {*} res 
 */
const listarMesaPorNumero = async (req, res) => { 
    try {
        const mesa = await listarMesaPorNumeroQuery(req.params.numero);
        if (mesa.length === 0) {
            return res.status(404).json({ mensaje: 'Mesa no encontrada' });
        }
        res.json(mesa[0]);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * Crear una nueva mesa
 */
const crearMesa = async (req, res) => {
    console.log(req.body);
    try {
        const datosMesa = {
            numero: req.body.numero,
            capacidad: req.body.capacidad,
            estado: req.body.estado || 'disponible' // Valor por defecto
        };
        const resultado = await crearMesaQuery(datosMesa);
        res.json({ 
            mensaje: 'Mesa creada con éxito', 
            numero: resultado.rows[0].numero 
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * Actualizar los datos de una mesa
 */
const actualizarMesa = async (req, res) => {
    try {
        const numero = req.params.numero;
        const datosMesa = req.body;
        const resultado = await actualizarMesaQuery(numero, datosMesa);
        if (resultado.rowCount > 0) {
            res.json({ 
                mensaje: 'Mesa actualizada con éxito', 
                numero: numero 
            });
        } else {
            res.status(404).json({ mensaje: 'Mesa no encontrada' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * Eliminar una mesa
 */
const eliminarMesa = async (req, res) => {
    try {
        const numero = req.params.numero;
        const resultado = await eliminarMesaQuery(numero);
        if (resultado.rowCount > 0) {
            res.json({ mensaje: 'Mesa eliminada con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Mesa no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al eliminar la mesa', 
            error: error.message 
        });
    }
};

export {
    listarTodasMesas,
    listarMesaPorNumero,
    crearMesa,
    actualizarMesa,
    eliminarMesa,
};