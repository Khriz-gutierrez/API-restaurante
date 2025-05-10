import {
    listarMenuItemsQuery,
    obtenerMenuItemPorIdQuery,
    crearMenuItemQuery,
    actualizarMenuItemQuery,
    eliminarMenuItemQuery,
    obtenerIngredientesMenuItemQuery
} from '../db/menuQuery.js';

const listarMenuItems = async (req, res) => {
    try {
        const menuItems = await listarMenuItemsQuery();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar items del menú', error: error.message });
    }
};

const obtenerMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const menuItem = await obtenerMenuItemPorIdQuery(id);
        
        if (menuItem) {
            // Obtener ingredientes del item
            const ingredientes = await obtenerIngredientesMenuItemQuery(id);
            res.json({ ...menuItem, ingredientes });
        } else {
            res.status(404).json({ mensaje: 'Item del menú no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener item del menú', error: error.message });
    }
};

const crearMenuItem = async (req, res) => {
    try {
        const nuevoMenuItem = await crearMenuItemQuery(req.body);
        res.status(201).json(nuevoMenuItem);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear item del menú', error: error.message });
    }
};

const actualizarMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const menuItemActualizado = await actualizarMenuItemQuery(id, req.body);
        
        if (menuItemActualizado) {
            res.json(menuItemActualizado);
        } else {
            res.status(404).json({ mensaje: 'Item del menú no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar item del menú', error: error.message });
    }
};

const eliminarMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const menuItemEliminado = await eliminarMenuItemQuery(id);
        
        if (menuItemEliminado) {
            res.json({ mensaje: 'Item del menú eliminado con éxito', id: menuItemEliminado.id });
        } else {
            res.status(404).json({ mensaje: 'Item del menú no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar item del menú', error: error.message });
    }
};

export {
    listarMenuItems,
    obtenerMenuItem,
    crearMenuItem,
    actualizarMenuItem,
    eliminarMenuItem
};