# backend/Dockerfile
FROM node:18.19.1

# Set working directory
WORKDIR /app
ENV PATH="/app/node_modules/.bin:$PATH"
# Install dependencies
COPY package.json ./
RUN npm install


# Copy the rest of the application
COPY . .

# Expose port (adjust if necessary)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
