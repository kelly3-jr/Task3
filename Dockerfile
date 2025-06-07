# Start with Node.js official image
FROM node:20

# Create app directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else into the container
COPY . .

# Expose the port (same as in .env)
EXPOSE 10000

# Start the app
CMD ["npm", "start"]
