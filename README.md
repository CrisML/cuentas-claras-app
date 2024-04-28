# cuentas-claras-app
TP - 75.44/95.24 Administración y Control de Proyectos Informáticos I

## Integrantes
- Alexis Herrera
- Lautaro Fritz
- Ronnie Del Pino
- Tomas Dahab
- Lise Le Guillou
- Cristian Lin

## Estructura del proyecto
Un mono-repo con frontend, backend y common.

El frontend es una aplicación React, con Next.js, Typescript y TailwindCSS.

El backend es una aplicación Node.js, con Express, Typescript.

## Como ejecutar el proyecto
Primero ejecutar el backend
```bash
cd packages/backend
npm install # Si es la primera vez
npm run dev
```
Luego ejecutar el frontend
```bash
cd packages/frontend
npm install # Si es la primera vez
npm run dev
```

El backend se ejecutará en http://localhost:3000 y el frontend en http://localhost:3001