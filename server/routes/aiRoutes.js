const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/public/query', aiController.publicQuery);

// Protected routes
router.use(authMiddleware.verifyToken);

router.post('/process/:id', aiController.process);
router.post('/auto-tag', aiController.autoTag);
router.post('/query', aiController.query);
router.post('/summarize', aiController.summarize);
router.post('/batch-process', aiController.batchProcess);
router.get('/stats', aiController.getStats);

module.exports = router;