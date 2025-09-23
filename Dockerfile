# Multi-stage build for the microfrontend application
FROM node:18-alpine as base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/host/package*.json ./apps/host/
COPY apps/workorder/package*.json ./apps/workorder/
COPY apps/asset/package*.json ./apps/asset/

# Install dependencies
RUN npm install
RUN cd apps/host && npm install
RUN cd apps/workorder && npm install
RUN cd apps/asset && npm install

# Copy source code
COPY . .

# Build all applications
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built applications to nginx
COPY --from=base /app/apps/host/dist /usr/share/nginx/html/host
COPY --from=base /app/apps/workorder/dist /usr/share/nginx/html/workorder
COPY --from=base /app/apps/asset/dist /usr/share/nginx/html/asset

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
