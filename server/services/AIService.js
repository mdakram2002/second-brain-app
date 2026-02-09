const Knowledge = require("../models/Knowledge");
const geminiService = require("../config/gemini");

class AIService {
  constructor() {
    this.gemini = geminiService;
  }

  async processKnowledge(knowledgeId) {
    try {
      const knowledge = await Knowledge.findById(knowledgeId);

      if (!knowledge) {
        throw new Error("Knowledge not found");
      }

      // Skip if already processed
      if (knowledge.aiProcessed) {
        return knowledge;
      }

      const tasks = [];
      const updates = {};

      // Generate summary
      if (this.gemini.available) {
        try {
          const summary = await this.gemini.summarize(knowledge.content);
          updates.summary = summary;
        } catch (error) {
          console.error("Summary generation failed:", error);
          // Fallback to simple truncation
          updates.summary = knowledge.content.substring(0, 150) + "...";
        }

        // Generate AI tags
        try {
          const aiTags = await this.gemini.generateTags(knowledge.content);
          updates.aiTags = aiTags;
        } catch (error) {
          console.error("Tag generation failed:", error);
          updates.aiTags = [];
        }
      } else {
        // Fallback when AI is not available
        updates.summary = knowledge.content.substring(0, 150) + "...";
        updates.aiTags = [];
      }

      // Mark as processed
      updates.aiProcessed = true;
      updates.updatedAt = Date.now();

      // Update knowledge
      const updatedKnowledge = await Knowledge.findByIdAndUpdate(
        knowledgeId,
        updates,
        { new: true },
      );

      return updatedKnowledge;
    } catch (error) {
      console.error("AI processing failed:", error);
      throw error;
    }
  }

  async autoTagContent(content) {
    if (!this.gemini.available) {
      return ["knowledge", "information", "notes"];
    }

    try {
      const tags = await this.gemini.generateTags(content);
      return tags;
    } catch (error) {
      console.error("Auto-tagging failed:", error);
      return ["knowledge", "information", "notes"];
    }
  }

  async queryKnowledge(question, context = []) {
    if (!this.gemini.available) {
      return {
        answer:
          "AI capabilities are currently unavailable. Please try again later.",
        sources: [],
      };
    }

    try {
      // Prepare context from knowledge items
      const contextText = context
        .map(
          (item) =>
            `Title: ${item.title}\nContent: ${item.content.substring(0, 300)}...`,
        )
        .join("\n\n");

      const answer = await this.gemini.answerQuestion(question, contextText);

      // Find relevant sources
      const relevantSources = context
        .filter((item) => {
          const searchText = `${item.title} ${item.content}`.toLowerCase();
          return (
            searchText.includes(question.toLowerCase()) ||
            question
              .toLowerCase()
              .split(" ")
              .some((word) => searchText.includes(word))
          );
        })
        .slice(0, 3)
        .map((item) => ({
          id: item._id,
          title: item.title,
          type: item.type,
          relevance: this.calculateRelevance(question, item),
        }));

      return {
        answer,
        sources: relevantSources,
      };
    } catch (error) {
      console.error("Knowledge query failed:", error);
      return {
        answer:
          "I encountered an error while processing your query. Please try again.",
        sources: [],
      };
    }
  }

  calculateRelevance(question, item) {
    const questionWords = question.toLowerCase().split(/\s+/);
    const content =
      `${item.title} ${item.content} ${item.tags.join(" ")} ${item.aiTags.join(" ")}`.toLowerCase();

    let score = 0;
    questionWords.forEach((word) => {
      if (content.includes(word)) {
        score += 1;
      }
    });

    return score / questionWords.length;
  }

  async batchProcess(limit = 5) {
    const unprocessedItems = await Knowledge.find({
      aiProcessed: false,
      content: { $exists: true, $ne: "" },
    }).limit(limit);

    const results = [];

    for (const item of unprocessedItems) {
      try {
        const processed = await this.processKnowledge(item._id);
        results.push({
          id: item._id,
          title: item.title,
          status: "success",
          summary: processed.summary,
          aiTags: processed.aiTags,
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

  async getAIStats() {
    const stats = await Knowledge.aggregate([
      {
        $group: {
          _id: "$aiProcessed",
          count: { $sum: 1 },
          avgTags: { $avg: { $size: "$aiTags" } },
        },
      },
    ]);

    const processedCount = stats.find((s) => s._id === true)?.count || 0;
    const unprocessedCount = stats.find((s) => s._id === false)?.count || 0;
    const total = processedCount + unprocessedCount;

    return {
      total,
      processed: processedCount,
      unprocessed: unprocessedCount,
      percentage: total > 0 ? Math.round((processedCount / total) * 100) : 0,
    };
  }
}

module.exports = new AIService();
