import { Router } from 'express';
import {
    listarTodosUsuarios,
    listarUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario
} from '../controllers/usuariosController.js';

const usuarioRouter = Router();

// Rutas públicas
usuarioRouter.post('/login', loginUsuario);

// Rutas protegidas (requieren autenticación)
usuarioRouter.get('/', listarTodosUsuarios);
usuarioRouter.get('/:id', listarUsuarioPorId);
usuarioRouter.post('/', crearUsuario);
usuarioRouter.put('/:id', actualizarUsuario);
usuarioRouter.delete('/:id', eliminarUsuario);

export default usuarioRouter;