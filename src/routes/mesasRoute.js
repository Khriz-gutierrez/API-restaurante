import { Router } from 'express';

import {
    listarTodasMesas,
    listarMesaPorNumero,
    crearMesa,
    actualizarMesa,
    eliminarMesa
} from '../../controllers/mesasController.js';

const mesaRouter = Router();

mesaRouter.get('/', listarTodasMesas);
mesaRouter.get('/:numero', listarMesaPorNumero);
mesaRouter.post('/', crearMesa);
mesaRouter.put('/:numero', actualizarMesa);
mesaRouter.delete('/:numero', eliminarMesa);

export default mesaRouter;