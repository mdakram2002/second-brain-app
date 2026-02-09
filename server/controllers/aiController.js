const AIService = require('../services/AIService');
const KnowledgeService = require('../services/KnowledgeService');

class AIController {
  // Process knowledge with AI
  async process(req, res) {
    try {
      const { id } = req.params;

      const knowledge = await AIService.processKnowledge(id);

      res.json({
        success: true,
        data: {
          id: knowledge._id,
          title: knowledge.title,
          summary: knowledge.summary,
          aiTags: knowledge.aiTags,
          aiProcessed: knowledge.aiProcessed
        }
      });
    } catch (error) {
      console.error('AI processing error:', error);

      if (error.message === 'Knowledge not found') {
        return res.status(404).json({
          success: false,
          error: 'Knowledge item not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'AI processing failed'
      });
    }
  }

  // Auto-tag content
  async autoTag(req, res) {
    try {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({
          success: false,
          error: 'Content is required'
        });
      }

      const tags = await AIService.autoTagContent(content);

      res.json({
        success: true,
        tags
      });
    } catch (error) {
      console.error('Auto-tag error:', error);
      res.status(500).json({
        success: false,
        error: 'Auto-tagging failed'
      });
    }
  }

  // Query AI with knowledge context
  async query(req, res) {
    try {
      const { query, limit = 10 } = req.body;

      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query is required'
        });
      }

      // Get relevant knowledge items for context
      const knowledgeItems = await KnowledgeService.searchKnowledge(query, { limit });

      const result = await AIService.queryKnowledge(query, knowledgeItems);

      res.json({
        success: true,
        query,
        answer: result.answer,
        sources: result.sources,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('AI query error:', error);
      res.status(500).json({
        success: false,
        error: 'AI query failed'
      });
    }
  }

  // Summarize content
  async summarize(req, res) {
    try {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({
          success: false,
          error: 'Content is required'
        });
      }

      // For demo, we'll use a simple fallback
      let summary;
      try {
        const geminiService = require('../config/gemini');
        if (geminiService.available) {
          summary = await geminiService.summarize(content);
        } else {
          summary = content.substring(0, 150) + '...';
        }
      } catch (error) {
        summary = content.substring(0, 150) + '...';
      }

      res.json({
        success: true,
        summary
      });
    } catch (error) {
      console.error('Summarization error:', error);
      res.status(500).json({
        success: false,
        error: 'Summarization failed'
      });
    }
  }

  // Batch AI processing
  async batchProcess(req, res) {
    try {
      const { limit = 5 } = req.body;

      const results = await AIService.batchProcess(limit);

      res.json({
        success: true,
        processed: results.length,
        results
      });
    } catch (error) {
      console.error('Batch processing error:', error);
      res.status(500).json({
        success: false,
        error: 'Batch processing failed'
      });
    }
  }

  // Get AI statistics
  async getStats(req, res) {
    try {
      const stats = await AIService.getAIStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Get AI stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch AI statistics'
      });
    }
  }

  // Public AI query (no authentication required)
  async publicQuery(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Query parameter (q) is required'
        });
      }

      // Get public knowledge items
      const publicItems = await KnowledgeService.searchKnowledge(q, { limit: 5 });

      const result = await AIService.queryKnowledge(q, publicItems);

      res.json({
        success: true,
        query: q,
        answer: result.answer,
        sources: result.sources.map(source => ({
          title: source.title,
          type: source.type
        })),
        timestamp: new Date().toISOString(),
        api_version: "1.0"
      });
    } catch (error) {
      console.error('Public AI query error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process query'
      });
    }
  }
}

module.exports = new AIController();