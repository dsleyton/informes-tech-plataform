# 🚀 Informes.tech - Plataforma de Gestión de Servicios Académicos

Plataforma web full-stack para gestión de servicios académicos y técnicos (@informes.tech). Sistema con autenticación JWT, roles de usuario y gestión completa de pedidos.

##  Descripción

Sistema de gestión para servicios académicos que permite a clientes solicitar trabajos (informes, presentaciones, Excel, documentos) y a administradores gestionar el flujo completo de pedidos.

##  Tecnologías

**Backend:**
- Node.js v24.12.0
- Express.js
- PostgreSQL 16
- JWT (autenticación)
- bcrypt (encriptación)

**Dependencias:**
- `express` - Framework web
- `pg` - Cliente PostgreSQL
- `cors` - Cross-origin resource sharing
- `dotenv` - Variables de entorno
- `bcrypt` - Hash de contraseñas
- `jsonwebtoken` - Autenticación JWT

##  Estructura del Proyecto
```
informes-tech-plataform/
├── config/
│   └── db.js              # Configuración PostgreSQL
├── controllers/
│   ├── authController.js   # Lógica autenticación
│   ├── categoryController.js
│   └── orderController.js
├── middleware/
│   └── authMiddleware.js   # Verificación JWT
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   └── orderRoutes.js
├── .env                    # Variables de entorno
├── .gitignore
├── index.js               # Servidor principal
├── package.json
└── README.md
```

##  Base de Datos

**PostgreSQL - Schema:**
```sql
- users (usuarios del sistema)
- categories (tipos de servicios)
- orders (pedidos)
- order_files (archivos de pedidos)
- cart (carritos de compra)
- cart_items (items del carrito)
```

##  Instalación

### Requisitos previos:
- Node.js v18+ 
- PostgreSQL 16+
- npm

### Pasos:

1. **Clonar repositorio:**
```bash
git clone git@github.com:dsleyton/informes-tech-plataform.git
cd informes-tech-plataform
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Crear archivo `.env` en la raíz:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=informes_tech
DB_PASSWORD=tu_contraseña
DB_PORT=5432
JWT_SECRET=tu_secreto_jwt
PORT=5000
```

4. **Crear base de datos:**

En PostgreSQL, ejecutar el schema SQL (ver documentación en `/docs`)

5. **Iniciar servidor:**
```bash
node index.js
```

El servidor estará disponible en `http://localhost:5000`

##  API Endpoints

### Autenticación (públicas)

**Registrar usuario:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nombre",
  "email": "email@ejemplo.com",
  "password": "contraseña"
}
```

**Login:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "email@ejemplo.com",
  "password": "contraseña"
}
```

### Categorías (públicas)

**Obtener todas:**
```http
GET /api/categories
```

**Obtener por ID:**
```http
GET /api/categories/:id
```

### Pedidos (requieren autenticación)

**Crear pedido:**
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "category_id": 1,
  "title": "Título del pedido",
  "description": "Descripción detallada",
  "price": 8000,
  "deadline": "2026-01-15"
}
```

**Ver mis pedidos:**
```http
GET /api/orders/my-orders
Authorization: Bearer {token}
```

**Ver todos los pedidos (solo admin):**
```http
GET /api/orders
Authorization: Bearer {token}
```

**Actualizar estado (solo admin):**
```http
PATCH /api/orders/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "in_progress"
}
```

**Estados válidos:** `pending`, `in_progress`, `completed`, `cancelled`

##  Roles de Usuario

- **client:** Puede crear y ver sus propios pedidos
- **admin:** Acceso completo al sistema

##  Desarrolladora

**Deyanira S. Leyton**
- GitHub: [@dsleyton](https://github.com/dsleyton)
- LinkedIn: [Deyanira Leyton](https://www.linkedin.com/in/deyanira-stefany-leyton-chavez-b7b7672a5/)
- Email: nira.sleyton@gmail.com

##  Licencia

Este proyecto es parte del portafolio profesional de Deyanira S. Leyton.

---

 Si te gusta este proyecto, ¡dale una estrella en GitHub!