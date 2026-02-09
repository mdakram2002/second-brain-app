const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const knowledgeRoutes = require('./routes/knowledgeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/authRoutes');

// Import middleware
const authMiddleware = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');

// Import database
const database = require('./config/database');

const app = express();

// Connect to database
database.connect();

// Middleware
app.use(helmet());
app.use(cors(authMiddleware.corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: database.connection?.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API documentation
app.get('/api-docs', (req, res) => {
  res.json({
    name: 'Second Brain API',
    version: '1.0.0',
    description: 'AI-powered knowledge management system API',
    endpoints: {
      knowledge: '/api/knowledge',
      ai: '/api/ai',
      auth: '/api/auth',
      public: {
        brain: '/api/public/brain/query?q=your+question'
      }
    }
  });
});

// API Routes
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// Public API endpoint (as required in assignment)
app.get('/api/public/brain/query', (req, res, next) => {
  const aiController = require('./controllers/aiController');
  aiController.publicQuery(req, res, next);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;