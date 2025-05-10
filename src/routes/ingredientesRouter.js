import { Router } from 'express';
import {
    listarIngredientes,
    obtenerIngrediente,
    crearIngrediente,
    actualizarIngrediente,
    eliminarIngrediente
} from '../../controllers/ingredientesController.js';

const router = Router();

router.get('/', listarIngredientes);
router.get('/:id', obtenerIngrediente);
router.post('/', crearIngrediente);
router.put('/:id', actualizarIngrediente);
router.delete('/:id', eliminarIngrediente);

export default router;
