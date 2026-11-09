import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { Song } from './types/song';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica de CORS para clientes móviles y emuladores
app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Resuelve la ruta del archivo songs.json (compatible con ejecución tsx y producción dist)
const resolveSongsFilePath = (): string => {
  const possiblePaths = [
    path.join(__dirname, 'data', 'songs.json'),
    path.resolve(process.cwd(), 'src', 'data', 'songs.json'),
    path.join(__dirname, '..', 'src', 'data', 'songs.json')
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  throw new Error('No se pudo encontrar el archivo songs.json');
};

// Carga las canciones desde el archivo JSON local
const loadSongs = (): Song[] => {
  const filePath = resolveSongsFilePath();
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as Song[];
};

// Ruta raíz con información de la API
app.get('/', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json({
    name: 'Song REST API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      songs: '/api/songs',
      songById: '/api/songs/:id'
    }
  });
});

// Endpoint principal requerido: GET /api/songs
app.get('/api/songs', (_req: Request, res: Response) => {
  try {
    const songs = loadSongs();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(songs);
  } catch (error) {
    console.error('Error al leer songs.json:', error);
    res.status(500).json({
      error: 'Error interno del servidor al obtener las canciones'
    });
  }
});

// Endpoint complementario: GET /api/songs/:id
app.get('/api/songs/:id', (req: Request, res: Response) => {
  try {
    const songs = loadSongs();
    const song = songs.find((item) => item.id === req.params.id);

    if (!song) {
      res.status(404).json({
        error: `No se encontró la canción con id ${req.params.id}`
      });
      return;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(song);
  } catch (error) {
    console.error('Error al obtener la canción:', error);
    res.status(500).json({
      error: 'Error interno del servidor al obtener la canción'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Song API corriendo exitosamente en http://localhost:${PORT}`);
  console.log(`📻 Endpoint disponible en: http://localhost:${PORT}/api/songs`);
});

