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

function cleanCustom(text) {
  return (text || "").replace(/\s+/g, " ").trim().slice(0, 300);
}
function customSentence(sel) {
  const c = cleanCustom(sel && sel.custom);
  if (!c) return "";
  return ` Special request from the creator: ${c}${/[.!?]$/.test(c) ? "" : "."}`;
}
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
`Create an exactly 10-second vertical 9:16 fictional AI-generated aquarium feeding video designed to look like a raw modern smartphone recording of a predator fish inside a home aquarium. The predator is a ${fish.name} with ${fish.look}, large and instantly readable on screen. The prey is ${prey.desc}, positioned ${sel.preyStart}. The aquarium has clear glass, a visible water line, ${sel.water}, a ${sel.substrate}, ${sel.decor}, and a ${sel.background}, with glass reflections and filter bubbles, and it never changes layout or clarity. The camera uses ${sel.camera}, mostly fixed with subtle micro-shake, autofocus breathing, slight sensor noise and motion blur only during the strike, under ${sel.lighting}. First frame: the predator is ${sel.fishStart}, prey already visible, open water between them. 0.00-2.00 seconds: the fish hovers or cruises slowly while the prey moves naturally. 2.00-4.00 seconds: the fish notices the prey, with a slight body turn and slow glide, while the prey keeps paddling, drifting or twitching. 4.00-6.00 seconds: the fish aligns, locks focus and holds still for a beat as the prey reacts subtly. 6.00-8.00 seconds: at about ${t.toFixed(1)} seconds the fish lunges suddenly ${sel.strikeDirection} and seizes the prey in one believable strike, with disturbed water and body flex. 8.00-10.00 seconds: ${outcomeText}, the water settles, and the video ends on that readable result with a hard cut. Keep fish species, pattern and fin count and prey species, size and anatomy constant, with realistic water resistance and shadows. Audio is only natural aquarium sound: ${sel.sound}, with no music, no narration and no voice-over.${customSentence(sel)} No cinematic style, no camera cuts, no angle changes, no zoom, no slow motion, no subtitles, no text, no watermark, no impossible anatomy, no extra or missing fins, no duplicate fish or prey, no changing aquarium, no transforming water, no floating through glass, no prey teleportation, no instant unrealistic swallowing, no gore, no fantasy lighting, no glossy ad look and no obvious AI errors.`;
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
    custom: cleanCustom(sel.custom),
  };
}

function ideaToText(idea, n) {
  return `${n}. ${idea.heading}\nFish: ${idea.fish}\nPrey: ${idea.prey}\nAquarium: ${idea.aquarium}\n10-second action: ${idea.action}\nViral hook: ${idea.hook}${idea.custom ? `\nSpecial request: ${idea.custom}` : ""}`;
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
  return `Create one single composite storyboard image with six equally sized panels, raw smartphone realism, the same ${fish.name} (${fish.look}), the same prey (${prey.desc}), the same aquarium (${sel.substrate}, ${sel.decor}, ${sel.background}) and the same camera (${sel.camera}) in every panel, no cinematic borders, no cartoon style, no camera-angle change. Frame 1 - 0:00: predator ${sel.fishStart}, prey visible ${sel.preyStart}, open water between them. Frame 2 - 0:02: fish notices the prey, slight body turn toward it. Frame 3 - 0:04: fish aligned and locked on, holding still before the strike. Frame 4 - 0:06: sudden lunge ${sel.strikeDirection}, fish seizes the prey, water disturbed with natural motion blur. Frame 5 - 0:08: ${outcome === "whole" ? "fish swallowing the prey, prey nearly fully inside its mouth" : "fish gripping and repositioning the oversized prey, biting off one portion"}. Frame 6 - 0:10: final feeding result, ${last}, water settling. Add only a small clear timestamp in the corner of each panel and no other text.${customSentence(sel)}`;
}

/* ================= KATEGORI 2: IKAN KONTES / SHOW =================
   Added 2026-10-15 at Dwi's request: show/contest fish moving elegantly.
   Same locked skeleton (10s, 9:16, raw smartphone, stable tank, one camera,
   natural audio, negative lock) but NO feeding and NO prey — the payoff is
   the peak fin/color display moment instead of a strike. */

const SHOW_FISH = [
  { name: "Cupang (Betta)", short: "Betta", variants: [
    { name: "Halfmoon Platinum White (Full White)", look: "a pure solid white body with a huge flowing translucent white half-moon tail and fins" },
    { name: "Halfmoon Super Red", look: "a solid deep red body with an enormous flowing half-moon tail" },
    { name: "Halfmoon Blue Rim", look: "a white body with blue-edged fins and a flowing half-moon tail" },
    { name: "Halfmoon Mustard Gas", look: "a blue-green body with bright yellow flowing half-moon fins" },
    { name: "Crowntail Black Orchid", look: "a black body with purple-blue highlights and a spiky crown-shaped tail" },
    { name: "Crowntail Super Red", look: "a solid red body with a spiky crown-shaped tail with fine ray extensions" },
    { name: "Plakat Dragon White (Snow Dragon)", look: "shiny metallic white dragon scales over a short-finned muscular body" },
    { name: "Plakat Nemo Koi", look: "orange, white and black koi-like patches on a short-finned body" },
    { name: "Plakat Avatar", look: "a dark black-blue body covered in bright turquoise speckles" },
    { name: "Dumbo Ear (Elephant Ear)", look: "oversized white ear-like pectoral fins, a soft pastel body and a flowing tail" },
  ]},
  { name: "Guppy", short: "Guppy", variants: [
    { name: "Black Moscow", look: "a fully solid black body and tail, dark and velvety from head to tail" },
    { name: "AFR (Albino Full Red)", look: "a pale albino body with bright solid red fins and tail and soft red eyes, the classic albino full red look" },
    { name: "Albino Koi", look: "a cream albino body with orange-red koi-like cap markings and soft red eyes" },
    { name: "Blue Moscow", look: "a fully solid metallic dark blue body and flowing tail" },
    { name: "Red Cobra", look: "a red-orange body with black cobra snake-like patterning and a patterned fan tail" },
    { name: "Green Cobra", look: "a green body with black cobra snake-like patterning and a patterned fan tail" },
    { name: "Dragon Big Ear", look: "a red and silver dragon-patterned body with extra-large pectoral fins and a big fan tail" },
    { name: "Tuxedo Red", look: "a dark rear-half body with a bright solid red tail" },
    { name: "Platinum White (Full White)", look: "a fully platinum white body and flowing tail, clean and uniform" },
    { name: "HB Blue (Half Black Blue)", look: "a half-black body with a bright blue tail" },
    { name: "Japan Blue", look: "a pale front body with a metallic sky-blue rear half and tail" },
    { name: "Yellow Tiger", look: "a bright yellow body with dark tiger-like patterning and a fan tail" },
  ]},
  { name: "Arowana", short: "Arowana", variants: [
    { name: "Super Red", look: "intense metallic red scales, red fins and a large long body" },
    { name: "Golden Red (RTG)", look: "golden scales rising to the fifth row with a darker back and a red-tinged tail" },
    { name: "Crossback Golden 24K", look: "full golden metallic scales crossing over its back, shining gold from every angle" },
    { name: "Silver", look: "mirror-silver large scales, a long body and an upturned mouth" },
    { name: "Silver Albino", look: "a pale creamy white albino body with soft pink-red eyes and translucent fins" },
    { name: "Platinum Snow White", look: "a rare fully snow-white platinum body, clean and uniform from head to tail" },
    { name: "Green Arowana", look: "greenish-grey scales with a soft green sheen" },
    { name: "Banjar Red", look: "an orange-red tail and fins with paler golden-green body scales" },
    { name: "Black Arowana", look: "a dark silvery body with black-edged scales and black fin edges" },
  ]},
  { name: "Koi", short: "Koi", variants: [
    { name: "Kohaku", look: "a smooth powerful white body with bold hi-red patches" },
    { name: "Taisho Sanke", look: "a white body with red patches and neat black accents" },
    { name: "Showa Sanshoku", look: "a black-based body with bold red and white markings" },
    { name: "Albino Platinum (Ogon)", look: "a fully solid white platinum body with a soft metallic sheen, one clean color from head to tail" },
    { name: "Yamabuki Ogon (Full Yellow)", look: "a fully solid metallic yellow body, one clean color from head to tail" },
    { name: "Tancho", look: "a clean white body with a single round red circle on its head" },
    { name: "Butterfly Koi Kohaku", look: "a white body with red patches and extra-long flowing butterfly fins" },
    { name: "Karasugoi (Full Black)", look: "a fully solid black body from head to tail" },
  ]},
  { name: "Mas Koki (Fancy Goldfish)", short: "Goldfish", variants: [
    { name: "Oranda Red Cap", look: "a white round body with a red raspberry-like head growth and a flowing double tail" },
    { name: "Oranda Full Red", look: "a solid red-orange round body with a head growth and a flowing double tail" },
    { name: "Oranda Panda", look: "a round body with black and white panda patches, a head growth and a flowing double tail" },
    { name: "Ranchu Red & White", look: "a round red-and-white body with a curved back, no dorsal fin and a short fan tail" },
    { name: "Ranchu Calico", look: "a round calico-speckled body with a curved back, no dorsal fin and a short fan tail" },
    { name: "Ranchu Full Black", look: "a fully solid black round body with a curved back and a short fan tail" },
    { name: "Ryukin Red & White", look: "a tall humped red-and-white body with a long flowing double tail" },
    { name: "Ryukin Calico", look: "a tall humped calico body with a long flowing double tail" },
    { name: "Black Moor", look: "a fully solid black body with telescope eyes and long flowing fins" },
    { name: "Pearlscale Orange", look: "a round orange body covered in raised pearl-like scales with a double tail" },
  ]},
  { name: "Discus", short: "Discus", variants: [
    { name: "Red Melon", look: "a tall round body in solid orange-red" },
    { name: "Blue Diamond", look: "a tall round body in solid metallic blue" },
    { name: "Pigeon Blood", look: "a creamy round body with red patterning and fine speckles" },
    { name: "Blue Turquoise", look: "a turquoise round body with red vertical striations" },
    { name: "Albino Platinum", look: "a pale white albino round body with soft red eyes" },
    { name: "Yellow", look: "a tall round body in solid golden yellow" },
    { name: "Snakeskin", look: "a round body covered in fine intricate snakeskin patterning" },
  ]},
  { name: "Angelfish (Manfish)", short: "Angelfish", variants: [
    { name: "Platinum (Full White)", look: "a fully solid silvery white tall triangular body with long trailing fins" },
    { name: "Marble", look: "a tall triangular body marbled in black, white and grey with long trailing fins" },
    { name: "Koi Angelfish", look: "an orange head with black and white patches on a tall triangular body" },
    { name: "Full Black", look: "a fully solid black tall triangular body with long trailing fins" },
    { name: "Gold", look: "a solid golden tall triangular body with long trailing fins" },
    { name: "Albino", look: "a pale creamy albino body with soft red eyes and long trailing fins" },
    { name: "Pinoy Blue", look: "a dark body with a blue metallic sheen and long trailing fins" },
  ]},
  { name: "Louhan (Flowerhorn)", short: "Flowerhorn", variants: [
    { name: "Kamfa", look: "a very large rounded head hump, a deep red body with pearly spots and a wide fan tail" },
    { name: "Zhen Zhu (Pearlscale)", look: "a bright red-orange body covered in shiny pearl spots with a rounded head hump" },
    { name: "Golden Base (Fader)", look: "golden-orange fading colors with a large head hump and dark flower-line markings" },
    { name: "Full Red", look: "a solid vivid red body with a large head hump and flower-line markings" },
  ]},
  { name: "Rainbowfish", short: "Rainbowfish", variants: [
    { name: "Boesemani", look: "a split-color body, bright orange rear half and blue-green front half" },
    { name: "Neon Dwarf (Praecox)", look: "a silvery blue body with red-orange fins" },
    { name: "Red Irian (Incisus)", look: "a fully solid deep red body with shining scales" },
    { name: "Turquoise (Lake Kutubu)", look: "a turquoise blue-green body that shifts color in the light" },
  ]},
  { name: "Channa Show / Kontes", short: "Channa", variants: [
    { name: "Marulioides Yellow (Yellow Maru)", look: "a golden-yellow body with black marbled blotches and flower-like markings along its flank" },
    { name: "Marulioides Red (Red Maru)", look: "a red-orange body with dark marbled blotches and flower-like flank markings" },
    { name: "Aurantimaculata", look: "a blue-green head fading into bright orange-gold spotted flanks" },
    { name: "Asiatica Red Spots (RS)", look: "a dark body covered in bright red speckles" },
    { name: "Asiatica White Spots (WS)", look: "a dark body covered in clean white speckles" },
    { name: "Stewartii", look: "a bluish body with many small black dots and a bright eye-spot near the tail" },
    { name: "Pulchra", look: "a grey-blue body with orange accents and black spots" },
  ]},
  { name: "Oscar Show", short: "Oscar", variants: [
    { name: "Tiger Oscar", look: "a thick body with a tiger pattern of black and burnt-orange patches" },
    { name: "Albino Oscar", look: "a white body with bright orange patches and soft red eyes" },
    { name: "Lemon Oscar (Full Yellow)", look: "a fully solid lemon-yellow body" },
    { name: "Red Oscar", look: "a mostly solid red-orange body with darker shading" },
    { name: "Lutino Oscar", look: "a creamy white-yellow body with orange patches and dark eyes" },
  ]},
  { name: "Molly & Platy", short: "Molly", variants: [
    { name: "Black Molly (Full Black)", look: "a fully solid black molly with a flowing tail fin" },
    { name: "Gold Dust Molly", look: "a molly split between a golden front and a black rear half" },
    { name: "Balloon Molly Marble", look: "a round balloon-shaped body marbled in black and white" },
    { name: "Platy Sunset", look: "a small platy fading from yellow at the front to orange-red at the tail" },
    { name: "Platy Mickey Mouse", look: "a golden platy with a mickey-mouse-shaped spot at the base of its tail" },
    { name: "Swordtail Kohaku", look: "a white and red koi-patterned swordtail with a long sword tail extension" },
  ]},
  { name: "Tetra School", short: "Tetra School", group: true, variants: [
    { name: "Cardinal Tetra", look: "a small school of tetras with a neon blue stripe and a fully red lower body, moving as one shimmering group" },
    { name: "Neon Tetra", look: "a small school of tetras with a neon blue stripe and a red rear half, moving as one shimmering group" },
    { name: "Green Neon Tetra", look: "a small school of tiny tetras with a glowing green-blue stripe, moving as one shimmering group" },
    { name: "Ember Tetra", look: "a small school of tiny ember-orange tetras moving as one warm glowing group" },
    { name: "Rummy Nose Tetra", look: "a small school of tetras with bright red noses and black-and-white striped tails, moving as one group" },
  ]},
  { name: "Corydoras School", short: "Corydoras", group: true, variants: [
    { name: "Albino Corydoras", look: "a small school of pale white albino corydoras with soft pink eyes, gliding together along the bottom" },
    { name: "Sterbai Corydoras", look: "a small school of corydoras with dark spotted bodies and orange fin edges, gliding together along the bottom" },
    { name: "Panda Corydoras", look: "a small school of pale corydoras with black panda-like eye and tail patches, gliding together along the bottom" },
    { name: "Bronze Corydoras", look: "a small school of bronze-green metallic corydoras gliding together along the bottom" },
  ]},
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

function showDisplay(fish) { return fish.variant ? `${fish.name} ${fish.variant}` : fish.name; }

function buildShowPrompt(sel) {
  const fish = sel.fish, t = parseFloat(sel.peakTime);
  const solo = fish.group ? "one small school moving together as a single group, with no stray fish" : "a single fish alone in the tank, with no other fish";
  const body =
`Create an exactly 10-second vertical 9:16 fictional AI-generated aquarium show-fish video designed to look like a raw modern smartphone recording of a beautiful contest fish inside a clean home show aquarium. The fish is a ${showDisplay(fish)} with ${fish.look}, shown as ${solo}. The show tank has clear glass, a visible water line, ${sel.water}, ${sel.substrate}, ${sel.decor}, and ${sel.background}, with natural glass reflections and gentle filter bubbles, and it never changes layout or clarity. The camera uses ${sel.camera}, mostly fixed with subtle micro-shake, autofocus breathing, slight sensor noise and natural motion blur only on the fastest fin movement, under ${sel.lighting} that makes its true colors shine. First frame: the fish is ${sel.start}, full body and full fin shape clearly readable, like a contestant being presented to a judge. 0.00-2.00 seconds: the fish holds a beautiful opening pose with fins naturally spread, colors immediately readable. 2.00-4.00 seconds: it begins ${sel.movement}, moving ${sel.direction} with slow elegant body motion and fins flowing smoothly in the water. 4.00-6.00 seconds: it continues the display with a graceful turn, showing its fin shape and color pattern from a new side without any sudden movement. 6.00-8.00 seconds: at about ${t.toFixed(1)} seconds comes the peak display moment, its fins spread at their widest and its colors at their brightest as it holds the most elegant pose of the video. 8.00-10.00 seconds: it glides slowly into a final centered beauty pose, fins still flowing, and the video ends on that pose with a hard cut. Keep the species, color pattern, fin shape and body size constant for the whole video, with realistic fin flow, water resistance, turning and shadows and no clipping through glass or decor. Audio is only natural aquarium sound: ${sel.sound}, with no music, no narration and no voice-over.${customSentence(sel)} No feeding, no prey, no cinematic style, no camera cuts, no angle changes, no zoom, no slow motion, no subtitles, no text, no watermark, no extra fish, no duplicate fish, no deformed or torn fins, no changing colors or pattern, no changing aquarium, no dirty or cloudy water, no cartoon style, no glossy ad look and no obvious AI errors.`;
  const title = fish.group ? `This Tiny School Moves as One` : pick(SHOW_TITLES)(fish.short);
  const caption = `The ${fish.short.toLowerCase()} takes its time showing off every color and fin. Watch the peak display near the end.`;
  return { body, title, caption, chars: body.length };
}

function buildShowIdea(sel) {
  const fish = sel.fish;
  return {
    heading: `${showDisplay(fish)} — Elegant Show`,
    fish: `${showDisplay(fish)} — ${fish.look}.`,
    tank: `${sel.water.charAt(0).toUpperCase() + sel.water.slice(1)}, ${sel.substrate}, ${sel.decor}, ${sel.background}; lighting: ${sel.lighting}; camera: ${sel.camera}.`,
    action: `Fish opens ${sel.start}, then performs ${sel.movement} moving ${sel.direction}; peak fin-and-color display at about ${sel.peakTime} seconds, ending in a centered beauty pose.`,
    hook: "Slow royal movement plus one peak fin display makes viewers replay it just to watch the fins flow again.",
    custom: cleanCustom(sel.custom),
  };
}
function showIdeaToText(idea, n) {
  return `${n}. ${idea.heading}\nFish: ${idea.fish}\nTank: ${idea.tank}\n10-second elegant action: ${idea.action}\nViral hook: ${idea.hook}${idea.custom ? `\nSpecial request: ${idea.custom}` : ""}`;
}
function resolveShowFish(species, variant) {
  return { name: species.name, short: species.short, group: !!species.group, variant: variant.name, look: variant.look };
}
function buildShowBatch10(rng) {
  const speciesList = shuffle(SHOW_FISH, rng).slice(0, 10);
  return speciesList.map(species => buildShowIdea({
    fish: resolveShowFish(species, pick(species.variants, rng)),
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
  return `Create one single composite storyboard image with six equally sized panels, raw smartphone realism, the same ${showDisplay(fish)} (${fish.look}), the same show tank (${sel.substrate}, ${sel.decor}, ${sel.background}) and the same camera (${sel.camera}) in every panel, no cinematic borders, no cartoon style, no camera-angle change. Frame 1 - 0:00: fish ${sel.start}, full body and fins readable in an opening contest pose. Frame 2 - 0:02: fish begins ${sel.movement}, moving ${sel.direction}. Frame 3 - 0:04: graceful turn showing fin shape and colors from a new side. Frame 4 - 0:06: peak display moment, fins spread at their widest, colors at their brightest. Frame 5 - 0:08: fish gliding slowly out of the display, fins still flowing. Frame 6 - 0:10: final centered beauty pose, fins spread, hard end frame. Add only a small clear timestamp in the corner of each panel and no other text.${customSentence(sel)}`;
}

/* ================= KATEGORI 3: UMUM / GENERAL =================
   Added 2026-10-15 (evening) at Dwi's request: the app is for MANY video
   niches and many users. Each special category carries its own master
   prompt; this General category is the catch-all master framework for ANY
   idea the user types (example: a firework that explodes into a phoenix).
   Locked for every idea: realistic physics, one continuous manual human
   recording on a chosen device (iPhone / Android / camera / etc.), natural
   imperfections of a real recording, natural audio, negative lock. */

const GEN_DEVICES = [
  { name: "iPhone (modern)", desc: "recorded on a modern iPhone held in one hand, with sharp detail, natural color science, slight handheld micro-shake, autofocus hunting in low light and natural exposure blooming on bright flashes" },
  { name: "HP Android flagship (Samsung / Pixel)", desc: "recorded on a flagship Android phone, with vivid yet natural colors, slight handheld micro-shake, quick autofocus locks and natural exposure adjustments" },
  { name: "HP Android biasa (kelas menengah)", desc: "recorded on an ordinary mid-range Android phone, with mild sensor noise in dark areas, slightly softer detail, small autofocus delays and natural compression softness" },
  { name: "Kamera mirrorless / DSLR", desc: "recorded on a mirrorless camera with a standard kit lens, with clean low-noise detail, gentle natural background softness, smooth manual focus behavior and steady two-hand holding" },
  { name: "Action camera (GoPro)", desc: "recorded on a wide-angle action camera, with a wide field of view, slight edge distortion, very stable motion and bright punchy colors" },
  { name: "Handycam / HP jadul (nuansa nostalgia)", desc: "recorded on an old handycam-style device, with softer focus, mild grain, slightly washed colors and charming imperfect exposure" },
];

const GEN_OPTIONS = {
  location: ["an open festival area with a city skyline in the background", "a beach shoreline with the sea in the background", "an open field in a small town", "the backyard of a house in a quiet neighborhood", "a lakeside with calm water reflections", "a mountain viewpoint overlooking a valley", "a large stadium / event venue", "a rooftop overlooking the city"],
  timeOfDay: ["at midnight", "at night", "during golden-hour sunset", "in bright daylight", "in the early morning", "during the late-evening blue hour"],
  weather: ["a clear sky with no clouds", "a few thin clouds in the sky", "thin mist in the air", "wet ground with reflections after rain", "a slightly hazy sky"],
  cameraStyle: ["handheld by a real person with natural micro-shake and small reframing adjustments", "on a tripod, steady, with tiny manual pans only", "in first-person POV, as if the viewer is the one holding the device", "static from a distance, with one slow manual pan to follow the action"],
  duration: ["5", "8", "10", "15"],
  ratio: ["9:16 vertical", "16:9 horizontal", "1:1 square", "4:5 vertical"],
  crowd: ["no people visible, only the scene itself", "a few spectators visible from behind at the bottom edge of the frame", "a lively festival crowd visible from behind", "nobody else visible; only the person filming is implied off-camera"],
  peak: ["50", "60", "70"],
  audio: ["natural location ambience and the real sounds of the event, including soft distant crowd reactions", "natural location ambience only, calm and realistic", "cheerful crowd cheers and gasps at the peak moment", "very quiet natural ambience with subtle wind"],
};

function genFmt(n) { return n.toFixed(2); }
function genSegments(duration) {
  const d = parseFloat(duration);
  const b = [0, 0.2 * d, 0.45 * d, 0.7 * d, d];
  return b.slice(0, 4).map((s, i) => `${genFmt(s)}-${genFmt(b[i + 1])} seconds`);
}
function genOrientation(ratio) {
  if (ratio.startsWith("16:9")) return "horizontal";
  if (ratio.startsWith("1:1")) return "square";
  return "vertical";
}

function buildGeneralPrompt(sel) {
  const d = parseFloat(sel.duration), segs = genSegments(sel.duration);
  const peakSec = (d * parseFloat(sel.peak) / 100).toFixed(1);
  const idea = (sel.idea || "").trim() || "a striking real-life style moment";
  const subject = (sel.subject || "").trim() || "the main subject of the idea";
  const action = (sel.action || "").trim() || idea;
  const finalForm = (sel.fin || "").trim() || "the main event reaches its clearest, most readable and most satisfying result";
  const body =
`Create an exactly ${d}-second ${genOrientation(sel.ratio)} ${sel.ratio.split(" ")[0]} fictional AI-generated video designed to look like a completely real video ${sel.device.desc}. The scene takes place at ${sel.location} ${sel.timeOfDay}, with ${sel.weather}. The video idea is: ${idea}. Main subject: ${subject}. The camera is ${sel.cameraStyle}. In the first frame the location, the subject and the situation are immediately clear, framed the way a real person would frame it, with ${sel.crowd}. ${segs[0]}: the setup is established, the subject is in position, and anticipation builds naturally. ${segs[1]}: the core event begins — ${action} — with realistic speed, weight and physics, while the camera reacts with tiny natural adjustments. ${segs[2]}: the event develops and builds toward the peak moment at about ${peakSec} seconds; the key visual change grows more and more readable and the framing follows it naturally. ${segs[3]}: the peak result — ${finalForm} — is fully formed and held clearly readable long enough for any viewer to recognize it, followed by a natural ending as the moment settles, with a hard cut. Throughout, keep the subject's identity, size, colors and shape constant except for the one described event, and obey real-world physics: gravity, momentum, smoke and particle drift, light spill and correct shadows. Keep the honest imperfections of a real manual recording: micro-shake, focus breathing, auto-exposure reacting to bright moments, realistic sensor behavior, and no over-polished CGI look. Audio is only natural sound recorded by the device microphone: ${sel.audio}, with no added music, no narration and no voice-over.${customSentence(sel)} No cartoon look, no animation look, no video-game CGI look, no studio lighting, no camera cuts, no camera-angle changes, no impossible physics, no morphing except the one described event, no duplicated subjects, no changing location, no subtitles, no text overlays, no watermark, no glossy commercial look and no obvious AI-generated artifacts.`;
  const titles = ["You Have to Watch Until the End", "Wait for the Peak Moment", "Caught at Exactly the Right Second", "The Ending Nobody Expected"];
  const title = sel.fin ? "Wait Until You See What It Becomes" : pick(titles);
  const caption = "It looks like a real moment someone caught by hand. Watch what happens at the peak.";
  return { body, title, caption, chars: body.length, peakSec };
}

function buildGeneralIdea(sel) {
  const d = parseFloat(sel.duration);
  return {
    heading: (sel.idea || "Video concept").trim().slice(0, 80),
    concept: (sel.idea || "").trim(),
    subject: (sel.subject || "").trim() || "-",
    action: (sel.action || "").trim() || "-",
    fin: (sel.fin || "").trim() || "-",
    setting: `${sel.location} ${sel.timeOfDay}, ${sel.weather}; crowd: ${sel.crowd}`,
    device: `${sel.device.name} — ${sel.cameraStyle}`,
    timeline: `${d} seconds, ratio ${sel.ratio}; setup, event begins, develops, peak at about ${(d * parseFloat(sel.peak) / 100).toFixed(1)}s, natural ending.`,
    hook: "It feels like a genuine moment caught by a real person, and the peak result is clear enough to make viewers replay it.",
    custom: cleanCustom(sel.custom),
  };
}
function generalIdeaToText(idea, n) {
  return `${n}. ${idea.heading}\nConcept: ${idea.concept}\nSubject: ${idea.subject}\nCore event: ${idea.action}\nPeak result: ${idea.fin}\nSetting: ${idea.setting}\nRecording style: ${idea.device}\nTimeline: ${idea.timeline}\nViral hook: ${idea.hook}${idea.custom ? `\nSpecial request: ${idea.custom}` : ""}`;
}
function buildGeneralBatch(baseSel, rng) {
  const combos = [];
  const seen = new Set();
  let guard = 0;
  while (combos.length < 10 && guard++ < 300) {
    const sel = { ...baseSel,
      location: pick(GEN_OPTIONS.location, rng), timeOfDay: pick(GEN_OPTIONS.timeOfDay, rng),
      weather: pick(GEN_OPTIONS.weather, rng), crowd: pick(GEN_OPTIONS.crowd, rng),
      device: pick(GEN_DEVICES, rng), cameraStyle: pick(GEN_OPTIONS.cameraStyle, rng) };
    const key = [sel.location, sel.timeOfDay, sel.device.name, sel.crowd].join("|");
    if (seen.has(key)) continue;
    seen.add(key); combos.push(buildGeneralIdea(sel));
  }
  return combos;
}
function buildGeneralStoryboard(sel) {
  const r = buildGeneralPrompt(sel);
  return `Create one single composite storyboard image with six equally sized panels, photorealistic manual-recording realism matching a video that is ${sel.device.desc}, the same subject (${(sel.subject || sel.idea || "").trim()}), the same location (${sel.location} ${sel.timeOfDay}) and the same framing in every panel, no cinematic borders, no cartoon style. Frame 1 - 0:00: the location and subject are established, anticipation in the air. Frame 2 - 0:02: the core event begins — ${(sel.action || sel.idea || "").trim()}. Frame 3 - 0:04: the event develops, the key visual change grows more readable. Frame 4 - 0:06: the change is almost at its peak, tension at its highest. Frame 5 - 0:08: peak moment — ${(sel.fin || "the main event at its clearest result").trim()} — fully formed and clearly readable. Frame 6 - 0:10: the moment settles into its natural ending, subject still recognizable. Add only a small clear timestamp in the corner of each panel and no other text.${customSentence(sel)}`;
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
    fillSelect("genDevice", GEN_DEVICES, d => d.name);
    [["genLocation", "location"], ["genTime", "timeOfDay"], ["genWeather", "weather"], ["genCamera", "cameraStyle"], ["genDuration", "duration"], ["genRatio", "ratio"], ["genCrowd", "crowd"], ["genPeak", "peak"], ["genAudio", "audio"]].forEach(([id, key]) => fillOpt(id, GEN_OPTIONS[key]));
    ["substrate", "decor", "background", "water", "camera", "start", "direction", "movement", "peakTime", "lighting", "sound"].forEach(k => fillOpt("show" + k.charAt(0).toUpperCase() + k.slice(1), SHOW_OPTIONS[k]));
    const getSel = () => ({
      fish: FISH[+$("fish").value], prey: PREY[+$("prey").value],
      substrate: OPTIONS.substrate[+$("substrate").value], decor: OPTIONS.decor[+$("decor").value],
      background: OPTIONS.background[+$("background").value], water: OPTIONS.water[+$("water").value],
      camera: OPTIONS.camera[+$("camera").value], fishStart: OPTIONS.fishStart[+$("fishStart").value],
      preyStart: OPTIONS.preyStart[+$("preyStart").value], strikeDirection: OPTIONS.strikeDirection[+$("strikeDirection").value],
      strikeTime: OPTIONS.strikeTime[+$("strikeTime").value], lighting: OPTIONS.lighting[+$("lighting").value],
      sound: OPTIONS.sound[+$("sound").value], outcome: $("outcome").value,
      custom: $("customRequest").value,
    });
    window.refreshVariants = function () {
      const species = SHOW_FISH[+$("showFish").value] || SHOW_FISH[0];
      const el = $("showVariant"); el.innerHTML = "";
      species.variants.forEach((v, i) => { const o = document.createElement("option"); o.value = i; o.textContent = v.name; el.appendChild(o); });
    };
    $("showFish").addEventListener("change", () => refreshVariants());
    const getShowSel = () => {
      const species = SHOW_FISH[+$("showFish").value] || SHOW_FISH[0];
      const variant = species.variants[+$("showVariant").value] || species.variants[0];
      return {
      fish: resolveShowFish(species, variant),
      substrate: SHOW_OPTIONS.substrate[+$("showSubstrate").value], decor: SHOW_OPTIONS.decor[+$("showDecor").value],
      background: SHOW_OPTIONS.background[+$("showBackground").value], water: SHOW_OPTIONS.water[+$("showWater").value],
      camera: SHOW_OPTIONS.camera[+$("showCamera").value], start: SHOW_OPTIONS.start[+$("showStart").value],
      direction: SHOW_OPTIONS.direction[+$("showDirection").value], movement: SHOW_OPTIONS.movement[+$("showMovement").value],
      peakTime: SHOW_OPTIONS.peakTime[+$("showPeakTime").value], lighting: SHOW_OPTIONS.lighting[+$("showLighting").value],
      sound: SHOW_OPTIONS.sound[+$("showSound").value],
      custom: $("customRequest").value,
      };
    };
    const getGenSel = () => ({
      idea: $("genIdea").value, subject: $("genSubject").value, action: $("genAction").value, fin: $("genFinal").value,
      device: GEN_DEVICES[+$("genDevice").value] || GEN_DEVICES[0],
      location: GEN_OPTIONS.location[+$("genLocation").value], timeOfDay: GEN_OPTIONS.timeOfDay[+$("genTime").value],
      weather: GEN_OPTIONS.weather[+$("genWeather").value], cameraStyle: GEN_OPTIONS.cameraStyle[+$("genCamera").value],
      duration: GEN_OPTIONS.duration[+$("genDuration").value], ratio: GEN_OPTIONS.ratio[+$("genRatio").value],
      crowd: GEN_OPTIONS.crowd[+$("genCrowd").value], peak: GEN_OPTIONS.peak[+$("genPeak").value],
      audio: GEN_OPTIONS.audio[+$("genAudio").value], custom: $("customRequest").value,
    });
    function applyGenPreset() {
      $("genIdea").value = "A single large firework is launched from the ground into the night sky and explodes into the shape of a giant phoenix";
      $("genSubject").value = "one large professional firework shell";
      $("genAction").value = "the firework shoots upward leaving a trail of golden sparks, then bursts at the top of the sky";
      $("genFinal").value = "a giant phoenix silhouette with wide-spread wings, a long flowing tail and a raised head, formed by thousands of gold and orange sparks, clearly readable for several seconds before slowly fading";
      $("genDevice").value = 0; $("genLocation").value = 0; $("genTime").value = 1; $("genWeather").value = 0;
      $("genCamera").value = 0; $("genDuration").value = 2; $("genRatio").value = 0; $("genCrowd").value = 2;
      $("genPeak").value = 1; $("genAudio").value = 0;
    }
    $("genPreset").addEventListener("click", () => { applyGenPreset(); $("btnPrompt").click(); });
    const category = () => document.querySelector("input[name=category]:checked").value;
    function applyCategory() {
      const cat = category();
      $("predatorFields").style.display = cat === "predator" ? "" : "none";
      $("showFields").style.display = cat === "show" ? "" : "none";
      $("generalFields").style.display = cat === "general" ? "" : "none";
      $("predatorNote").style.display = cat === "predator" ? "" : "none";
      $("showNote").style.display = cat === "show" ? "" : "none";
      $("generalNote").style.display = cat === "general" ? "" : "none";
    }
    document.querySelectorAll("input[name=category]").forEach(r => r.addEventListener("change", () => { applyCategory(); $("btnPrompt").click(); }));
    function show(id, text) { $(id).textContent = text; }
    function randomize() {
      const set = (id, n) => { $(id).value = Math.floor(Math.random() * n); };
      if (category() === "general") {
        set("genDevice", GEN_DEVICES.length);
        [["genLocation", "location"], ["genTime", "timeOfDay"], ["genWeather", "weather"], ["genCamera", "cameraStyle"], ["genDuration", "duration"], ["genRatio", "ratio"], ["genCrowd", "crowd"], ["genPeak", "peak"], ["genAudio", "audio"]].forEach(([id, key]) => set(id, GEN_OPTIONS[key].length));
      } else if (category() === "show") {
        set("showFish", SHOW_FISH.length);
        refreshVariants();
        set("showVariant", (SHOW_FISH[+$("showFish").value] || SHOW_FISH[0]).variants.length);
        ["showSubstrate", "showDecor", "showBackground", "showWater", "showCamera", "showStart", "showDirection", "showMovement", "showPeakTime", "showLighting", "showSound"].forEach((id, i) => set(id, Object.values(SHOW_OPTIONS)[i].length));
      } else {
        set("fish", FISH.length); set("prey", PREY.filter(p => p.name !== "small mouse").length);
        ["substrate", "decor", "background", "water", "camera", "fishStart", "preyStart", "strikeDirection", "strikeTime", "lighting", "sound"].forEach(k => set(k, OPTIONS[k].length));
      }
    }
    /* ---------- AI Fresh mode (BYOK) ---------- */
    const AI = (typeof window !== "undefined" && window.AIFresh) ? window.AIFresh : null;
    const aiEnabled = () => { const el = document.querySelector("input[name=aimode]:checked"); return !!el && el.value === "ai"; };
    const aiCfg = () => ({ provider: $("aiProvider").value, apiKey: $("aiKey").value.trim(), model: $("aiModel").value.trim(), baseUrl: $("aiBaseUrl").value.trim() });
    function aiSave() { try { localStorage.setItem("aqg_ai", JSON.stringify(aiCfg())); } catch (e) { /* storage unavailable */ } }
    function aiLoad() {
      try {
        const saved = JSON.parse(localStorage.getItem("aqg_ai") || "null");
        if (saved) { $("aiProvider").value = saved.provider || "openai"; $("aiKey").value = saved.apiKey || ""; $("aiModel").value = saved.model || ""; $("aiBaseUrl").value = saved.baseUrl || ""; }
      } catch (e) { /* ignore */ }
    }
    function aiProviderUI() {
      if (!AI) return;
      const p = AI.AI_PROVIDERS[$("aiProvider").value] || AI.AI_PROVIDERS.openai;
      const list = $("aiModelList"); list.innerHTML = "";
      p.models.forEach(m => { const o = document.createElement("option"); o.value = m; list.appendChild(o); });
      if (!p.models.includes($("aiModel").value.trim())) $("aiModel").value = p.models[0];
      $("aiKey").placeholder = p.keyHint || "API key";
      $("aiBaseWrap").style.display = $("aiProvider").value === "custom" ? "" : "none";
      aiSave();
    }
    function applyAiMode() { $("aiSettings").style.display = aiEnabled() ? "" : "none"; }
    document.querySelectorAll("input[name=aimode]").forEach(r => r.addEventListener("change", applyAiMode));
    $("aiProvider").addEventListener("change", aiProviderUI);
    ["aiKey", "aiModel", "aiBaseUrl"].forEach(id => $(id).addEventListener("change", aiSave));
    function setBusy(busy) { ["btnPrompt", "btnIdea", "btnBatch", "btnStoryboard", "btnRandom", "genPreset"].forEach(id => { const el = $(id); if (el) el.disabled = busy; }); }
    async function runAI(kind, cat, specText, applyTemplate, applyAI) {
      if (!aiEnabled()) { applyTemplate(); return; }
      if (!AI) { show("aiStatus", "File ai.js tidak termuat — menampilkan hasil template."); applyTemplate(); return; }
      const cfg = aiCfg();
      if (!cfg.apiKey) { show("aiStatus", "⚠️ API key belum diisi — menampilkan hasil template dulu. Isi API key di panel Mode AI Fresh, lalu klik Generate lagi."); applyTemplate(); return; }
      setBusy(true); show("aiStatus", "🤖 AI sedang menulis ulang… tunggu sebentar.");
      try {
        const result = await AI.aiGenerate(cfg, kind, cat, specText);
        applyAI(result);
        show("aiStatus", result.problems && result.problems.length
          ? "⚠️ Selesai, tapi hasil AI perlu dicek: " + result.problems.join("; ") + ". Klik Generate lagi untuk versi lain, atau pakai mode Template."
          : "✅ Selesai ditulis ulang AI (" + cfg.provider + " • " + (cfg.model || "model default") + "). Klik Generate lagi untuk versi fresh lain.");
      } catch (err) {
        show("aiStatus", "⚠️ AI gagal: " + (err && err.message ? err.message : err) + " — menampilkan hasil template.");
        applyTemplate();
      } finally { setBusy(false); }
    }
    /* ---------- Generate buttons ---------- */
    $("btnRandom").onclick = () => { randomize(); $("btnPrompt").click(); };
    $("btnPrompt").onclick = async () => {
      const cat = category();
      if (cat === "general") {
        const r = buildGeneralPrompt(getGenSel());
        const applyTemplate = () => { show("outPrompt", `${r.body}\n\nTitle: ${r.title}\nCaption: ${r.caption}`); show("promptMeta", `${r.chars} karakter - Kategori: Umum / General (ide bebas, gaya rekaman manual realistis)`); };
        await runAI("prompt", cat, r.body, applyTemplate, res => {
          show("outPrompt", `${res.text}${res.title ? `\n\nTitle: ${res.title}` : ""}${res.caption ? `\nCaption: ${res.caption}` : ""}`);
          show("promptMeta", `${res.text.length} karakter - Ditulis ulang AI Fresh - Kategori: Umum / General`);
        });
      } else if (cat === "show") {
        const r = buildShowPrompt(getShowSel());
        const applyTemplate = () => { show("outPrompt", `${r.body}\n\nTitle: ${r.title}\nCaption: ${r.caption}`); show("promptMeta", `${r.chars} karakter - Kategori: Kontes / Show (tanpa feeding, puncak display sirip & warna)`); };
        await runAI("prompt", cat, r.body, applyTemplate, res => {
          show("outPrompt", `${res.text}${res.title ? `\n\nTitle: ${res.title}` : ""}${res.caption ? `\nCaption: ${res.caption}` : ""}`);
          show("promptMeta", `${res.text.length} karakter - Ditulis ulang AI Fresh - Kategori: Kontes / Show`);
        });
      } else {
        const r = buildPrompt(getSel());
        const applyTemplate = () => { show("outPrompt", `${r.body}\n\nTitle: ${r.title}\nCaption: ${r.caption}`); show("promptMeta", `${r.chars} karakter (target master prompt: 1.800-2.600) - Outcome: ${r.outcome === "whole" ? "telan utuh" : "potong sebagian"}`); };
        await runAI("prompt", cat, r.body, applyTemplate, res => {
          show("outPrompt", `${res.text}${res.title ? `\n\nTitle: ${res.title}` : ""}${res.caption ? `\nCaption: ${res.caption}` : ""}`);
          show("promptMeta", `${res.text.length} karakter - Ditulis ulang AI Fresh`);
        });
      }
      activateTab("tabPrompt");
    };
    $("btnIdea").onclick = async () => {
      const cat = category();
      const text = cat === "general" ? generalIdeaToText(buildGeneralIdea(getGenSel()), 1)
        : cat === "show" ? showIdeaToText(buildShowIdea(getShowSel()), 1) : ideaToText(buildIdea(getSel()), 1);
      await runAI("idea", cat, text, () => show("outIdea", text), res => show("outIdea", res.text));
      activateTab("tabIdea");
    };
    $("btnBatch").onclick = async () => {
      const cat = category();
      const custom = cleanCustom($("customRequest").value);
      const note = custom ? `\n\nCatatan request khusus (berlaku untuk semua ide di atas): ${custom}` : "";
      const text = cat === "general"
        ? "Here are 10 variations of your video concept (same idea, different recording setups):\n\n" + buildGeneralBatch(getGenSel()).map((idea, i) => generalIdeaToText(idea, i + 1)).join("\n\n") + note
        : cat === "show"
        ? "Here are 10 fresh aquarium show-fish video ideas:\n\n" + buildShowBatch10().map((idea, i) => showIdeaToText(idea, i + 1)).join("\n\n") + note
        : "Here are 10 fresh aquarium predator-fish feeding video ideas:\n\n" + buildBatch10().map((idea, i) => ideaToText(idea, i + 1)).join("\n\n") + note;
      await runAI("batch", cat, text, () => show("outBatch", text), res => show("outBatch", res.text));
      activateTab("tabBatch");
    };
    $("btnStoryboard").onclick = async () => {
      const cat = category();
      const text = cat === "general" ? buildGeneralStoryboard(getGenSel())
        : cat === "show" ? buildShowStoryboard(getShowSel()) : buildStoryboard(getSel());
      await runAI("storyboard", cat, text, () => show("outStoryboard", text), res => show("outStoryboard", res.text));
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
    aiLoad(); aiProviderUI(); applyAiMode(); applyCategory(); refreshVariants(); randomize(); $("btnPrompt").click();
  });
}
if (typeof module !== "undefined") { module.exports = { FISH, PREY, OPTIONS, buildPrompt, buildIdea, buildBatch10, buildStoryboard, resolveOutcome, SHOW_FISH, SHOW_OPTIONS, buildShowPrompt, buildShowIdea, buildShowBatch10, buildShowStoryboard, cleanCustom, customSentence, resolveShowFish, showDisplay, GEN_DEVICES, GEN_OPTIONS, buildGeneralPrompt, buildGeneralIdea, generalIdeaToText, buildGeneralBatch, buildGeneralStoryboard, genSegments }; }
