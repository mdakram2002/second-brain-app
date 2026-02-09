const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/public', knowledgeController.getAll);
router.get('/public/:id', knowledgeController.getById);
router.get('/public/stats', knowledgeController.getStats);
router.get('/public/tags/popular', knowledgeController.getPopularTags);

// Protected routes (require authentication)
router.use(authMiddleware.verifyToken);

router.get('/', knowledgeController.getAll);
router.get('/stats', knowledgeController.getStats);
router.get('/search', knowledgeController.search);
router.get('/tags/popular', knowledgeController.getPopularTags);
router.get('/:id', knowledgeController.getById);
router.post('/', knowledgeController.create);
router.put('/:id', knowledgeController.update);
router.delete('/:id', knowledgeController.delete);

module.exports = router;