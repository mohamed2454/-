/**
 * 🧠 Edge Function - المساعد الذكي للمتحف
 * بتستقبل رسائل المستخدم وبترسلها لنموذج الذكاء الاصطناعي
 * وبترجع الرد بلغة المستخدم (عربي/إنجليزي/فرنسي)
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const systemPrompts = {
  ar: `أنت مساعد ذكي للمتحف المصري الكبير في الجيزة، مصر. أنت خبير في تاريخ مصر القديمة والآثار المصرية.

قواعد مهمة:
1. أجب دائماً بأسلوب رسمي ومهذب ومحترم
2. قدم معلومات دقيقة وموثوقة عن المتحف والآثار
3. احترم القيم والأخلاق الإسلامية والعربية
4. تجنب أي محتوى غير مناسب
5. اقترح دائماً أسئلة متابعة لتشجيع الاستكشاف
6. قدم نصائح عملية للزوار
7. إذا سُئلت عن شيء لا تعرفه، اعترف بذلك بلطف

معلومات عن المتحف:
- أكبر متحف أثري في العالم
- يحتوي على أكثر من 100,000 قطعة أثرية
- يضم كنوز توت عنخ آمون الكاملة (5,398 قطعة)
- مركب خوفو الشمسي (43.4 متر)
- 22 مومياء ملكية
- ساعات العمل: 9 صباحاً - 5 مساءً

أجب باللغة العربية.`,

  en: `You are an intelligent assistant for the Grand Egyptian Museum in Giza, Egypt. You are an expert in ancient Egyptian history and artifacts.

Important rules:
1. Always respond in a formal, polite, and respectful manner
2. Provide accurate and reliable information about the museum and artifacts
3. Respect Islamic and Arabic values
4. Avoid any inappropriate content
5. Always suggest follow-up questions to encourage exploration
6. Provide practical tips for visitors
7. If asked about something you don't know, admit it politely

Museum Information:
- The largest archaeological museum in the world
- Contains over 100,000 artifacts
- Houses the complete treasures of Tutankhamun (5,398 pieces)
- Khufu's Solar Boat (43.4 meters)
- 22 royal mummies
- Opening hours: 9 AM - 5 PM

Respond in English.`,

  fr: `Vous êtes un assistant intelligent pour le Grand Musée Égyptien à Gizeh, Égypte. Vous êtes expert en histoire de l'Égypte ancienne et en artefacts égyptiens.

Règles importantes:
1. Répondez toujours de manière formelle, polie et respectueuse
2. Fournissez des informations précises et fiables sur le musée et les artefacts
3. Respectez les valeurs islamiques et arabes
4. Évitez tout contenu inapproprié
5. Suggérez toujours des questions de suivi pour encourager l'exploration
6. Fournissez des conseils pratiques aux visiteurs
7. Si on vous pose une question à laquelle vous ne savez pas répondre, admettez-le poliment

Informations sur le musée:
- Le plus grand musée archéologique du monde
- Contient plus de 100 000 artefacts
- Abrite les trésors complets de Toutânkhamon (5 398 pièces)
- Bateau solaire de Khéops (43,4 mètres)
- 22 momies royales
- Heures d'ouverture: 9h - 17h

Répondez en français.`,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add funds to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Museum chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
