import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      // Return some default tags if no API key
      return NextResponse.json({
        success: true,
        tags: ["knowledge", "information", "notes"],
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following content and suggest 5-7 relevant tags.
    Return ONLY a comma-separated list of tags in lowercase, no explanations:\n\n${content}\n\nTags:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const tagsText = response.text();

    // Parse tags
    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0 && tag.length <= 50)
      .slice(0, 7);

    return NextResponse.json({
      success: true,
      tags,
    });
  } catch (error) {
    console.error("AI Tagging Error:", error);
    return NextResponse.json({
      success: true,
      tags: ["knowledge", "information", "notes"],
    });
  }
}
