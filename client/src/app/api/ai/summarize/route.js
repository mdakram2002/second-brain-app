import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY,
);

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Summarize the following content in 2-3 concise sentences:\n\n${content}\n\nSummary:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("AI Summarization Error:", error);
    return NextResponse.json({
      success: true,
      summary: "Unable to generate summary at this time.",
    });
  }
}
