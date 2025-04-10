# Fase 1: Construir el frontend
FROM node:20 AS frontend-build

WORKDIR /app/frontend

COPY gestor-tareas/package*.json ./
RUN npm install
COPY gestor-tareas/ ./
RUN npm run build -- --configuration production

# Fase 2: Construir el backend
FROM node:20 AS backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Fase 3: Imagen final combinada
FROM nginx:alpine

# Copiar archivos del frontend a Nginx
COPY --from=frontend-build /app/frontend/dist/gestor-tareas/browser /usr/share/nginx/html

# Copiar archivos del backend
COPY --from=backend-build /app/backend /app/backend

# Copiar configuración personalizada de Nginx si tenés una
# (opcional)
 COPY nginx.conf /etc/nginx/conf.d/default.conf

# Instalar Node.js para ejecutar el backend en el contenedor final
RUN apk add --no-cache nodejs npm

# Exponer puertos
EXPOSE 80 5000

# Comando para ejecutar ambos servicios
CMD sh -c "node /app/backend/server.js & nginx -g 'daemon off;'"
