# 🍽️ API-Restaurante

**Sistema de gestión de restaurante**  
Aplicación para administrar pedidos, mesas y menús en establecimientos de comida. Facilita la toma de órdenes, la gestión de inventario de ingredientes y la generación de cuentas para los clientes.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Render** (para despliegue)
- **pg** (para conexión a la base de datos)
- **dotenv** (manejo de variables de entorno)

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   cd API-RESTAURANTE

Instala las dependencias:

bash
Copiar
Editar
npm install
Crea un archivo .env en la raíz con las siguientes variables:

env
Copiar
Editar
PORT=10000
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_PORT=...
Ejecuta el proyecto en modo desarrollo:

bash
Copiar
Editar
npm run dev
🔌 Conexión a base de datos
La conexión a PostgreSQL está gestionada desde el archivo config.js, utilizando el paquete pg y las variables del archivo .env.

📁 Estructura del proyecto
arduino
Copiar
Editar
API-RESTAURANTE/
│
├── controllers/
│   ├── ingredientesController.js
│   ├── mesasController.js
│   ├── menuItemIngredientesController.js
│   ├── menuController.js
│   ├── pedidoDetallesController.js
│   ├── pedidosController.js
│   └── usuariosController.js
│
├── db/
│   ├── ingredientesQuery.js
│   ├── historialPedidosQuery.js
│   ├── mesaQuery.js
│   ├── menuItemIngredientesQuery.js
│   ├── menuQuery.js
│   ├── pedidoDetallesQuery.js
│   ├── pedidosQuery.js
│   └── usuariosQuery.js
│
├── routes/
│   ├── historialPedidosRouter.js
│   ├── ingredientesRouter.js
│   ├── mesasRoute.js
│   ├── pedidoDetallesRouter.js
│   ├── pedidosRouter.js
│   └── usuarioRouter.js
│
├── config.js
├── .env
├── index.js
└── README.md
📡 Endpoints principales (Rutas)
GET /api/mesas — Listar mesas

POST /api/mesas — Crear mesa

GET /api/pedidos — Listar pedidos

GET /api/pedidos/:id/historial — Historial de un pedido

POST /api/pedidos — Crear pedido

GET /api/menu_items — Listar ítems del menú

GET /api/ingredientes — Listar ingredientes

POST /api/pedido_detalles — Detalles de pedidos

GET /api/usuarios — Listar usuarios

Nota: Las rutas pueden variar según el archivo y configuración de cada router.

☁️ Despliegue en Render
Este proyecto está desplegado en Render. Asegúrate de:

Configurar las variables de entorno en el panel de Render.

Usar el script adecuado en package.json para producción ("start": "node index.js" si aplica).

Conectar correctamente la base de datos PostgreSQL proporcionada por Render.

🧑‍💻 Contribuciones
Si deseas colaborar o reportar un error, puedes crear un pull request o abrir un issue en este repositorio.










