import {
    listarIngredientesMenuItemQuery,
    agregarIngredienteMenuItemQuery,
    actualizarIngredienteMenuItemQuery,
    eliminarIngredienteMenuItemQuery
} from '../queries/menuItemIngredientesQuery.js';

const listarIngredientesMenuItem = async (req, res) => {
    try {
        const id_menu_item = req.params.id_menu_item;
        const ingredientes = await listarIngredientesMenuItemQuery(id_menu_item);
        res.json(ingredientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar ingredientes del item', error: error.message });
    }
};

const agregarIngredienteMenuItem = async (req, res) => {
    try {
        const id_menu_item = req.params.id_menu_item;
        const { id_ingrediente, cantidad } = req.body;
        
        const nuevoIngrediente = await agregarIngredienteMenuItemQuery(
            id_menu_item,
            id_ingrediente,
            cantidad
        );
        
        res.status(201).json(nuevoIngrediente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar ingrediente al item', error: error.message });
    }
};

const actualizarIngredienteMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { cantidad } = req.body;
        
        const ingredienteActualizado = await actualizarIngredienteMenuItemQuery(
            id,
            cantidad
        );
        
        if (ingredienteActualizado) {
            res.json(ingredienteActualizado);
        } else {
            res.status(404).json({ mensaje: 'Relación ingrediente-item no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar ingrediente del item', error: error.message });
    }
};

const eliminarIngredienteMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const ingredienteEliminado = await eliminarIngredienteMenuItemQuery(id);
        
        if (ingredienteEliminado) {
            res.json({ mensaje: 'Ingrediente eliminado del item con éxito', id: ingredienteEliminado.id });
        } else {
            res.status(404).json({ mensaje: 'Relación ingrediente-item no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar ingrediente del item', error: error.message });
    }
};

export {
    listarIngredientesMenuItem,
    agregarIngredienteMenuItem,
    actualizarIngredienteMenuItem,
    eliminarIngredienteMenuItem
};