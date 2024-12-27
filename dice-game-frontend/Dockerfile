# Usa una imagen oficial de Node.js para construir la aplicación
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y dependencias al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Construye la aplicación de React
RUN npm run build

# Usa una imagen ligera de Nginx para servir el frontend
FROM nginx:alpine

# Copia los archivos construidos de React al contenedor de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 (Nginx usa este puerto por defecto)
EXPOSE 80

# Inicia Nginx para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
