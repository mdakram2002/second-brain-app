const KnowledgeService = require('../services/KnowledgeService');
const AIService = require('../services/AIService');

class KnowledgeController {
  // Get all knowledge items
  async getAll(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        type,
        tags,
        search
      } = req.query;

      const filters = {
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
        sortOrder,
        type,
        tags: tags ? tags.split(',') : [],
        search
      };

      const result = await KnowledgeService.getAllKnowledge(filters);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      console.error('Get all knowledge error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch knowledge items'
      });
    }
  }

  // Get single knowledge item
  async getById(req, res) {
    try {
      const { id } = req.params;

      const knowledge = await KnowledgeService.getKnowledgeById(id);

      res.json({
        success: true,
        data: knowledge
      });
    } catch (error) {
      console.error('Get knowledge error:', error);

      if (error.message === 'Knowledge not found') {
        return res.status(404).json({
          success: false,
          error: 'Knowledge item not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch knowledge item'
      });
    }
  }

  // Create knowledge item
  async create(req, res) {
    try {
      const { title, content, type, sourceUrl, tags = [], isPublic = false } = req.body;

      // Validate required fields
      if (!title || !content || !type) {
        return res.status(400).json({
          success: false,
          error: 'Title, content, and type are required'
        });
      }

      const knowledgeData = {
        title,
        content,
        type,
        sourceUrl: type === 'link' ? sourceUrl : '',
        tags,
        isPublic
      };

      const knowledge = await KnowledgeService.createKnowledge(knowledgeData);

      // Process with AI in background
      setTimeout(async () => {
        try {
          await AIService.processKnowledge(knowledge._id);
        } catch (error) {
          console.error('Background AI processing failed:', error);
        }
      }, 1000);

      res.status(201).json({
        success: true,
        data: knowledge
      });
    } catch (error) {
      console.error('Create knowledge error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create knowledge item'
      });
    }
  }

  // Update knowledge item
  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const knowledge = await KnowledgeService.updateKnowledge(id, updateData);

      // Re-process with AI in background if content changed
      if (updateData.content) {
        setTimeout(async () => {
          try {
            await AIService.processKnowledge(id);
          } catch (error) {
            console.error('Background AI processing failed:', error);
          }
        }, 1000);
      }

      res.json({
        success: true,
        data: knowledge
      });
    } catch (error) {
      console.error('Update knowledge error:', error);

      if (error.message === 'Knowledge not found') {
        return res.status(404).json({
          success: false,
          error: 'Knowledge item not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to update knowledge item'
      });
    }
  }

  // Delete knowledge item
  async delete(req, res) {
    try {
      const { id } = req.params;

      await KnowledgeService.deleteKnowledge(id);

      res.json({
        success: true,
        message: 'Knowledge item deleted successfully'
      });
    } catch (error) {
      console.error('Delete knowledge error:', error);

      if (error.message === 'Knowledge not found') {
        return res.status(404).json({
          success: false,
          error: 'Knowledge item not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to delete knowledge item'
      });
    }
  }

  // Search knowledge
  async search(req, res) {
    try {
      const { q, type, limit = 50 } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const knowledge = await KnowledgeService.searchKnowledge(q, { type, limit });

      res.json({
        success: true,
        data: knowledge
      });
    } catch (error) {
      console.error('Search knowledge error:', error);
      res.status(500).json({
        success: false,
        error: 'Search failed'
      });
    }
  }

  // Get statistics
  async getStats(req, res) {
    try {
      const stats = await KnowledgeService.getStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch statistics'
      });
    }
  }

  // Get popular tags
  async getPopularTags(req, res) {
    try {
      const { limit = 20 } = req.query;
      const tags = await KnowledgeService.getPopularTags(parseInt(limit));

      res.json({
        success: true,
        data: tags
      });
    } catch (error) {
      console.error('Get popular tags error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch popular tags'
      });
    }
  }
}

module.exports = new KnowledgeController();