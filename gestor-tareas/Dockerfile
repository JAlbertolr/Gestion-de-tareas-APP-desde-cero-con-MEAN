# Usa una imagen base más segura
FROM node:23-slim AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Compila tu aplicación Angular
RUN npm run build --prod

# Etapa final: usar Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist/gestor-tareas/browser /usr/share/nginx/html

# Copia la configuración personalizada de Nginx (si es necesario)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que corre Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

