const http = require('http');
const express = require('express');

//4 require and import 
// `require` when  using CommonJS (most common)
// `import` for modern ES modules 

const fs = require('fs');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middlewares/logger');
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
connectDB();

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//3. Use Express middleware to log the method and URL of each incoming request
app.use(express.json());
app.use(logger);

//6. Middleware to check for custom header `x-api-key`
app.use(apiKeyMiddleware);

// 1. Create a Node.js HTTP server that listens on port 3000 and returns "Welcome to my API" on root (`/`)

app.get('/', (req, res) => {
  res.send('Welcome to my API'); 
});

// 2. Set up an Express server with a `/health` route that returns a JSON `{ status: "ok" }`

app.get('/health', (req, res) => {
  res.json({ status: 'ok' }); 
});

// Routes
app.use('/users', userRoutes);
app.use('/upload', uploadRoutes);
app.use('/', authRoutes);

// 25. create a Global error handler 
app.use(errorHandler);
app.use('/users', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});