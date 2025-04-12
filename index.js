import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config()

const app = express()

import mesasRouter from './src/routes/mesasRoute.js';
import pedidosRouter from './src/routes/pedidosRouter.js';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//Usar las rutas
app.use('/mesas', mesasRouter); // MESAS
app.use('/pedidos', pedidosRouter); // PEDIDOS

const port =
    process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Directorio actual:', __dirname);