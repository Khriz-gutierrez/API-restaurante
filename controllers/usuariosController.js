import {
    listarTodosUsuariosQuery,
    listarUsuarioPorIdQuery,
    crearUsuarioQuery,
    actualizarUsuarioQuery,
    eliminarUsuarioQuery,
    loginUsuarioQuery
} from '../db/usuariosQuery.js';

const listarTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await listarTodosUsuariosQuery();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar usuarios', error: error.message });
    }
};

const listarUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await listarUsuarioPorIdQuery(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar usuario', error: error.message });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        const usuarioCreado = await crearUsuarioQuery(nuevoUsuario);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const datosUsuario = req.body;
        const usuarioActualizado = await actualizarUsuarioQuery(id, datosUsuario);
        if (usuarioActualizado) {
            res.json(usuarioActualizado);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioEliminado = await eliminarUsuarioQuery(id);
        if (usuarioEliminado) {
            res.json({ mensaje: 'Usuario eliminado con éxito', id: usuarioEliminado.id });
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        const usuarioAutenticado = await loginUsuarioQuery(usuario, contrasena);
        if (usuarioAutenticado) {
            res.json(usuarioAutenticado);
        } else {
            res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el login', error: error.message });
    }
};

export {
    listarTodosUsuarios,
    listarUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario
};