// ─── Types ────────────────────────────────────────────────────────────────────

export type PersonSubtype =
  | 'grandparent'
  | 'child'          // direct child of grandparents
  | 'spouse'         // married into main family
  | 'grandchild'
  | 'extended';      // sibling/relative of a spouse

export interface DeductionPerson {
  id: string;
  name: string;          // plain Hebrew
  nameNikud: string;     // with nikud
  gender: 'masculine' | 'feminine';
  emoji: string;
  subtype: PersonSubtype;
  relationLabel?: string; // shown under extended-family nodes
  x: number;             // center x in 900px canvas
  y: number;             // center y in 555px canvas
}

export interface DeductionClue {
  id: string;
  clue: string;          // Hebrew chain clue with nikud
  hint: string;          // simpler hint with nikud
  answerId: string;
  pathNikud: string;     // step-by-step path revealed after correct answer
}

// ─── Family tree ──────────────────────────────────────────────────────────────
//
//  Generation 1:  סַבָּא דָּוִד  ── סַבְתָּא רָחֵל
//                       │
//          ┌────────────┼────────────┐
//    יָעֵל + דַּנִי     מִיכַל + אֵיתָן    אוּרִי + נוֹעָה
//      │                 │                 │
//   תָּמָר עוֹמֶר       רוֹנִי גַּיא        מַאיָה אֵיתָמָר
//
//  Extended relatives (siblings of spouses):
//    שִׁירָה — sister of דַּנִי
//    לִיאוֹר — brother of אֵיתָן
//    עָמִית  — brother of נוֹעָה

// Canvas size: 900 × 555 px
// Node size:   72 × 74 px  (half: 36 × 37)

export const deductionFamily: DeductionPerson[] = [
  // ── Generation 1 ────────────────────────────────────────
  {
    id: 'david_sr', name: 'סבא דוד', nameNikud: 'סַבָּא דָּוִד',
    gender: 'masculine', emoji: '👴', subtype: 'grandparent',
    x: 395, y: 58,
  },
  {
    id: 'rachel_sr', name: 'סבתא רחל', nameNikud: 'סַבְתָּא רָחֵל',
    gender: 'feminine', emoji: '👵', subtype: 'grandparent',
    x: 510, y: 58,
  },

  // ── Generation 2 — David & Rachel's children ────────────
  {
    id: 'yael', name: 'יעל', nameNikud: 'יָעֵל',
    gender: 'feminine', emoji: '👩', subtype: 'child',
    x: 82, y: 198,
  },
  {
    id: 'michal', name: 'מיכל', nameNikud: 'מִיכַל',
    gender: 'feminine', emoji: '👩‍🦰', subtype: 'child',
    x: 348, y: 198,
  },
  {
    id: 'uri', name: 'אורי', nameNikud: 'אוּרִי',
    gender: 'masculine', emoji: '👨', subtype: 'child',
    x: 656, y: 198,
  },

  // ── Generation 2 — spouses ──────────────────────────────
  {
    id: 'dani', name: 'דני', nameNikud: 'דַּנִי',
    gender: 'masculine', emoji: '👨‍🦱', subtype: 'spouse',
    x: 188, y: 198,
  },
  {
    id: 'eitan', name: 'איתן', nameNikud: 'אֵיתָן',
    gender: 'masculine', emoji: '👨‍🦳', subtype: 'spouse',
    x: 452, y: 198,
  },
  {
    id: 'noa', name: 'נועה', nameNikud: 'נוֹעָה',
    gender: 'feminine', emoji: '👩‍🦱', subtype: 'spouse',
    x: 760, y: 198,
  },

  // ── Generation 3 — grandchildren ────────────────────────
  {
    id: 'tamar', name: 'תמר', nameNikud: 'תָּמָר',
    gender: 'feminine', emoji: '👧', subtype: 'grandchild',
    x: 62, y: 372,
  },
  {
    id: 'omer', name: 'עומר', nameNikud: 'עוֹמֶר',
    gender: 'masculine', emoji: '👦', subtype: 'grandchild',
    x: 188, y: 372,
  },
  {
    id: 'roni', name: 'רוני', nameNikud: 'רוֹנִי',
    gender: 'feminine', emoji: '👧🏻', subtype: 'grandchild',
    x: 328, y: 372,
  },
  {
    id: 'gai', name: 'גיא', nameNikud: 'גַּיא',
    gender: 'masculine', emoji: '👦🏻', subtype: 'grandchild',
    x: 452, y: 372,
  },
  {
    id: 'maya', name: 'מאיה', nameNikud: 'מַאיָה',
    gender: 'feminine', emoji: '👧‍🦱', subtype: 'grandchild',
    x: 636, y: 372,
  },
  {
    id: 'eitamar', name: 'איתמר', nameNikud: 'אֵיתָמָר',
    gender: 'masculine', emoji: '👦‍🦱', subtype: 'grandchild',
    x: 760, y: 372,
  },

  // ── Extended family (siblings of spouses) ───────────────
  {
    id: 'shira', name: 'שירה', nameNikud: 'שִׁירָה',
    gender: 'feminine', emoji: '👩‍💼', subtype: 'extended',
    relationLabel: 'אָחוֹת שֶׁל דַּנִי',
    x: 82, y: 490,
  },
  {
    id: 'lior', name: 'ליאור', nameNikud: 'לִיאוֹר',
    gender: 'masculine', emoji: '👨‍💼', subtype: 'extended',
    relationLabel: 'אָח שֶׁל אֵיתָן',
    x: 452, y: 490,
  },
  {
    id: 'amit', name: 'עמית', nameNikud: 'עָמִית',
    gender: 'masculine', emoji: '🧑‍💼', subtype: 'extended',
    relationLabel: 'אָח שֶׁל נוֹעָה',
    x: 760, y: 490,
  },
];

// ─── SVG connection lines ─────────────────────────────────────────────────────
// Used by the canvas component to draw the family tree connections.
// nodeHH = 37 (half of node height 74)
// nodeHW = 36 (half of node width 72)

export const treeLines = {
  // Solid couple lines
  coupleLines: [
    { x1: 395+36, y1: 58, x2: 510-36, y2: 58 },                 // david — rachel
    { x1: 82+36,  y1: 198, x2: 188-36, y2: 198 },               // yael — dani
    { x1: 348+36, y1: 198, x2: 452-36, y2: 198 },               // michal — eitan
    { x1: 656+36, y1: 198, x2: 760-36, y2: 198 },               // uri — noa
  ],

  // Grandparents → Gen 2
  gp: [
    // down from david-rachel midpoint
    { x1: 452, y1: 58+37, x2: 452, y2: 128 },
    // horizontal spanning all three sub-families
    { x1: 135, y1: 128,   x2: 708, y2: 128 },
    // down to each couple midpoint
    { x1: 135, y1: 128,   x2: 135, y2: 161 },  // → yael-dani (midpoint 82+188)/2=135
    { x1: 400, y1: 128,   x2: 400, y2: 161 },  // → michal-eitan (348+452)/2=400
    { x1: 708, y1: 128,   x2: 708, y2: 161 },  // → uri-noa (656+760)/2=708
  ],

  // Gen 2 → Gen 3 (one set per couple)
  yaelDaniToKids: [
    { x1: 135, y1: 198+37, x2: 135, y2: 310 },
    { x1: 62,  y1: 310,    x2: 188, y2: 310 },
    { x1: 62,  y1: 310,    x2: 62,  y2: 372-37 },
    { x1: 188, y1: 310,    x2: 188, y2: 335 },
  ],
  michalEitanToKids: [
    { x1: 400, y1: 235,    x2: 400, y2: 310 },
    { x1: 328, y1: 310,    x2: 452, y2: 310 },
    { x1: 328, y1: 310,    x2: 328, y2: 335 },
    { x1: 452, y1: 310,    x2: 452, y2: 335 },
  ],
  uriNoaToKids: [
    { x1: 708, y1: 235,    x2: 708, y2: 310 },
    { x1: 636, y1: 310,    x2: 760, y2: 310 },
    { x1: 636, y1: 310,    x2: 636, y2: 335 },
    { x1: 760, y1: 310,    x2: 760, y2: 335 },
  ],
};

// ─── Clue bank ────────────────────────────────────────────────────────────────
// 15 clues — 12 are used per game (shuffled).
// To add more clues, append objects following the same pattern.

export const deductionClues: DeductionClue[] = [
  {
    id: 'c1',
    clue: 'הוּא הָאָח שֶׁל אִשְׁתּוֹ שֶׁל אוּרִי',
    hint: 'מְצָא/י אֶת אוּרִי. מִי אִשְׁתּוֹ? מִי הָאָח שֶׁלָּה?',
    answerId: 'amit',
    pathNikud: 'אוּרִי ← אִשְׁתּוֹ נוֹעָה ← הָאָח שֶׁלָּה עָמִית',
  },
  {
    id: 'c2',
    clue: 'הִיא הָאָחוֹת שֶׁל בַּעְלָהּ שֶׁל יָעֵל',
    hint: 'מְצָא/י אֶת יָעֵל. מִי בַּעְלָהּ? מִי הָאָחוֹת שֶׁלּוֹ?',
    answerId: 'shira',
    pathNikud: 'יָעֵל ← בַּעְלָהּ דַּנִי ← הָאָחוֹת שֶׁלּוֹ שִׁירָה',
  },
  {
    id: 'c3',
    clue: 'הוּא הָאָח שֶׁל בַּעְלָהּ שֶׁל מִיכַל',
    hint: 'מְצָא/י אֶת מִיכַל. מִי בַּעְלָהּ? מִי הָאָח שֶׁלּוֹ?',
    answerId: 'lior',
    pathNikud: 'מִיכַל ← בַּעְלָהּ אֵיתָן ← הָאָח שֶׁלּוֹ לִיאוֹר',
  },
  {
    id: 'c4',
    clue: 'הִיא אִשְׁתּוֹ שֶׁל הַבֵּן שֶׁל סַבְתָּא רָחֵל',
    hint: 'מְצָא/י אֶת הַבֵּן שֶׁל סַבְתָּא רָחֵל — זֶה אוּרִי. מִי אִשְׁתּוֹ?',
    answerId: 'noa',
    pathNikud: 'סַבְתָּא רָחֵל ← הַבֵּן שֶׁלָּה אוּרִי ← אִשְׁתּוֹ נוֹעָה',
  },
  {
    id: 'c5',
    clue: 'הוּא הַבֵּן שֶׁל בִּתָּהּ שֶׁל סַבְתָּא רָחֵל שֶׁנִּשֵּׂאת לְדַנִּי',
    hint: 'מְצָא/י אֶת הַבַּת שֶׁל סַבְתָּא רָחֵל שֶׁנִּשֵּׂאת לְדַנִּי — הִיא יָעֵל. מִי הַבֵּן שֶׁלָּה?',
    answerId: 'omer',
    pathNikud: 'סַבְתָּא רָחֵל ← בִּתָּהּ יָעֵל ← הַבֵּן שֶׁלָּה עוֹמֶר',
  },
  {
    id: 'c6',
    clue: 'הוּא הַבֵּן שֶׁל בִּתָּהּ שֶׁל סַבְתָּא רָחֵל שֶׁנִּשֵּׂאת לְאֵיתָן',
    hint: 'מְצָא/י אֶת הַבַּת שֶׁל סַבְתָּא רָחֵל שֶׁנִּשֵּׂאת לְאֵיתָן — הִיא מִיכַל. מִי הַבֵּן שֶׁלָּה?',
    answerId: 'gai',
    pathNikud: 'סַבְתָּא רָחֵל ← בִּתָּהּ מִיכַל ← הַבֵּן שֶׁלָּה גַּיא',
  },
  {
    id: 'c7',
    clue: 'הִיא הַבַּת שֶׁל הַבֵּן שֶׁל סַבָּא דָּוִד',
    hint: 'מְצָא/י אֶת הַבֵּן שֶׁל סַבָּא דָּוִד — זֶה אוּרִי. מִי הַבַּת שֶׁלּוֹ?',
    answerId: 'maya',
    pathNikud: 'סַבָּא דָּוִד ← הַבֵּן שֶׁלּוֹ אוּרִי ← הַבַּת שֶׁלּוֹ מַאיָה',
  },
  {
    id: 'c8',
    clue: 'הִיא הַבַּת שֶׁל בִּתּוֹ שֶׁל סַבָּא דָּוִד שֶׁנִּשֵּׂאת לְדַנִּי',
    hint: 'מְצָא/י אֶת הַבַּת שֶׁל סַבָּא דָּוִד שֶׁנִּשֵּׂאת לְדַנִּי — הִיא יָעֵל. מִי הַבַּת שֶׁלָּה?',
    answerId: 'tamar',
    pathNikud: 'סַבָּא דָּוִד ← בִּתּוֹ יָעֵל ← הַבַּת שֶׁלָּה תָּמָר',
  },
  {
    id: 'c9',
    clue: 'הוּא אָחִיו שֶׁל לִיאוֹר',
    hint: 'מְצָא/י אֶת לִיאוֹר. מִי הָאָח שֶׁלּוֹ?',
    answerId: 'eitan',
    pathNikud: 'לִיאוֹר ← הָאָח שֶׁלּוֹ אֵיתָן',
  },
  {
    id: 'c10',
    clue: 'הוּא אָחִיהָ שֶׁל שִׁירָה',
    hint: 'מְצָא/י אֶת שִׁירָה. מִי הָאָח שֶׁלָּה?',
    answerId: 'dani',
    pathNikud: 'שִׁירָה ← הָאָח שֶׁלָּה דַּנִי',
  },
  {
    id: 'c11',
    clue: 'הִיא אִשְׁתּוֹ שֶׁל אָחִיהָ שֶׁל שִׁירָה',
    hint: 'מְצָא/י אֶת שִׁירָה. מִי הָאָח שֶׁלָּה? מִי אִשְׁתּוֹ?',
    answerId: 'yael',
    pathNikud: 'שִׁירָה ← אָחִיהָ דַּנִי ← אִשְׁתּוֹ יָעֵל',
  },
  {
    id: 'c12',
    clue: 'הוּא בַּעְלָהּ שֶׁל אֲחוֹתוֹ שֶׁל עָמִית',
    hint: 'מְצָא/י אֶת עָמִית. מִי הָאָחוֹת שֶׁלּוֹ? מִי בַּעְלָהּ?',
    answerId: 'uri',
    pathNikud: 'עָמִית ← אֲחוֹתוֹ נוֹעָה ← בַּעְלָהּ אוּרִי',
  },
  {
    id: 'c13',
    clue: 'הִיא הַבַּת שֶׁל הָאָחוֹת שֶׁל אוּרִי שֶׁנִּשֵּׂאת לְאֵיתָן',
    hint: 'מְצָא/י אֶת הָאָחוֹת שֶׁל אוּרִי שֶׁנִּשֵּׂאת לְאֵיתָן — הִיא מִיכַל. מִי הַבַּת שֶׁלָּה?',
    answerId: 'roni',
    pathNikud: 'אוּרִי ← אָחוֹתוֹ מִיכַל ← הַבַּת שֶׁלָּה רוֹנִי',
  },
  {
    id: 'c14',
    clue: 'הוּא הַבֵּן שֶׁל הָאָח שֶׁל מִיכַל',
    hint: 'מְצָא/י אֶת מִיכַל. מִי הָאָח שֶׁלָּה? מִי הַבֵּן שֶׁלּוֹ?',
    answerId: 'eitamar',
    pathNikud: 'מִיכַל ← הָאָח שֶׁלָּה אוּרִי ← הַבֵּן שֶׁלּוֹ אֵיתָמָר',
  },
  {
    id: 'c15',
    clue: 'הוּא בַּעְלָהּ שֶׁל הַסָּבְתָּא שֶׁל עוֹמֶר',
    hint: 'מְצָא/י אֶת עוֹמֶר. מִי הַסָּבְתָּא שֶׁלּוֹ? מִי בַּעְלָהּ?',
    answerId: 'david_sr',
    pathNikud: 'עוֹמֶר ← הַסָּבְתָּא שֶׁלּוֹ רָחֵל ← בַּעְלָהּ דָּוִד',
  },
  // ── Add more clues here following the same pattern ──────────────────────────
];
