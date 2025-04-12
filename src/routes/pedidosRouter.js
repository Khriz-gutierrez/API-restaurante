import { Router } from 'express';
const router = Router();

// Rutas básicas como ejemplo
router.get('/', (req, res) => {
    res.json({ message: "Ruta de pedidos funcionando" });
});

export default router;