import { pool } from '../config.js';
import bcrypt from 'bcrypt';

const listarTodosUsuariosQuery = async () => {
    try {
        const result = await pool.query('SELECT id, nombre, rol, usuario FROM usuarios');
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const listarUsuarioPorIdQuery = async (id) => {
    try {
        const result = await pool.query('SELECT id, nombre, rol, usuario FROM usuarios WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const crearUsuarioQuery = async (usuario) => {
    const { nombre, rol, usuario: username, contrasena } = usuario;
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, rol, usuario, contrasena) VALUES ($1, $2, $3, $4) RETURNING id, nombre, rol, usuario',
            [nombre, rol, username, hashedPassword]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const actualizarUsuarioQuery = async (id, usuario) => {
    const { nombre, rol, usuario: username, contrasena } = usuario;
    try {
        let query;
        let params;
        
        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            query = 'UPDATE usuarios SET nombre = $1, rol = $2, usuario = $3, contrasena = $4 WHERE id = $5 RETURNING id, nombre, rol, usuario';
            params = [nombre, rol, username, hashedPassword, id];
        } else {
            query = 'UPDATE usuarios SET nombre = $1, rol = $2, usuario = $3 WHERE id = $4 RETURNING id, nombre, rol, usuario';
            params = [nombre, rol, username, id];
        }
        
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const eliminarUsuarioQuery = async (id) => {
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const loginUsuarioQuery = async (usuario, contrasena) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
        if (result.rows.length === 0) {
            return null;
        }
        
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
        
        if (passwordMatch) {
            return {
                id: user.id,
                nombre: user.nombre,
                rol: user.rol,
                usuario: user.usuario
            };
        }
        return null;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    listarTodosUsuariosQuery,
    listarUsuarioPorIdQuery,
    crearUsuarioQuery,
    actualizarUsuarioQuery,
    eliminarUsuarioQuery,
    loginUsuarioQuery
};