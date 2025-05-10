import {
    listarIngredientesQuery,
    obtenerIngredientePorIdQuery,
    crearIngredienteQuery,
    actualizarIngredienteQuery,
    eliminarIngredienteQuery
} from '../db/ingredientesQuery.js';

const listarIngredientes = async (req, res) => {
    try {
        const ingredientes = await listarIngredientesQuery();
        res.json(ingredientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar ingredientes', error: error.message });
    }
};

const obtenerIngrediente = async (req, res) => {
    try {
        const id = req.params.id;
        const ingrediente = await obtenerIngredientePorIdQuery(id);
        
        if (ingrediente) {
            res.json(ingrediente);
        } else {
            res.status(404).json({ mensaje: 'Ingrediente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener ingrediente', error: error.message });
    }
};

const crearIngrediente = async (req, res) => {
    try {
        const nuevoIngrediente = await crearIngredienteQuery(req.body);
        res.status(201).json(nuevoIngrediente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear ingrediente', error: error.message });
    }
};

const actualizarIngrediente = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredienteActualizado = await actualizarIngredienteQuery(id, req.body);
        
        if (ingredienteActualizado) {
            res.json(ingredienteActualizado);
        } else {
            res.status(404).json({ mensaje: 'Ingrediente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar ingrediente', error: error.message });
    }
};

const eliminarIngrediente = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredienteEliminado = await eliminarIngredienteQuery(id);
        
        if (ingredienteEliminado) {
            res.json({ mensaje: 'Ingrediente eliminado con éxito', id: ingredienteEliminado.id });
        } else {
            res.status(404).json({ mensaje: 'Ingrediente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar ingrediente', error: error.message });
    }
};

export {
    listarIngredientes,
    obtenerIngrediente,
    crearIngrediente,
    actualizarIngrediente,
    eliminarIngrediente
};