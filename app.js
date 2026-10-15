"use strict";
/* Aquarium Predator Fish Prompt Generator
   Based on Dwi's Ultra Master Prompt (2026-10-15):
   Channa / Predator Fish vs Feeder Prey — Aquarium Feeding Viral Video System
   Locked: 10s, 9:16, raw smartphone, stable aquarium, single camera, realistic
   physics/anatomy, non-graphic feeding, natural audio only, negative lock. */

const FISH = [
  { name: "Channa micropeltes", short: "Channa", look: "large body with bold red-orange lateral stripes over a dark base" },
  { name: "Channa marulioides", short: "Channa", look: "golden-orange scales with dark marbled blotches and a vivid eye-spot near the tail" },
  { name: "Channa pleurophthalma", short: "Snakehead", look: "greenish-brown body with several clear black ocellated eye-spots along its flank" },
  { name: "Channa aurantimaculata", short: "Snakehead", look: "blue-green head fading into bright orange-gold spotted flanks" },
  { name: "Channa andrao", short: "Channa", look: "compact blue-iridescent body with fine dark speckling and orange fin edges" },
  { name: "Snakehead fish", short: "Snakehead", look: "long dark body with blue highlights and a broad flat head" },
  { name: "Oscar fish", short: "Oscar", look: "thick tiger pattern of black and burnt-orange patches with a clear tail eye-spot" },
  { name: "Silver arowana", short: "Arowana", look: "long silver metallic body with large reflective scales and upturned mouth" },
  { name: "Peacock bass", short: "Peacock Bass", look: "dark olive-green body with vertical dark bars and a bright eye-spot on the tail fin" },
  { name: "Redtail catfish", short: "Redtail Catfish", look: "broad grey spotted body, white belly, long whiskers and a bright orange-red tail" },
  { name: "Red-bellied piranha", short: "Piranha", look: "deep silver body with a red-orange belly and a blunt powerful jaw" },
  { name: "Wolf fish", short: "Wolf Fish", look: "dark iridescent elongated body with a large head and visible strong jaws" },
  { name: "Spotted gar", short: "Gar", look: "long cylindrical olive body covered in dark spots with a narrow toothy snout" },
  { name: "Ornate bichir", short: "Bichir", look: "banded yellow-brown patterned body with a row of small dorsal finlets" },
  { name: "Jaguar cichlid", short: "Jaguar Cichlid", look: "large golden-tan body covered in bold black jaguar-like spots and blotches" },
];

const PREY = [
  { name: "frog", short: "Frog", desc: "a green-brown frog with visible back legs, paddling gently", size: "medium" },
  { name: "toad", short: "Toad", desc: "a rough-skinned brown toad, bulky and slow-moving", size: "large" },
  { name: "small feeder fish", short: "Feeder Fish", desc: "a small silver feeder fish flicking its tail nervously", size: "small" },
  { name: "goldfish", short: "Goldfish", desc: "a small bright orange goldfish with flowing fins", size: "small" },
  { name: "minnow", short: "Minnow", desc: "a slim silver minnow darting in short bursts", size: "small" },
  { name: "guppy school", short: "Guppy School", desc: "a small school of colorful guppies moving together", size: "small" },
  { name: "shrimp", short: "Shrimp", desc: "a translucent freshwater shrimp snapping its tail to hop backward", size: "small" },
  { name: "crayfish", short: "Crayfish", desc: "a reddish crayfish with raised claws walking sideways on the bottom", size: "medium" },
  { name: "small crab", short: "Crab", desc: "a small dark crab scuttling slowly with claws raised", size: "medium" },
  { name: "tadpole cluster", short: "Tadpoles", desc: "a cluster of dark tadpoles wriggling together", size: "small" },
  { name: "large surface insect", short: "Insect", desc: "a large dark insect stranded on the water surface, legs creating tiny ripples", size: "small" },
  { name: "small mouse", short: "Mouse", desc: "a small mouse paddling on the surface (only when specifically selected)", size: "large" },
];

const OPTIONS = {
  substrate: ["dark substrate", "light sand bottom", "fine natural gravel", "smooth bare bottom"],
  decor: ["one piece of driftwood and a few smooth stones", "sparse aquatic plants and smooth stones", "smooth stones only, kept very minimal", "a single driftwood branch with open swim space", "sparse plants near the back glass only"],
  background: ["matte black background", "deep dark-blue background", "plain dark background with a softly blurred room behind the glass"],
  water: ["clear water", "slightly green-tinted clear water", "warm amber-tinted clear water", "cool crystal-clear water"],
  camera: ["a front-facing glass view", "a slightly front-side angle", "a mild above-front angle", "a tripod-like fixed phone position at the front glass"],
  fishStart: ["hovering on the left side of the tank", "cruising slowly on the right side of the tank", "holding position low near the center", "mid-water on the center-left, fully visible", "holding near the driftwood, body fully readable"],
  preyStart: ["near the water surface on the opposite side", "at the surface in the center of the tank", "mid-water, drifting slowly toward the open center", "just entering the water at the top of the frame", "low near the stones, away from the fish"],
  strikeDirection: ["left to right", "right to left", "diagonally upward from below", "straight forward through open water"],
  strikeTime: ["6.0", "6.5", "7.0"],
  lighting: ["ordinary warm indoor aquarium lighting", "cool daylight-style aquarium lighting from above", "soft neutral hobby aquarium lighting", "slightly warm evening room lighting with a tank light above"],
  sound: ["water slosh, a strike splash and a soft filter hum", "gentle bubbles, surface ripples and the final splash", "quiet room ambience, filter hum and soft bubble noise", "surface movement, a quick splash and settling water sounds"],
  outcome: ["auto", "whole", "portion"],
};

const TITLE_TEMPLATES = [
  (f, p) => `The ${f} Saw the ${p} Instantly`,
  (f, p) => `Watch the Strike at 6 Seconds`,
  (f, p) => `This ${f} Feed Turns Wild Fast`,
  (f, p) => `The ${f} Waited for the Perfect Moment`,
  (f, p) => `Don't Blink When the ${p} Drifts Closer`,
];
const TITLE_PORTION = [
  (f, p) => `The Fish Couldn't Swallow It Whole`,
  (f, p) => `The Final Bite Was Unexpected`,
  (f, p) => `Too Big to Swallow in One Go`,
];

function pick(arr, rng) { return arr[Math.floor((rng || Math.random)() * arr.length)]; }
function shuffle(arr, rng) {
  const a = arr.slice(); const r = rng || Math.random;
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function resolveOutcome(prey, outcome) {
  if (outcome === "whole" || outcome === "portion") return outcome;
  return prey.size === "large" ? "portion" : "whole"; // auto rule from master prompt sec. 11
}

function buildPrompt(sel) {
  const fish = sel.fish, prey = sel.prey;
  const outcome = resolveOutcome(prey, sel.outcome);
  const outcomeText = outcome === "whole"
    ? "the fish takes the prey into its mouth and swallows it whole in one believable motion, then holds still facing the camera with empty open water where the prey was"
    : "because the prey is too large to swallow whole, the fish grips it, repositions it with one short shake, bites off and swallows only one portion, while the rest stays partly visible and drifts down slowly";
  const t = parseFloat(sel.strikeTime);
  const body =
`Create an exactly 10-second vertical 9:16 fictional AI-generated aquarium feeding video designed to look like a raw modern smartphone recording of a predator fish inside a home aquarium. The predator is a ${fish.name} with ${fish.look}, large and instantly readable on screen. The prey is ${prey.desc}, positioned ${sel.preyStart}. The aquarium has clear glass, a visible water line, ${sel.water}, a ${sel.substrate}, ${sel.decor}, and a ${sel.background}, with glass reflections and filter bubbles, and it never changes layout or clarity. The camera uses ${sel.camera}, mostly fixed with subtle micro-shake, autofocus breathing, slight sensor noise and motion blur only during the strike, under ${sel.lighting}. First frame: the predator is ${sel.fishStart}, prey already visible, open water between them. 0.00-2.00 seconds: the fish hovers or cruises slowly while the prey moves naturally. 2.00-4.00 seconds: the fish notices the prey, with a slight body turn and slow glide, while the prey keeps paddling, drifting or twitching. 4.00-6.00 seconds: the fish aligns, locks focus and holds still for a beat as the prey reacts subtly. 6.00-8.00 seconds: at about ${t.toFixed(1)} seconds the fish lunges suddenly ${sel.strikeDirection} and seizes the prey in one believable strike, with disturbed water and body flex. 8.00-10.00 seconds: ${outcomeText}, the water settles, and the video ends on that readable result with a hard cut. Keep fish species, pattern and fin count and prey species, size and anatomy constant, with realistic water resistance and shadows. Audio is only natural aquarium sound: ${sel.sound}, with no music, no narration and no voice-over. No cinematic style, no camera cuts, no angle changes, no zoom, no slow motion, no subtitles, no text, no watermark, no impossible anatomy, no extra or missing fins, no duplicate fish or prey, no changing aquarium, no transforming water, no floating through glass, no prey teleportation, no instant unrealistic swallowing, no gore, no fantasy lighting, no glossy ad look and no obvious AI errors.`;
  const titleList = outcome === "portion" ? TITLE_PORTION.concat(TITLE_TEMPLATES) : TITLE_TEMPLATES;
  const title = pick(titleList)(fish.short, prey.short);
  const caption = outcome === "portion"
    ? `The ${fish.short.toLowerCase()} grabs the ${prey.short.toLowerCase()} but it is too big to finish in one bite. Watch the final seconds.`
    : `The ${fish.short.toLowerCase()} stays still until the ${prey.short.toLowerCase()} drifts too close. Watch what happens at the strike.`;
  return { body, title, caption, outcome, chars: body.length };
}

function buildIdea(sel) {
  const fish = sel.fish, prey = sel.prey;
  const outcome = resolveOutcome(prey, sel.outcome);
  const outcomeText = outcome === "whole" ? "swallows it whole by the final seconds" : "cannot swallow it whole, so it grips, repositions and bites off one portion to swallow while the rest drifts down";
  return {
    heading: `${fish.name} vs ${prey.name}`,
    fish: `${fish.name} — ${fish.look}.`,
    prey: `${prey.desc.charAt(0).toUpperCase() + prey.desc.slice(1)}; size class: ${prey.size}.`,
    aquarium: `${sel.water.charAt(0).toUpperCase() + sel.water.slice(1)}, ${sel.substrate}, ${sel.decor}, ${sel.background}; camera: ${sel.camera}.`,
    action: `Fish starts ${sel.fishStart} while the prey is ${sel.preyStart}. It notices the prey, aligns silently, then strikes ${sel.strikeDirection} at about ${sel.strikeTime} seconds and ${outcomeText}.`,
    hook: outcome === "portion"
      ? "Viewers stay to see whether the fish can finish a prey that clearly does not fit in one bite."
      : "The long silent stare followed by one explosive strike makes viewers watch until the very last second.",
  };
}

function ideaToText(idea, n) {
  return `${n}. ${idea.heading}\nFish: ${idea.fish}\nPrey: ${idea.prey}\nAquarium: ${idea.aquarium}\n10-second action: ${idea.action}\nViral hook: ${idea.hook}`;
}

function buildBatch10(rng) {
  const fishes = shuffle(FISH, rng).slice(0, 10);
  const preyPool = PREY.filter(p => p.name !== "small mouse"); // mouse only when specifically requested
  const preys = shuffle(preyPool, rng).slice(0, 10);
  return fishes.map((fish, i) => buildIdea({
    fish, prey: preys[i],
    substrate: pick(OPTIONS.substrate, rng), decor: pick(OPTIONS.decor, rng),
    background: pick(OPTIONS.background, rng), water: pick(OPTIONS.water, rng),
    camera: pick(OPTIONS.camera, rng), fishStart: pick(OPTIONS.fishStart, rng),
    preyStart: pick(OPTIONS.preyStart, rng), strikeDirection: pick(OPTIONS.strikeDirection, rng),
    strikeTime: pick(OPTIONS.strikeTime, rng), lighting: pick(OPTIONS.lighting, rng),
    sound: pick(OPTIONS.sound, rng), outcome: "auto",
  }));
}

function buildStoryboard(sel) {
  const fish = sel.fish, prey = sel.prey;
  const outcome = resolveOutcome(prey, sel.outcome);
  const last = outcome === "whole" ? "prey swallowed whole, fish holding still" : "fish swallows one bitten portion, remaining portion drifting down";
  return `Create one single composite storyboard image with six equally sized panels, raw smartphone realism, the same ${fish.name} (${fish.look}), the same prey (${prey.desc}), the same aquarium (${sel.substrate}, ${sel.decor}, ${sel.background}) and the same camera (${sel.camera}) in every panel, no cinematic borders, no cartoon style, no camera-angle change. Frame 1 - 0:00: predator ${sel.fishStart}, prey visible ${sel.preyStart}, open water between them. Frame 2 - 0:02: fish notices the prey, slight body turn toward it. Frame 3 - 0:04: fish aligned and locked on, holding still before the strike. Frame 4 - 0:06: sudden lunge ${sel.strikeDirection}, fish seizes the prey, water disturbed with natural motion blur. Frame 5 - 0:08: ${outcome === "whole" ? "fish swallowing the prey, prey nearly fully inside its mouth" : "fish gripping and repositioning the oversized prey, biting off one portion"}. Frame 6 - 0:10: final feeding result, ${last}, water settling. Add only a small clear timestamp in the corner of each panel and no other text.`;
}

/* ================= KATEGORI 2: IKAN KONTES / SHOW =================
   Added 2026-10-15 at Dwi's request: show/contest fish moving elegantly.
   Same locked skeleton (10s, 9:16, raw smartphone, stable tank, one camera,
   natural audio, negative lock) but NO feeding and NO prey — the payoff is
   the peak fin/color display moment instead of a strike. */

const SHOW_FISH = [
  { name: "Cupang Halfmoon (Betta)", short: "Betta", look: "a deep red body with an enormous flowing half-moon tail and long veil-like fins" },
  { name: "Cupang Crowntail (Betta)", short: "Betta", look: "an electric blue body with a spiky crown-shaped tail with fine ray extensions" },
  { name: "Cupang Plakat Dragon (Betta)", short: "Betta", look: "a short-finned metallic dragon-scale body in copper, silver and black" },
  { name: "Guppy Fancy", short: "Guppy", look: "a small bright male guppy with a huge flowing orange-red patterned tail like an open fan" },
  { name: "Arowana Super Red", short: "Arowana", look: "a large long body covered in metallic red scales with a flowing double tail fin" },
  { name: "Arowana Golden Crossback", short: "Arowana", look: "a large long body with golden metallic scales shining across its back" },
  { name: "Arowana Silver", short: "Arowana", look: "a large long body with mirror-silver scales and an upturned mouth" },
  { name: "Koi Kohaku", short: "Koi", look: "a smooth powerful white body with bold hi-red patches" },
  { name: "Mas Koki Oranda", short: "Oranda", look: "a round orange body with a flowing double tail and a raspberry-like head growth" },
  { name: "Mas Koki Ranchu", short: "Ranchu", look: "a round red-and-white body with a curved back, no dorsal fin and a short fan tail" },
  { name: "Discus", short: "Discus", look: "a tall round body with turquoise and red vertical patterning" },
  { name: "Angelfish (Manfish)", short: "Angelfish", look: "a tall triangular silver body with black vertical stripes and long trailing fins" },
  { name: "Louhan (Flowerhorn)", short: "Flowerhorn", look: "a vivid red-orange body with flower-like markings and a prominent rounded head hump" },
  { name: "Rainbowfish Boesemani", short: "Rainbowfish", look: "a split-color body, bright orange rear half and blue-green front half" },
  { name: "Cardinal Tetra School", short: "Tetra School", look: "a small school of neon blue and red cardinal tetras moving together as one shimmering group", group: true },
];

const SHOW_OPTIONS = {
  substrate: ["a clean bare show-tank bottom", "dark fine substrate", "light sand bottom", "a clean reflective bare bottom"],
  decor: ["a completely bare show tank with no decorations", "one minimal green plant in a back corner", "a single smooth stone", "nothing but the plain backdrop"],
  background: ["a matte black backdrop that makes the colors pop", "a deep blue backdrop", "a clean light-grey backdrop", "a dark green backdrop"],
  water: ["crystal-clear polished water", "clear water with a slight blue tint", "clear warm-tinted water"],
  camera: ["a front-facing glass view", "a slightly front-side angle", "a mild above-front angle", "a tripod-like fixed phone position at the front glass"],
  start: ["center-left mid-water with its full body visible", "on the left side near the front glass", "in the exact center of the tank", "on the right side mid-water", "low near the bottom, ready to rise gracefully"],
  direction: ["left to right", "right to left", "diagonally across the tank", "in a slow circle in the center"],
  movement: ["a slow elegant cruise with fins flowing behind it", "a graceful S-curve turn that displays both sides of its body", "a full fin-flare display, spreading every fin wide and holding the pose", "a gentle rise toward the surface followed by a smooth level glide", "a slow circular display turn in the center of the tank", "a flowing tail-sweep pass along the front glass"],
  peakTime: ["5.5", "6.0", "6.5", "7.0"],
  lighting: ["bright full-spectrum contest LED lighting from above", "warm white lighting that enhances red and gold colors", "cool white lighting that enhances blue and silver colors", "soft daylight-style lighting from above"],
  sound: ["quiet room ambience and soft filter bubbles", "gentle surface ripples and a soft filter hum", "near-silent clean aquarium ambience", "soft bubble noise and calm water movement"],
};

const SHOW_TITLES = [
  f => `This ${f} Moves Like Royalty`,
  f => `The Colors on This ${f} Are Unreal`,
  f => `Born for the Contest Tank`,
  f => `This ${f} Knows It Looks Good`,
];

function buildShowPrompt(sel) {
  const fish = sel.fish, t = parseFloat(sel.peakTime);
  const solo = fish.group ? "one small school moving together as a single group, with no stray fish" : "a single fish alone in the tank, with no other fish";
  const body =
`Create an exactly 10-second vertical 9:16 fictional AI-generated aquarium show-fish video designed to look like a raw modern smartphone recording of a beautiful contest fish inside a clean home show aquarium. The fish is a ${fish.name} with ${fish.look}, shown as ${solo}. The show tank has clear glass, a visible water line, ${sel.water}, ${sel.substrate}, ${sel.decor}, and ${sel.background}, with natural glass reflections and gentle filter bubbles, and it never changes layout or clarity. The camera uses ${sel.camera}, mostly fixed with subtle micro-shake, autofocus breathing, slight sensor noise and natural motion blur only on the fastest fin movement, under ${sel.lighting} that makes its true colors shine. First frame: the fish is ${sel.start}, full body and full fin shape clearly readable, like a contestant being presented to a judge. 0.00-2.00 seconds: the fish holds a beautiful opening pose with fins naturally spread, colors immediately readable. 2.00-4.00 seconds: it begins ${sel.movement}, moving ${sel.direction} with slow elegant body motion and fins flowing smoothly in the water. 4.00-6.00 seconds: it continues the display with a graceful turn, showing its fin shape and color pattern from a new side without any sudden movement. 6.00-8.00 seconds: at about ${t.toFixed(1)} seconds comes the peak display moment, its fins spread at their widest and its colors at their brightest as it holds the most elegant pose of the video. 8.00-10.00 seconds: it glides slowly into a final centered beauty pose, fins still flowing, and the video ends on that pose with a hard cut. Keep the species, color pattern, fin shape and body size constant for the whole video, with realistic fin flow, water resistance, turning and shadows and no clipping through glass or decor. Audio is only natural aquarium sound: ${sel.sound}, with no music, no narration and no voice-over. No feeding, no prey, no cinematic style, no camera cuts, no angle changes, no zoom, no slow motion, no subtitles, no text, no watermark, no extra fish, no duplicate fish, no deformed or torn fins, no changing colors or pattern, no changing aquarium, no dirty or cloudy water, no cartoon style, no glossy ad look and no obvious AI errors.`;
  const title = fish.group ? `This Tiny School Moves as One` : pick(SHOW_TITLES)(fish.short);
  const caption = `The ${fish.short.toLowerCase()} takes its time showing off every color and fin. Watch the peak display near the end.`;
  return { body, title, caption, chars: body.length };
}

function buildShowIdea(sel) {
  const fish = sel.fish;
  return {
    heading: `${fish.name} — Elegant Show`,
    fish: `${fish.name} — ${fish.look}.`,
    tank: `${sel.water.charAt(0).toUpperCase() + sel.water.slice(1)}, ${sel.substrate}, ${sel.decor}, ${sel.background}; lighting: ${sel.lighting}; camera: ${sel.camera}.`,
    action: `Fish opens ${sel.start}, then performs ${sel.movement} moving ${sel.direction}; peak fin-and-color display at about ${sel.peakTime} seconds, ending in a centered beauty pose.`,
    hook: "Slow royal movement plus one peak fin display makes viewers replay it just to watch the fins flow again.",
  };
}
function showIdeaToText(idea, n) {
  return `${n}. ${idea.heading}\nFish: ${idea.fish}\nTank: ${idea.tank}\n10-second elegant action: ${idea.action}\nViral hook: ${idea.hook}`;
}
function buildShowBatch10(rng) {
  const fishes = shuffle(SHOW_FISH, rng).slice(0, 10);
  return fishes.map(fish => buildShowIdea({
    fish,
    substrate: pick(SHOW_OPTIONS.substrate, rng), decor: pick(SHOW_OPTIONS.decor, rng),
    background: pick(SHOW_OPTIONS.background, rng), water: pick(SHOW_OPTIONS.water, rng),
    camera: pick(SHOW_OPTIONS.camera, rng), start: pick(SHOW_OPTIONS.start, rng),
    direction: pick(SHOW_OPTIONS.direction, rng), movement: pick(SHOW_OPTIONS.movement, rng),
    peakTime: pick(SHOW_OPTIONS.peakTime, rng), lighting: pick(SHOW_OPTIONS.lighting, rng),
    sound: pick(SHOW_OPTIONS.sound, rng),
  }));
}
function buildShowStoryboard(sel) {
  const fish = sel.fish;
  return `Create one single composite storyboard image with six equally sized panels, raw smartphone realism, the same ${fish.name} (${fish.look}), the same show tank (${sel.substrate}, ${sel.decor}, ${sel.background}) and the same camera (${sel.camera}) in every panel, no cinematic borders, no cartoon style, no camera-angle change. Frame 1 - 0:00: fish ${sel.start}, full body and fins readable in an opening contest pose. Frame 2 - 0:02: fish begins ${sel.movement}, moving ${sel.direction}. Frame 3 - 0:04: graceful turn showing fin shape and colors from a new side. Frame 4 - 0:06: peak display moment, fins spread at their widest, colors at their brightest. Frame 5 - 0:08: fish gliding slowly out of the display, fins still flowing. Frame 6 - 0:10: final centered beauty pose, fins spread, hard end frame. Add only a small clear timestamp in the corner of each panel and no other text.`;
}

/* ---------- Browser UI ---------- */
if (typeof document !== "undefined") {
  const $ = id => document.getElementById(id);
  function fillSelect(id, items, labelFn) {
    const el = $(id); items.forEach((it, i) => { const o = document.createElement("option"); o.value = i; o.textContent = labelFn(it); el.appendChild(o); });
  }
  function fillOpt(id, items) {
    const el = $(id); items.forEach((v, i) => { const o = document.createElement("option"); o.value = i; o.textContent = v; el.appendChild(o); });
  }
  document.addEventListener("DOMContentLoaded", () => {
    fillSelect("fish", FISH, f => f.name);
    fillSelect("prey", PREY, p => p.name + (p.name === "small mouse" ? " (khusus, hanya jika diminta)" : ""));
    ["substrate", "decor", "background", "water", "camera", "fishStart", "preyStart", "strikeDirection", "strikeTime", "lighting", "sound"].forEach(k => fillOpt(k, OPTIONS[k]));
    fillSelect("showFish", SHOW_FISH, f => f.name);
    ["substrate", "decor", "background", "water", "camera", "start", "direction", "movement", "peakTime", "lighting", "sound"].forEach(k => fillOpt("show" + k.charAt(0).toUpperCase() + k.slice(1), SHOW_OPTIONS[k]));
    const getSel = () => ({
      fish: FISH[+$("fish").value], prey: PREY[+$("prey").value],
      substrate: OPTIONS.substrate[+$("substrate").value], decor: OPTIONS.decor[+$("decor").value],
      background: OPTIONS.background[+$("background").value], water: OPTIONS.water[+$("water").value],
      camera: OPTIONS.camera[+$("camera").value], fishStart: OPTIONS.fishStart[+$("fishStart").value],
      preyStart: OPTIONS.preyStart[+$("preyStart").value], strikeDirection: OPTIONS.strikeDirection[+$("strikeDirection").value],
      strikeTime: OPTIONS.strikeTime[+$("strikeTime").value], lighting: OPTIONS.lighting[+$("lighting").value],
      sound: OPTIONS.sound[+$("sound").value], outcome: $("outcome").value,
    });
    const getShowSel = () => ({
      fish: SHOW_FISH[+$("showFish").value],
      substrate: SHOW_OPTIONS.substrate[+$("showSubstrate").value], decor: SHOW_OPTIONS.decor[+$("showDecor").value],
      background: SHOW_OPTIONS.background[+$("showBackground").value], water: SHOW_OPTIONS.water[+$("showWater").value],
      camera: SHOW_OPTIONS.camera[+$("showCamera").value], start: SHOW_OPTIONS.start[+$("showStart").value],
      direction: SHOW_OPTIONS.direction[+$("showDirection").value], movement: SHOW_OPTIONS.movement[+$("showMovement").value],
      peakTime: SHOW_OPTIONS.peakTime[+$("showPeakTime").value], lighting: SHOW_OPTIONS.lighting[+$("showLighting").value],
      sound: SHOW_OPTIONS.sound[+$("showSound").value],
    });
    const category = () => document.querySelector("input[name=category]:checked").value;
    function applyCategory() {
      const isShow = category() === "show";
      $("predatorFields").style.display = isShow ? "none" : "";
      $("showFields").style.display = isShow ? "" : "none";
      $("predatorNote").style.display = isShow ? "none" : "";
      $("showNote").style.display = isShow ? "" : "none";
    }
    document.querySelectorAll("input[name=category]").forEach(r => r.addEventListener("change", () => { applyCategory(); $("btnPrompt").click(); }));
    function show(id, text) { $(id).textContent = text; }
    function randomize() {
      const set = (id, n) => { $(id).value = Math.floor(Math.random() * n); };
      if (category() === "show") {
        set("showFish", SHOW_FISH.length);
        ["showSubstrate", "showDecor", "showBackground", "showWater", "showCamera", "showStart", "showDirection", "showMovement", "showPeakTime", "showLighting", "showSound"].forEach((id, i) => set(id, Object.values(SHOW_OPTIONS)[i].length));
      } else {
        set("fish", FISH.length); set("prey", PREY.filter(p => p.name !== "small mouse").length);
        ["substrate", "decor", "background", "water", "camera", "fishStart", "preyStart", "strikeDirection", "strikeTime", "lighting", "sound"].forEach(k => set(k, OPTIONS[k].length));
      }
    }
    $("btnRandom").onclick = () => { randomize(); $("btnPrompt").click(); };
    $("btnPrompt").onclick = () => {
      if (category() === "show") {
        const r = buildShowPrompt(getShowSel());
        show("outPrompt", `${r.body}\n\nTitle: ${r.title}\nCaption: ${r.caption}`);
        show("promptMeta", `${r.chars} karakter - Kategori: Kontes / Show (tanpa feeding, puncak display sirip & warna)`);
      } else {
        const r = buildPrompt(getSel());
        show("outPrompt", `${r.body}\n\nTitle: ${r.title}\nCaption: ${r.caption}`);
        show("promptMeta", `${r.chars} karakter (target master prompt: 1.800-2.600) - Outcome: ${r.outcome === "whole" ? "telan utuh" : "potong sebagian"}`);
      }
      activateTab("tabPrompt");
    };
    $("btnIdea").onclick = () => {
      if (category() === "show") { show("outIdea", showIdeaToText(buildShowIdea(getShowSel()), 1)); }
      else { show("outIdea", ideaToText(buildIdea(getSel()), 1)); }
      activateTab("tabIdea");
    };
    $("btnBatch").onclick = () => {
      if (category() === "show") { show("outBatch", "Here are 10 fresh aquarium show-fish video ideas:\n\n" + buildShowBatch10().map((idea, i) => showIdeaToText(idea, i + 1)).join("\n\n")); }
      else { show("outBatch", "Here are 10 fresh aquarium predator-fish feeding video ideas:\n\n" + buildBatch10().map((idea, i) => ideaToText(idea, i + 1)).join("\n\n")); }
      activateTab("tabBatch");
    };
    $("btnStoryboard").onclick = () => {
      show("outStoryboard", category() === "show" ? buildShowStoryboard(getShowSel()) : buildStoryboard(getSel()));
      activateTab("tabStoryboard");
    };
    document.querySelectorAll("[data-copy]").forEach(btn => {
      btn.onclick = async () => {
        const target = $(btn.getAttribute("data-copy"));
        try { await navigator.clipboard.writeText(target.textContent); btn.textContent = "Tersalin ✓"; }
        catch (e) { btn.textContent = "Pilih teks & salin manual"; }
        setTimeout(() => btn.textContent = "Copy", 1500);
      };
    });
    window.activateTab = function (id) {
      document.querySelectorAll(".tabbtn").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
      document.querySelectorAll(".tabpane").forEach(p => p.classList.toggle("active", p.id === id));
    };
    document.querySelectorAll(".tabbtn").forEach(b => b.onclick = () => activateTab(b.dataset.tab));
    applyCategory(); randomize(); $("btnPrompt").click();
  });
}
if (typeof module !== "undefined") { module.exports = { FISH, PREY, OPTIONS, buildPrompt, buildIdea, buildBatch10, buildStoryboard, resolveOutcome, SHOW_FISH, SHOW_OPTIONS, buildShowPrompt, buildShowIdea, buildShowBatch10, buildShowStoryboard }; }
