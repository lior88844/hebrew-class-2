// ─── Family Tree Puzzle — Layout & Clue Data ─────────────────────────────────
//
//  14 people arranged in 3 generations:
//
//          [דָּוִד]──[רָחֵל]
//               |
//    ┌──────────┼──────────┐
// [יָעֵל]+[דַּנִי]  [מִיכַל]+[אֵיתָן]  [אוּרִי]+[נוֹעָה]
//   ├── תָּמָר       ├── רוֹנִי        ├── מַאיָה
//   └── עוֹמֶר       └── גַּיא         └── אֵיתָמָר

export interface PuzzleSlot {
  id: string;
  correctPersonId: string;
  x: number;   // center x in canvas (px)
  y: number;   // center y in canvas (px)
}

export interface SvgLine {
  x1: number; y1: number;
  x2: number; y2: number;
}

export interface PuzzleClue {
  id: string;
  textHebrew: string;
  textEnglish: string;
  hintLevel: 0 | 1 | 2;  // 0 = shown initially, 1 = first reveal, 2 = second reveal
}

// ── Canvas dimensions ─────────────────────────────────────────────────────────
export const SLOT_W = 90;
export const SLOT_H = 76;
export const CANVAS_W = 900;
export const CANVAS_H = 490;
export const HALF_W = SLOT_W / 2;  // 45
export const HALF_H = SLOT_H / 2;  // 38

// ── Slot positions (center x, center y) ──────────────────────────────────────
export const puzzleSlots: PuzzleSlot[] = [
  // Generation 1
  { id: 's_david',   correctPersonId: 'david_sr',  x: 390, y: 55  },
  { id: 's_rachel',  correctPersonId: 'rachel_sr', x: 510, y: 55  },
  // Generation 2 — couple A (Yael + Dani)
  { id: 's_yael',    correctPersonId: 'yael',      x: 70,  y: 205 },
  { id: 's_dani',    correctPersonId: 'dani',      x: 175, y: 205 },
  // Generation 2 — couple B (Michal + Eitan)
  { id: 's_michal',  correctPersonId: 'michal',    x: 355, y: 205 },
  { id: 's_eitan',   correctPersonId: 'eitan',     x: 460, y: 205 },
  // Generation 2 — couple C (Uri + Noa)
  { id: 's_uri',     correctPersonId: 'uri',       x: 645, y: 205 },
  { id: 's_noa',     correctPersonId: 'noa',       x: 750, y: 205 },
  // Generation 3 — branch A
  { id: 's_tamar',   correctPersonId: 'tamar',     x: 55,  y: 390 },
  { id: 's_omer',    correctPersonId: 'omer',      x: 190, y: 390 },
  // Generation 3 — branch B
  { id: 's_roni',    correctPersonId: 'roni',      x: 340, y: 390 },
  { id: 's_gai',     correctPersonId: 'gai',       x: 465, y: 390 },
  // Generation 3 — branch C
  { id: 's_maya',    correctPersonId: 'maya',      x: 630, y: 390 },
  { id: 's_eitamar', correctPersonId: 'eitamar',   x: 755, y: 390 },
];

// ── SVG connection lines ──────────────────────────────────────────────────────
// Couple midpoints (x axis)
const midA = Math.round((70  + 175) / 2);  // 122
const midB = Math.round((355 + 460) / 2);  // 407
const midC = Math.round((645 + 750) / 2);  // 697

export const svgLines: { coupleLines: SvgLine[]; parentLines: SvgLine[] } = {
  coupleLines: [
    // Gen 1
    { x1: 390 + HALF_W, y1: 55,  x2: 510 - HALF_W, y2: 55  },
    // Gen 2
    { x1: 70  + HALF_W, y1: 205, x2: 175 - HALF_W, y2: 205 },
    { x1: 355 + HALF_W, y1: 205, x2: 460 - HALF_W, y2: 205 },
    { x1: 645 + HALF_W, y1: 205, x2: 750 - HALF_W, y2: 205 },
  ],
  parentLines: [
    // Gen 1 → Gen 2: vertical drop then horizontal then drops to each couple
    { x1: 450,   y1: 55  + HALF_H, x2: 450,   y2: 133 },
    { x1: midA,  y1: 133,           x2: midC,   y2: 133 },
    { x1: midA,  y1: 133,           x2: midA,   y2: 205 - HALF_H },
    { x1: midB,  y1: 133,           x2: midB,   y2: 205 - HALF_H },
    { x1: midC,  y1: 133,           x2: midC,   y2: 205 - HALF_H },
    // Gen 2A → Gen 3 (Yael+Dani branch)
    { x1: midA,  y1: 205 + HALF_H,  x2: midA,   y2: 328 },
    { x1: 55,    y1: 328,            x2: 190,    y2: 328 },
    { x1: 55,    y1: 328,            x2: 55,     y2: 390 - HALF_H },
    { x1: 190,   y1: 328,            x2: 190,    y2: 390 - HALF_H },
    // Gen 2B → Gen 3 (Michal+Eitan branch)
    { x1: midB,  y1: 205 + HALF_H,  x2: midB,   y2: 328 },
    { x1: 340,   y1: 328,            x2: 465,    y2: 328 },
    { x1: 340,   y1: 328,            x2: 340,    y2: 390 - HALF_H },
    { x1: 465,   y1: 328,            x2: 465,    y2: 390 - HALF_H },
    // Gen 2C → Gen 3 (Uri+Noa branch)
    { x1: midC,  y1: 205 + HALF_H,  x2: midC,   y2: 328 },
    { x1: 630,   y1: 328,            x2: 755,    y2: 328 },
    { x1: 630,   y1: 328,            x2: 630,    y2: 390 - HALF_H },
    { x1: 755,   y1: 328,            x2: 755,    y2: 390 - HALF_H },
  ],
};

// ── Clue bank ─────────────────────────────────────────────────────────────────
// hintLevel 0 = shown from start (6 clues — taken from the user's examples + essentials)
// hintLevel 1 = revealed on first "Show Hints" (+4)
// hintLevel 2 = revealed on second "More Hints" (+4)
export const puzzleClues: PuzzleClue[] = [
  { id: 'c1',  hintLevel: 0, textHebrew: 'יָעֵל הִיא הַבַּת שֶׁל רָחֵל.',        textEnglish: "Yael is Rachel's daughter."     },
  { id: 'c2',  hintLevel: 0, textHebrew: 'דַּנִי הוּא בַּעְלָהּ שֶׁל יָעֵל.',     textEnglish: "Dani is Yael's husband."        },
  { id: 'c3',  hintLevel: 0, textHebrew: 'תָּמָר הִיא הַבַּת שֶׁל יָעֵל.',        textEnglish: "Tamar is Yael's daughter."      },
  { id: 'c4',  hintLevel: 0, textHebrew: 'מִיכַל הִיא אָחוֹת שֶׁל יָעֵל.',       textEnglish: "Michal is Yael's sister."       },
  { id: 'c5',  hintLevel: 0, textHebrew: 'אוּרִי הוּא הָאָח שֶׁל מִיכַל.',       textEnglish: "Uri is Michal's brother."       },
  { id: 'c6',  hintLevel: 0, textHebrew: 'דָּוִד הוּא הַסַּבָּא שֶׁל תָּמָר.',    textEnglish: "David is Tamar's grandpa."      },
  { id: 'c7',  hintLevel: 1, textHebrew: 'אֵיתָן הוּא בַּעְלָהּ שֶׁל מִיכַל.',   textEnglish: "Eitan is Michal's husband."     },
  { id: 'c8',  hintLevel: 1, textHebrew: 'עוֹמֶר הוּא הָאָח שֶׁל תָּמָר.',       textEnglish: "Omer is Tamar's brother."       },
  { id: 'c9',  hintLevel: 1, textHebrew: 'רוֹנִי הִיא הַבַּת שֶׁל מִיכַל.',      textEnglish: "Roni is Michal's daughter."     },
  { id: 'c10', hintLevel: 1, textHebrew: 'נוֹעָה הִיא אִשְׁתּוֹ שֶׁל אוּרִי.',   textEnglish: "Noa is Uri's wife."             },
  { id: 'c11', hintLevel: 2, textHebrew: 'גַּיא הוּא הַבֵּן שֶׁל אֵיתָן.',       textEnglish: "Gai is Eitan's son."            },
  { id: 'c12', hintLevel: 2, textHebrew: 'מַאיָה הִיא הַבַּת שֶׁל אוּרִי.',      textEnglish: "Maya is Uri's daughter."        },
  { id: 'c13', hintLevel: 2, textHebrew: 'אֵיתָמָר הוּא הַבֵּן שֶׁל נוֹעָה.',   textEnglish: "Eitamar is Noa's son."          },
  { id: 'c14', hintLevel: 2, textHebrew: 'רָחֵל הִיא אִשְׁתּוֹ שֶׁל דָּוִד.',   textEnglish: "Rachel is David's wife."        },
];
