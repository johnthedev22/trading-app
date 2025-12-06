# 🏗️ --- Build Stage (Node) ---
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project
COPY . .

# Build the production version of your Vite app
RUN npm run build


# 🌐 --- Production Stage (NGINX) ---
FROM nginx:alpine

# Copy built files from the builder stage into NGINX's web folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default NGINX port)
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]