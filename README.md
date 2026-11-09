# Song API - REST API en Node.js, Express y TypeScript

API REST ligera, moderna y rápida construida con Node.js, Express y TypeScript, diseñada para servir un catálogo de canciones a aplicaciones móviles (Android, iOS, Flutter, React Native, etc.).

---

## 🚀 Características
- **Node.js + Express + TypeScript**: Tipado estático con interfaces dedicadas.
- **CORS Habilitado**: Configurado para permitir peticiones desde cualquier origen (emuladores de Android, simuladores de iOS y dispositivos físicos).
- **100 Canciones de Rock/Metal 2000s+**: Linkin Park, Evanescence, System of a Down, Three Days Grace, Papa Roach, Breaking Benjamin, Flyleaf, Nightwish, Lacuna Coil, Skillet, Within Temptation, Paramore, Green Day, Blink-182, Foo Fighters, Red Hot Chili Peppers, Avenged Sevenfold, Slipknot, Disturbed, Korn, Audioslave.
- **Rápido tiempo de desarrollo con `tsx`**: Recarga y ejecución en tiempo real sin pasos intermedios de compilación.

---

## 📁 Estructura del Proyecto

```text
song-api/
├── dist/                   # Código JavaScript compilado (producción)
├── src/
│   ├── data/
│   │   └── songs.json      # Catálogo con las 100 canciones
│   ├── types/
│   │   └── song.ts         # Interface TypeScript de la canción
│   └── index.ts            # Servidor Express, middlewares y rutas
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Modo Desarrollo (con recarga automática)
```bash
npm run dev
```

### 3. Modo Producción
```bash
npm run build
npm start
```

El servidor iniciará por defecto en el puerto `3000` (o el especificado en la variable de entorno `PORT`).

---

## 📡 Endpoints de la API

### 1. `GET /api/songs`
Retorna la lista completa de las 100 canciones.

- **Headers de respuesta**:
  - `Content-Type: application/json; charset=utf-8`
  - `Access-Control-Allow-Origin: *`

- **Ejemplo de respuesta**:
```json
[
  {
    "id": "1",
    "title": "In the End",
    "artist": "Linkin Park",
    "album": "Hybrid Theory",
    "genre": "Nu Metal",
    "durationSeconds": 216,
    "releaseYear": 2000,
    "coverUrl": "https://picsum.photos/seed/linkin-park-hybrid-theory/300/300",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  ...
]
```

### 2. `GET /api/songs/:id`
Retorna una canción específica según su ID (del `"1"` al `"100"`).

- **Ejemplo**: `GET http://localhost:3000/api/songs/1`

---

## 📱 Conexión desde Clientes Móviles

| Entorno | URL Base |
| :--- | :--- |
| **Navegador / Postman** | `http://localhost:3000` |
| **Simulador de iOS** | `http://localhost:3000` |
| **Emulador de Android** | `http://10.0.2.2:3000` |
| **Dispositivo Físico** | `http://<IP_LOCAL_DE_TU_PC>:3000` |

