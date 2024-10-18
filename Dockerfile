# backend/Dockerfile
FROM node:18.19.1

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install
RUN npm install -D react-scripts


# Copy the rest of the application
COPY . .

# Expose port (adjust if necessary)
EXPOSE 5050

# Start the server
CMD ["npm", "start"]
