const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.warn(
        "GEMINI_API_KEY is not set. AI features will be limited.",
      );
      this.available = false;
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      this.available = true;
      console.log("Gemini AI initialized successfully");
    } catch (error) {
      console.error("Gemini AI initialization failed:", error);
      this.available = false;
    }
  }

  async generateText(prompt) {
    if (!this.available) {
      throw new Error("Gemini AI is not available");
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  async summarize(content) {
    const prompt = `Please provide a concise 2-3 sentence summary of the following content. Focus on the main ideas and key points:\n\n${content}\n\nSummary:`;
    return this.generateText(prompt);
  }

  async generateTags(content) {
    const prompt = `Analyze the following content and generate 5-7 relevant tags. Return ONLY a comma-separated list of tags in lowercase, no explanations:\n\n${content}\n\nTags:`;
    const tagsString = await this.generateText(prompt);
    return tagsString
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0 && tag.length <= 50)
      .slice(0, 7);
  }

  async answerQuestion(question, context) {
    const prompt = `Based on the following knowledge base context, answer the user's question.
    If the answer isn't in the context, say "I don't have enough information about that."

    Question: ${question}

    Knowledge Base Context:
    ${context}

    Answer:`;

    return this.generateText(prompt);
  }

  async extractKeyPoints(content) {
    const prompt = `Extract 3-5 key points from the following content. Return as a bulleted list:\n\n${content}\n\nKey Points:`;
    return this.generateText(prompt);
  }

  async categorizeContent(content) {
    const prompt = `Categorize the following content into one of these categories: Technology, Science, Business, Health, Education, Entertainment, Other.
    Return ONLY the category name:\n\n${content}\n\nCategory:`;
    return this.generateText(prompt);
  }
}

module.exports = new GeminiService();
