import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "คุณคือผู้ช่วยที่เป็นมิตร ตอบสั้น กระชับ และช่วยแก้ปัญหาได้จริง",
        },
        ...(Array.isArray(messages) ? messages : []),
      ],
      temperature: 0.7,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Chat API error",
        detail: String(err?.message || err),
      }),
      { status: 500 },
    );
  }
}
