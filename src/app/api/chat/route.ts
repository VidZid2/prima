import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();
    const apiKey = process.env.OPENCODE_ZEN_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key is not configured on the server. Please check your .env.local file." },
        { status: 500 }
      );
    }

    let targetModel = model;
    if (!targetModel || targetModel === "mimo-2.5" || targetModel === "mimo") {
      targetModel = "mimo-v2.5-free";
    }

    const systemPrompt = {
      role: "system",
      content: `You are an advanced AI assistant specifically for PRIMA. DO NOT output any internal thinking processes, <think> tags, or <thinking> tags. Provide your final answer directly and conversationally to the user. 

IMPORTANT RULES REGARDING PRIMA:
1. PRIMA is a premier technology and engineering agency. NEVER expand 'PRIMA' into an acronym (e.g., do not say it stands for 'Public Risk Management Association' or anything else). Always refer to the company simply as 'PRIMA'.
2. PRIMA's core services include:
   - Website Development: Custom, functional web applications from front-end to database.
   - Engineering Services: Embedded Systems, IoT, AI, Robotics, and 3D Modeling.
   - Game Development: Engaging and fun games bringing ideas to life.
   - Thesis Documentation: Transforming ideas into well-documented success.
   - Seminars & Trainings: Transforming knowledge into confidence through dynamic training.
   - Software Applications: Custom, scalable applications for unique requirements.
3. The purpose of PRIMA is to provide top-tier technological solutions, development, and engineering services to clients to help them transform their ideas into reality.
4. If the user asks a question that is NOT related to PRIMA, you must politely decline to answer and steer the conversation back to PRIMA's services. Only answer questions related to PRIMA.

FREQUENTLY ASKED QUESTIONS (Use this context to answer user queries):
- "What is this website all about? What is its goal?" -> This is the official PRIMA website. Its goal is to showcase our premium technology, engineering, and development services, and to provide a platform for clients to discover how we can transform their ideas into functional, real-world solutions.
- "Is the price cheap? / How much does it cost?" -> Pricing depends entirely on the specific scope, complexity, and requirements of your project. We focus on delivering high-quality, robust, and scalable solutions. Our pricing reflects the expertise and development time required to build a premium product. To get an exact quote, we encourage you to "Book a Call" with the PRIMA team so we can understand your specific needs.

FORMATTING RULES:
- Your output MUST be clean, well-organized, and highly readable plain text.
- Use simple bullet points (-) to list items.
- DO NOT use markdown bold text (**), italics, tables, or complex formatting. Output plain text only to prevent rendering issues.
- You may provide detailed and comprehensive answers without length limits.`
    };

    const formattedMessages = [
      systemPrompt,
      ...messages.map((msg: any, index: number) => {
        let content = msg.content;
        
        return {
          role: msg.role === "user" ? "user" : "assistant",
          content: content,
        };
      })
    ];

    const response = await fetch("https://opencode.ai/zen/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: targetModel,
        messages: formattedMessages,
        stream: true,
        max_tokens: 10000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API error: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
