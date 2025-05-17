import { Router } from 'express';
import {
    listarIngredientesMenuItem,
    agregarIngredienteMenuItem,
    actualizarIngredienteMenuItem,
    eliminarIngredienteMenuItem
} from '../controllers/menuItemIngredientesController.js';
import { autenticar, autorizar } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:id_menu_item/ingredientes', listarIngredientesMenuItem);
router.post('/:id_menu_item/ingredientes', autenticar, autorizar(['admin', 'chef']), agregarIngredienteMenuItem);
router.put('/ingredientes/:id', autenticar, autorizar(['admin', 'chef']), actualizarIngredienteMenuItem);
router.delete('/ingredientes/:id', autenticar, autorizar(['admin', 'chef']), eliminarIngredienteMenuItem);

export default router;