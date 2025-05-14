import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    // Configuración SSL CORRECTA para Render:
    ssl: {
        rejectUnauthorized: false // ← Esto es crucial
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    // Añade esto para mejor manejo de conexiones:
    allowExitOnIdle: true
});

// Test the connection (versión mejorada)
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error de conexión a PostgreSQL:', {
            code: err.code,
            message: err.message
        });
        
        // Errores comunes específicos
        if (err.code === 'ECONNREFUSED') {
            console.error('Solución: Verifica que la BD esté activa en Render y el puerto sea 5432');
        }
        else if (err.code === 'ETIMEDOUT') {
            console.error('Solución: Aumenta connectionTimeoutMillis o verifica tu conexión a internet');
        }
        else if (err.code === '28P01') {
            console.error('Solución: Revisa el usuario y contraseña en el .env');
        }
    } else {
        console.log('✅ PostgreSQL conectado correctamente. Hora actual:', res.rows[0].now);
    }
});

export { pool };