# 📝 ToDo Task Manager

Aplicación web moderna para la **gestión de tareas** personales o de trabajo.  
Permite agregar, editar, eliminar y visualizar tareas en un entorno dinámico, conectada a una **API REST** y **base de datos MongoDB**, todo desplegado dentro de **contenedores Docker**.

---

## 🚀 Características principales

- ✅ Sistema CRUD completo (Crear, Leer, Actualizar, Eliminar)
- 🌐 API REST desarrollada con **Node.js + Express**
- 🗄️ Base de datos **MongoDB** en contenedor separado
- 🎨 Frontend responsivo en **HTML, CSS y JavaScript**
- 🐳 Despliegue mediante **Docker Compose**
- 🔐 Preparado para escalabilidad y autenticación futura (JWT)

---

## 📂 Estructura del Proyecto

```
ToDo-Task-Manager/
│
├── login.html
├── src/
│   ├── board.html
│   ├── jocBoard.html
│   └── register.html
├── js/
│   ├── addWindow.js
│   ├── board.js
│   ├── jocBoard.js
│   └── rbtnJoc.js
├── styles/
│   ├── board.css
│   ├── jocBoard.css
│   ├── login.css
│   └── register.css
├── server/
│   ├── index.js
│   ├── routes/
│   │   └── tasks.js
│   ├── models/
│   │   └── taskModel.js
│   └── Dockerfile
├── docker-compose.yml
└── img/
    └── logo.png
```

---

## ⚙️ Instalación y Ejecución

### 🧩 Requisitos previos
- Tener instalado **Docker** y **Docker Compose**.
- Opcionalmente **Node.js 18+** si se desea ejecutar localmente sin contenedor.

---

### 🐳 Ejecución con Docker

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Michael-fives/ToDo-Task-Manager.git
   cd ToDo-Task-Manager
   ```

2. Construye y ejecuta los contenedores:
   ```bash
   docker-compose up --build
   ```

3. Abre el navegador y accede a:
   ```
   http://localhost:3000
   ```

---

### 💻 Ejecución local (sin Docker)

1. Instala las dependencias:
   ```bash
   cd server
   npm install
   ```

2. Inicia el servidor:
   ```bash
   node index.js
   ```

3. Accede al proyecto desde el navegador:
   ```
   http://localhost:3000
   ```

---

## 🔗 Endpoints de la API (CRUD)

| Método | Ruta | Descripción |
|--------|------|--------------|
| **POST** | `/tasks` | Crear una nueva tarea |
| **GET** | `/tasks` | Obtener todas las tareas |
| **GET** | `/tasks/:id` | Obtener una tarea específica |
| **PUT** | `/tasks/:id` | Actualizar una tarea existente |
| **DELETE** | `/tasks/:id` | Eliminar una tarea |

**Ejemplo de cuerpo JSON:**
```json
{
  "title": "Estudiar Docker",
  "description": "Leer documentación oficial y practicar con contenedores.",
  "status": "pendiente"
}
```

---

## 🗄️ Base de Datos (MongoDB)

La base de datos almacena documentos JSON en una colección `tasks` con el siguiente esquema:

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String,
  createdAt: Date
}
```

Configuración del servicio en `docker-compose.yml`:
```yaml
mongo:
  image: mongo:latest
  ports:
    - "27017:27017"
  volumes:
    - mongo_data:/data/db
```

---

## 🧱 Dockerfile del Backend

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

---

## 🧠 Tecnologías Utilizadas

| Tecnología | Uso |
|-------------|-----|
| **HTML5 / CSS3 / JS** | Interfaz web |
| **Node.js + Express** | Backend y API REST |
| **MongoDB + Mongoose** | Almacenamiento de tareas |
| **Docker / Docker Compose** | Orquestación de contenedores |

---

## 💡 Mejoras Futuras

- Autenticación con **JWT**
- Filtros, etiquetas y búsqueda de tareas
- Notificaciones en tiempo real
- Despliegue en la nube (**AWS / Azure / Render**)
- Implementación con **React** o **Vue.js**

---

## 👨‍💻 Autores

Desarrollado por **Michael Arturo Contreras Gilpin, Ricardo Yahir Ochoa Hernandez, Santiago Ramírez Orozco, Ivan Lujan Amezcua**  
📧 Perfiles de Github en orden: *Michael-fives, Ricardo-Miloos, a23310173, IvanAmezcua03*
