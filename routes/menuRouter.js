import { Router } from 'express';
import {
    listarMenuItems,
    obtenerMenuItem,
    crearMenuItem,
    actualizarMenuItem,
    eliminarMenuItem
} from '../controllers/menuController.js';

const router = Router();

router.get('/', listarMenuItems);
router.get('/:id', obtenerMenuItem);
router.post('/', crearMenuItem);
router.put('/:id', actualizarMenuItem);
router.delete('/:id', eliminarMenuItem);

export default router;
