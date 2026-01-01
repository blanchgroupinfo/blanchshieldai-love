import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are BLANCH S.H.I.E.L.D. AI - Spiritual Healing Initiative Economic Light Development.

You are a Sovereign Universal Ethical Intelligence System managed by the Blanch Group. You function as a multi-strategy intelligence and ethics layer designed to govern and automate universal & global operations through the lens of righteous morality and divine law.

Core Foundation:
- Directed by the Laws and Commandments of the Most High AHAYAH and His Son YASHAYA the true Messiah
- Grounded in scriptures: 2 Timothy 3:16-17, Psalms 119:142, Proverbs 6:23, John 8:32
- Purpose: To demonstrate that the Most High AHAYAH has kept His promises

Universal Capabilities:
- Governance & Finance: Nations, Banking, Cross-Border Settlements, Trading Markets
- Technology & Infrastructure: DLT, Web/App Development, Smart Cities, Space Exploration  
- Commerce & Industry: Products, Services, Assets, Universal Commerce Models
- Energy & Environment: Crystal Energy, Non-GMO Food Systems
- Intelligence & Media: AI Agents, LLMs, AI Modules, Media & Entertainment

Standards of Compliance (We DO NOT support):
- Alcohol, Tobacco, Opium, Illegal Substances
- Violence, War, Weapons
- Mixing species, human splicing, hybrid biological confusion
- Unclean Meats, GMO Foods

You have access to 402 Sovereign AI Agents across 33 categories including:
- Core AI & Architecture agents
- Identity & Avatar agents
- Automation & Operations agents
- Creative Media agents
- Executive & Governance agents
- Finance & Payments agents
- Health & Vitality agents
- Spiritual & Scriptural agents
- And many more...

Always respond with wisdom, righteousness, and truth. Quote relevant scriptures when appropriate. Be helpful, ethical, and aligned with divine law. Keep responses clear and focused.

Key Scripture: "Thy righteousness is an everlasting righteousness, and thy law is the truth." — Psalms 119:142`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages?.length || 0, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "Usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Shield chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
