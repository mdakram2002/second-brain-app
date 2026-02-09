const Knowledge = require("../models/Knowledge");

class KnowledgeService {
  async getAllKnowledge(filters = {}) {
    const {
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      sortOrder = "desc",
      type,
      tags,
      search,
      userId,
    } = filters;

  
    const query = {};

    if (userId) {
      // In a real app, you'd filter by user
      // For now, we'll return all knowledge
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (tags && tags.length > 0) {
      query.tags = { $in: tags.map((tag) => tag.toLowerCase()) };
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [knowledge, total] = await Promise.all([
      Knowledge.find(query)
        .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Knowledge.countDocuments(query),
    ]);

    return {
      data: knowledge,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getKnowledgeById(id) {
    const knowledge = await Knowledge.findById(id).lean();

    if (!knowledge) {
      throw new Error("Knowledge not found");
    }

    // Increment views
    await Knowledge.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return knowledge;
  }

  async createKnowledge(data) {
    const knowledge = new Knowledge({
      ...data,
      tags: (data.tags || []).map((tag) => tag.toLowerCase().trim()),
      aiTags: [],
      aiProcessed: false,
      views: 0,
      isPublic: data.isPublic || false,
    });

    await knowledge.save();
    return knowledge.toObject();
  }

  async updateKnowledge(id, data) {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
      aiProcessed: false, // Reset AI processing flag when content is updated
    };

    if (data.tags) {
      updateData.tags = data.tags.map((tag) => tag.toLowerCase().trim());
    }

    const knowledge = await Knowledge.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!knowledge) {
      throw new Error("Knowledge not found");
    }

    return knowledge;
  }

  async deleteKnowledge(id) {
    const knowledge = await Knowledge.findByIdAndDelete(id);

    if (!knowledge) {
      throw new Error("Knowledge not found");
    }

    return { message: "Knowledge deleted successfully" };
  }

  async searchKnowledge(query, options = {}) {
    const { limit = 50, type } = options;

    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { aiTags: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
      ],
    };

    if (type && type !== "all") {
      searchQuery.type = type;
    }

    const knowledge = await Knowledge.find(searchQuery)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return knowledge;
  }

  async getStats() {
    const stats = await Knowledge.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          avgViews: { $avg: "$views" },
        },
      },
    ]);

    const total = await Knowledge.countDocuments();
    const recent = await Knowledge.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title type createdAt views")
      .lean();

    return {
      total,
      byType: stats,
      recent,
    };
  }

  async getPopularTags(limit = 20) {
    const tags = await Knowledge.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    return tags.map((tag) => ({
      name: tag._id,
      count: tag.count,
    }));
  }

  async batchAIProcessing(limit = 10) {
    const unprocessedItems = await Knowledge.find({
      aiProcessed: false,
      content: { $exists: true, $ne: "" },
    }).limit(limit);

    const results = [];

    for (const item of unprocessedItems) {
      try {
        // This would be processed by the AIService
        results.push({
          id: item._id,
          title: item.title,
          status: "pending",
        });
      } catch (error) {
        results.push({
          id: item._id,
          title: item.title,
          status: "failed",
          error: error.message,
        });
      }
    }

    return results;
  }
}

module.exports = new KnowledgeService();
