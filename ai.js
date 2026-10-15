"use strict";
/* AI Fresh mode — BYOK (Bring Your Own Key).
   The API key is typed by each visitor into their own browser and stored ONLY
   in that browser's localStorage. It is never part of this code or the repo.
   The template output is sent to the chosen AI provider as a locked
   specification; the AI must rewrite it fresh while preserving every fact
   and every permanent lock. */

const AI_PROVIDERS = {
  openai: {
    label: "OpenAI",
    base: "https://api.openai.com/v1",
    kind: "openai",
    models: ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4o"],
    keyHint: "sk-...",
  },
  openrouter: {
    label: "OpenRouter (banyak model, 1 key)",
    base: "https://openrouter.ai/api/v1",
    kind: "openai",
    models: ["openai/gpt-4o-mini", "google/gemini-2.5-flash", "deepseek/deepseek-chat", "meta-llama/llama-3.3-70b-instruct"],
    keyHint: "sk-or-...",
  },
  groq: {
    label: "Groq (cepat, gratis)",
    base: "https://api.groq.com/openai/v1",
    kind: "openai",
    // NOTE (2026-10-15): Groq menonaktifkan llama-3.3-70b-versatile dan
    // llama-3.1-8b-instant untuk tier gratis/developer pada 16 Agu 2026;
    // openai/gpt-oss-120b & gpt-oss-20b adalah pengganti resminya.
    models: ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3-32b"],
    keyHint: "gsk_...",
  },
  gemini: {
    label: "Google Gemini",
    base: "https://generativelanguage.googleapis.com/v1beta",
    kind: "gemini",
    models: ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-flash-lite"],
    keyHint: "AIza...",
  },
  router9: {
    label: "9Router (lokal — AI via router di komputermu)",
    // 9Router (github.com/decolua/9router) exposes an OpenAI-compatible
    // endpoint on the user's own machine: default http://localhost:20128/v1
    // (Docker/production) or http://localhost:20127/v1 (dev). The port can
    // be changed in the Base URL field. Model names must match the user's
    // 9Router dashboard exactly (provider/model or a combo name).
    base: "http://localhost:20128/v1",
    kind: "openai",
    models: ["kr/claude-sonnet-4.5", "cc/claude-sonnet-4.5", "kiro/claude-sonnet-4.5", "deepseek/deepseek-chat"],
    keyHint: "API key dari dashboard 9Router (menu Endpoint & Key)",
  },
  custom: {
    label: "Custom (OpenAI-compatible: DeepSeek, Together, LM Studio, dll)",
    base: "",
    kind: "openai",
    models: ["deepseek-chat", "deepseek-reasoner"],
    keyHint: "API key provider kamu",
  },
};

function aiSystemPrompt() {
  return [
    "You are an expert AI-video prompt engineer for short-form videos.",
    "You will receive a LOCKED SPECIFICATION produced by a template. Rewrite it into a FRESH, natural, newly-worded result.",
    "Hard rules: preserve every fact in the specification (subject, species/strain/color if any, prey if any, location, setting details, recording device style, camera, positions, direction, all timing segments, outcome, audio).",
    "Preserve every permanent lock stated in the specification: its exact duration, its ratio, fictional AI-generated, realistic raw manual-recording look, one stable scene, one camera, realistic physics and anatomy, natural audio only (no music, no narration) unless the specification says otherwise.",
    "Never drop the negative restrictions at the end. Never add new animals, new actions, music, text overlays or cinematic language.",
    "Use fresh sentence structures and fresh wording every time; do not copy the specification's sentences verbatim except the required opening line and the timing labels.",
    "Answer in English only.",
  ].join(" ");
}

function aiUserPrompt(kind, category, specText) {
  const opening = category === "show"
    ? "Create an exactly 10-second vertical 9:16 fictional AI-generated aquarium show-fish video designed to look like a raw modern smartphone recording of a beautiful contest fish inside a clean home show aquarium."
    : "Create an exactly 10-second vertical 9:16 fictional AI-generated aquarium feeding video designed to look like a raw modern smartphone recording of a predator fish inside a home aquarium.";
  if (kind === "prompt" && category === "general") {
    return `LOCKED SPECIFICATION:\n${specText}\n\nTASK: Rewrite it as ONE fresh single-paragraph video prompt of 1500-2400 characters. It MUST begin with exactly the same first sentence as the specification. It MUST keep every timing segment label that appears in the specification, the same duration, ratio, recording device style, location, subject, core event, peak result, natural audio, and MUST end with the negative restrictions. If any part of the specification is written in Indonesian, translate it into natural English inside the prompt. Then invent a fresh short viral Title and a fresh one-sentence Caption.\nReturn ONLY valid JSON: {"prompt":"...","title":"...","caption":"..."}`;
  }
  if (kind === "prompt") {
    return `LOCKED SPECIFICATION:\n${specText}\n\nTASK: Rewrite it as ONE fresh single-paragraph video prompt of 1800-2600 characters. It MUST begin with exactly this line: "${opening}" It MUST keep the five timing segments labeled 0.00-2.00, 2.00-4.00, 4.00-6.00, 6.00-8.00 and 8.00-10.00 seconds, and MUST end with the negative restrictions. Then invent a fresh short viral Title and a fresh one-sentence Caption.\nReturn ONLY valid JSON: {"prompt":"...","title":"...","caption":"..."}`;
  }
  if (kind === "idea" && category === "general") {
    return `LOCKED SPECIFICATION (one video concept):\n${specText}\n\nTASK: Rewrite this video concept with completely fresh wording, keeping every fact and the same labeled structure as the input (Concept / Subject / Core event / Peak result / Setting / Recording style / Timeline / Viral hook). Return ONLY the rewritten concept text, no JSON, no commentary.`;
  }
  if (kind === "idea") {
    return `LOCKED SPECIFICATION (one topic idea):\n${specText}\n\nTASK: Rewrite this single topic idea with completely fresh wording, keeping every fact. Keep exactly this structure:\n1. [Heading]\nFish: ...\n${category === "show" ? "Tank: ..." : "Prey: ...\nAquarium: ..."}\n${category === "show" ? "10-second elegant action: ..." : "10-second action: ..."}\nViral hook: ...\nReturn ONLY the rewritten idea text, no JSON, no commentary.`;
  }
  if (kind === "batch") {
    return `LOCKED SPECIFICATION (10 topic ideas):\n${specText}\n\nTASK: Rewrite ALL 10 ideas with completely fresh wording, keeping every fact, every fish/strain/prey combination, the numbering 1-10 and the same per-idea structure as the input. Return ONLY the rewritten 10 ideas text, no JSON, no commentary.`;
  }
  return `LOCKED SPECIFICATION (storyboard image prompt):\n${specText}\n\nTASK: Rewrite this six-frame storyboard image prompt with completely fresh wording, keeping every fact, all six frames with their timestamps (0:00, 0:02, 0:04, 0:06, 0:08, 0:10) and every requirement. Return ONLY the rewritten storyboard prompt as one paragraph, no JSON, no commentary.`;
}

function buildAIRequest(cfg, messages, maxTokens) {
  const provider = AI_PROVIDERS[cfg.provider] || AI_PROVIDERS.openai;
  const base = (cfg.baseUrl || provider.base || "").replace(/\/+$/, "");
  const model = (cfg.model || provider.models[0]).trim();
  if (provider.kind === "gemini") {
    const combined = messages.map(m => `${m.role === "system" ? "SYSTEM" : "USER"}: ${m.content}`).join("\n\n");
    return {
      url: `${base}/models/${encodeURIComponent(model)}:generateContent`,
      headers: { "Content-Type": "application/json", "x-goog-api-key": cfg.apiKey },
      body: {
        contents: [{ parts: [{ text: combined }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: maxTokens || 2200 },
      },
    };
  }
  const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${cfg.apiKey}` };
  if (cfg.provider === "openrouter" && typeof location !== "undefined") {
    headers["HTTP-Referer"] = location.href;
    headers["X-Title"] = "Aquarium Prompt Generator";
  }
  const body = { model, messages, temperature: 0.9, max_tokens: maxTokens || 2200 };
  // gpt-oss adalah model reasoning: reasoning token ikut memakan max_tokens.
  // reasoning_effort rendah membuat output tetap keluar penuh walau budget pas.
  if (cfg.provider === "groq" && /gpt-oss/i.test(model)) {
    body.reasoning_effort = "low";
  }
  return {
    url: `${base}/chat/completions`,
    headers,
    body,
  };
}

function parseAIResponse(providerKey, json) {
  const provider = AI_PROVIDERS[providerKey] || AI_PROVIDERS.openai;
  if (provider.kind === "gemini") {
    const parts = (((json.candidates || [])[0] || {}).content || {}).parts || [];
    return parts.map(p => p.text || "").join("");
  }
  return (((json.choices || [])[0] || {}).message || {}).content || "";
}

function extractJSON(text) {
  if (!text) return null;
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{"), end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (e) { return null; }
}

function validateAIResult(kind, category, text) {
  const problems = [];
  if (!text || text.trim().length < 200) problems.push("hasil AI terlalu pendek");
  if (kind === "prompt" && category === "general") {
    if ((text.match(/\d+\.\d+-\d+\.\d+/g) || []).length < 3) problems.push("label timing kurang dari 3");
    if (!/no cartoon/i.test(text) && !/no CGI/i.test(text)) problems.push("negative lock tidak ditemukan");
  } else if (kind === "prompt") {
    for (const seg of ["0.00-2.00", "2.00-4.00", "4.00-6.00", "6.00-8.00", "8.00-10.00"])
      if (!text.includes(seg)) problems.push("segmen timing " + seg + " hilang");
    if (!/no cinematic/i.test(text)) problems.push("negative lock tidak ditemukan");
    if (category === "show" && !/no feeding/i.test(text)) problems.push("lock 'no feeding' hilang");
    if (category === "predator" && !/9:16/.test(text)) problems.push("rasio 9:16 hilang");
  }
  if (kind === "storyboard" && (text.match(/Frame \d/g) || []).length < 6) problems.push("frame storyboard kurang dari 6");
  if (kind === "batch" && (text.match(/^\d+\./gm) || []).length < 10) problems.push("jumlah ide kurang dari 10");
  return problems;
}

async function aiGenerate(cfg, kind, category, specText, fetchFn) {
  const doFetch = fetchFn || (typeof fetch !== "undefined" ? fetch : null);
  if (!doFetch) throw new Error("fetch tidak tersedia di lingkungan ini");
  if (!cfg.apiKey) throw new Error("API key belum diisi");
  const provider = AI_PROVIDERS[cfg.provider] || AI_PROVIDERS.openai;
  if (provider.kind === "openai" && !(cfg.baseUrl || provider.base)) throw new Error("Base URL custom belum diisi");
  const messages = [
    { role: "system", content: aiSystemPrompt() },
    { role: "user", content: aiUserPrompt(kind, category, specText) },
  ];
  const maxTokens = kind === "batch" ? 4500 : kind === "prompt" ? 1600 : 2600;
  const req = buildAIRequest(cfg, messages, maxTokens);
  const res = await doFetch(req.url, { method: "POST", headers: req.headers, body: JSON.stringify(req.body) });
  if (!res.ok) {
    let detail = "";
    try { const j = await res.json(); detail = (j.error && (j.error.message || j.error.status)) || ""; } catch (e) { /* ignore */ }
    throw new Error(`Provider menolak (HTTP ${res.status})${detail ? ": " + detail : ""}`);
  }
  const json = await res.json();
  const raw = parseAIResponse(cfg.provider, json);
  if (kind === "prompt") {
    const parsed = extractJSON(raw);
    if (!parsed || !parsed.prompt) throw new Error("Format jawaban AI tidak terbaca (bukan JSON berisi prompt)");
    const problems = validateAIResult(kind, category, parsed.prompt);
    return { text: parsed.prompt, title: parsed.title || "", caption: parsed.caption || "", problems };
  }
  const text = (raw || "").trim();
  const problems = validateAIResult(kind, category, text);
  return { text, title: "", caption: "", problems };
}

if (typeof window !== "undefined") { window.AIFresh = { AI_PROVIDERS, buildAIRequest, parseAIResponse, extractJSON, validateAIResult, aiGenerate, aiSystemPrompt, aiUserPrompt }; }
if (typeof module !== "undefined") { module.exports = { AI_PROVIDERS, buildAIRequest, parseAIResponse, extractJSON, validateAIResult, aiGenerate, aiSystemPrompt, aiUserPrompt }; }
