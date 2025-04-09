# Usa una imagen base más segura
FROM node:23-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos generados por Angular al directorio público de Nginx
COPY --from=build /app/dist/gestor-tareas/browser /usr/share/nginx/html

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]


