// ─── Family Telephone — Question Bank ────────────────────────────────────────
//
//  Family tree being tested (from deductionFamily.ts):
//
//    סַבָּא דָּוִד + סַבְתָּא רָחֵל
//         │
//    ┌────┴────────┐
//   יָעֵל + דַּנִי   מִיכַל + אֵיתָן   אוּרִי + נוֹעָה
//    ├── תָּמָר         ├── רוֹנִי          ├── מַאיָה
//    └── עוֹמֶר         └── גַּיא           └── אֵיתָמָר
//
//  Extended relatives (siblings of spouses):
//    שִׁירָה — sister of דַּנִי
//    לִיאוֹר — brother of אֵיתָן
//    עָמִית  — brother of נוֹעָה

export interface TelephoneOption {
  id: string;
  labelHebrew: string;
  labelEnglish: string;
  personId?: string;   // matches deductionFamily id, for emoji lookup
}

export interface TelephoneQuestion {
  id: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  questionHebrew: string;
  questionEnglish: string;
  correctOptionId: string;
  options: TelephoneOption[];
  points: number;
}

// ── Level 1 — Direct, single-step relationships ───────────────────────────────

const level1: TelephoneQuestion[] = [
  {
    id: 'q1',
    level: 1, levelLabel: 'קַל',
    questionHebrew: 'מִי הָאָח שֶׁל תָּמָר?',
    questionEnglish: "Who is Tamar's brother?",
    correctOptionId: 'omer',
    options: [
      { id: 'omer',    labelHebrew: 'עוֹמֶר',  labelEnglish: 'Omer',   personId: 'omer'    },
      { id: 'gai',     labelHebrew: 'גַּיא',    labelEnglish: 'Gai',    personId: 'gai'     },
      { id: 'eitamar', labelHebrew: 'אֵיתָמָר', labelEnglish: 'Eitamar',personId: 'eitamar' },
      { id: 'dani',    labelHebrew: 'דַּנִי',   labelEnglish: 'Dani',   personId: 'dani'    },
    ],
    points: 1,
  },
  {
    id: 'q2',
    level: 1, levelLabel: 'קַל',
    questionHebrew: 'מִי נָשׂוּי לְנוֹעָה?',
    questionEnglish: 'Who is married to Noa?',
    correctOptionId: 'uri',
    options: [
      { id: 'uri',   labelHebrew: 'אוּרִי',  labelEnglish: 'Uri',  personId: 'uri'   },
      { id: 'dani',  labelHebrew: 'דַּנִי',  labelEnglish: 'Dani', personId: 'dani'  },
      { id: 'eitan', labelHebrew: 'אֵיתָן',  labelEnglish: 'Eitan',personId: 'eitan' },
      { id: 'amit',  labelHebrew: 'עָמִית',  labelEnglish: 'Amit', personId: 'amit'  },
    ],
    points: 1,
  },
  {
    id: 'q3',
    level: 1, levelLabel: 'קַל',
    questionHebrew: 'מִי הַסַּבְתָּא שֶׁל מַאיָה?',
    questionEnglish: "Who is Maya's grandma?",
    correctOptionId: 'rachel_sr',
    options: [
      { id: 'rachel_sr', labelHebrew: 'רָחֵל',  labelEnglish: 'Rachel', personId: 'rachel_sr' },
      { id: 'noa',       labelHebrew: 'נוֹעָה',  labelEnglish: 'Noa',    personId: 'noa'       },
      { id: 'yael',      labelHebrew: 'יָעֵל',   labelEnglish: 'Yael',   personId: 'yael'      },
      { id: 'shira',     labelHebrew: 'שִׁירָה', labelEnglish: 'Shira',  personId: 'shira'     },
    ],
    points: 1,
  },
  {
    id: 'q4',
    level: 1, levelLabel: 'קַל',
    questionHebrew: 'מִי אִמָּא שֶׁל רוֹנִי?',
    questionEnglish: "Who is Roni's mom?",
    correctOptionId: 'michal',
    options: [
      { id: 'michal', labelHebrew: 'מִיכַל', labelEnglish: 'Michal', personId: 'michal' },
      { id: 'yael',   labelHebrew: 'יָעֵל',  labelEnglish: 'Yael',   personId: 'yael'   },
      { id: 'noa',    labelHebrew: 'נוֹעָה', labelEnglish: 'Noa',    personId: 'noa'    },
      { id: 'shira',  labelHebrew: 'שִׁירָה',labelEnglish: 'Shira',  personId: 'shira'  },
    ],
    points: 1,
  },
  {
    id: 'q5',
    level: 1, levelLabel: 'קַל',
    questionHebrew: 'מִי אַבָּא שֶׁל עוֹמֶר?',
    questionEnglish: "Who is Omer's dad?",
    correctOptionId: 'dani',
    options: [
      { id: 'dani',    labelHebrew: 'דַּנִי',  labelEnglish: 'Dani',   personId: 'dani'    },
      { id: 'eitan',   labelHebrew: 'אֵיתָן',  labelEnglish: 'Eitan',  personId: 'eitan'   },
      { id: 'uri',     labelHebrew: 'אוּרִי',  labelEnglish: 'Uri',    personId: 'uri'     },
      { id: 'david_sr',labelHebrew: 'דָּוִד',  labelEnglish: 'David',  personId: 'david_sr'},
    ],
    points: 1,
  },
];

// ── Level 2 — One hop (sibling of parent / aunt / uncle / count) ───────────────

const level2: TelephoneQuestion[] = [
  {
    id: 'q6',
    level: 2, levelLabel: 'בֵּינוֹנִי',
    questionHebrew: 'מִי הָאָחוֹת שֶׁל יָעֵל?',
    questionEnglish: "Who is Yael's sister?",
    correctOptionId: 'michal',
    options: [
      { id: 'michal', labelHebrew: 'מִיכַל',  labelEnglish: 'Michal', personId: 'michal' },
      { id: 'noa',    labelHebrew: 'נוֹעָה',  labelEnglish: 'Noa',    personId: 'noa'    },
      { id: 'shira',  labelHebrew: 'שִׁירָה', labelEnglish: 'Shira',  personId: 'shira'  },
      { id: 'roni',   labelHebrew: 'רוֹנִי',  labelEnglish: 'Roni',   personId: 'roni'   },
    ],
    points: 2,
  },
  {
    id: 'q7',
    level: 2, levelLabel: 'בֵּינוֹנִי',
    questionHebrew: 'מִי הַדּוֹד שֶׁל מַאיָה?',
    questionEnglish: "Who is Maya's uncle?",
    correctOptionId: 'amit',
    options: [
      { id: 'amit',  labelHebrew: 'עָמִית',  labelEnglish: 'Amit',  personId: 'amit'  },
      { id: 'lior',  labelHebrew: 'לִיאוֹר', labelEnglish: 'Lior',  personId: 'lior'  },
      { id: 'dani',  labelHebrew: 'דַּנִי',  labelEnglish: 'Dani',  personId: 'dani'  },
      { id: 'eitan', labelHebrew: 'אֵיתָן',  labelEnglish: 'Eitan', personId: 'eitan' },
    ],
    points: 2,
  },
  {
    id: 'q8',
    level: 2, levelLabel: 'בֵּינוֹנִי',
    questionHebrew: 'כַּמָּה יְלָדִים יֵשׁ לְיָעֵל וּלְדַּנִי?',
    questionEnglish: 'How many children do Yael and Dani have?',
    correctOptionId: '2',
    options: [
      { id: '1', labelHebrew: '1', labelEnglish: 'one'   },
      { id: '2', labelHebrew: '2', labelEnglish: 'two'   },
      { id: '3', labelHebrew: '3', labelEnglish: 'three' },
      { id: '4', labelHebrew: '4', labelEnglish: 'four'  },
    ],
    points: 2,
  },
  {
    id: 'q9',
    level: 2, levelLabel: 'בֵּינוֹנִי',
    questionHebrew: 'מִי הַדּוֹדָה שֶׁל גַּיא?',
    questionEnglish: "Who is Gai's aunt?",
    correctOptionId: 'yael',
    options: [
      { id: 'yael',  labelHebrew: 'יָעֵל',   labelEnglish: 'Yael',  personId: 'yael'  },
      { id: 'noa',   labelHebrew: 'נוֹעָה',  labelEnglish: 'Noa',   personId: 'noa'   },
      { id: 'shira', labelHebrew: 'שִׁירָה', labelEnglish: 'Shira', personId: 'shira' },
      { id: 'roni',  labelHebrew: 'רוֹנִי',  labelEnglish: 'Roni',  personId: 'roni'  },
    ],
    points: 2,
  },
  {
    id: 'q10',
    level: 2, levelLabel: 'בֵּינוֹנִי',
    questionHebrew: 'מִי הָאָחוֹת שֶׁל דַּנִי?',
    questionEnglish: "Who is Dani's sister?",
    correctOptionId: 'shira',
    options: [
      { id: 'shira',  labelHebrew: 'שִׁירָה', labelEnglish: 'Shira',  personId: 'shira'  },
      { id: 'yael',   labelHebrew: 'יָעֵל',   labelEnglish: 'Yael',   personId: 'yael'   },
      { id: 'michal', labelHebrew: 'מִיכַל',  labelEnglish: 'Michal', personId: 'michal' },
      { id: 'noa',    labelHebrew: 'נוֹעָה',  labelEnglish: 'Noa',    personId: 'noa'    },
    ],
    points: 2,
  },
];

// ── Level 3 — Two hops / counting / tricky ────────────────────────────────────

const level3: TelephoneQuestion[] = [
  {
    id: 'q11',
    level: 3, levelLabel: 'קָשֶׁה',
    questionHebrew: 'כַּמָּה נְכָדִים יֵשׁ לְסַבְתָּא רָחֵל?',
    questionEnglish: 'How many grandchildren does Grandma Rachel have?',
    correctOptionId: '6',
    options: [
      { id: '4', labelHebrew: '4', labelEnglish: 'four'  },
      { id: '5', labelHebrew: '5', labelEnglish: 'five'  },
      { id: '6', labelHebrew: '6', labelEnglish: 'six'   },
      { id: '8', labelHebrew: '8', labelEnglish: 'eight' },
    ],
    points: 3,
  },
  {
    id: 'q12',
    level: 3, levelLabel: 'קָשֶׁה',
    questionHebrew: 'מִי הַגִּיס שֶׁל דַּנִי?',
    questionEnglish: "Who is Dani's brother-in-law?",
    correctOptionId: 'uri',
    options: [
      { id: 'uri',   labelHebrew: 'אוּרִי',  labelEnglish: 'Uri',  personId: 'uri'   },
      { id: 'eitan', labelHebrew: 'אֵיתָן',  labelEnglish: 'Eitan',personId: 'eitan' },
      { id: 'lior',  labelHebrew: 'לִיאוֹר', labelEnglish: 'Lior', personId: 'lior'  },
      { id: 'amit',  labelHebrew: 'עָמִית',  labelEnglish: 'Amit', personId: 'amit'  },
    ],
    points: 3,
  },
  {
    id: 'q13',
    level: 3, levelLabel: 'קָשֶׁה',
    questionHebrew: 'מִי הַדּוֹד שֶׁל תָּמָר?',
    questionEnglish: "Who is Tamar's uncle?",
    correctOptionId: 'uri',
    options: [
      { id: 'uri',   labelHebrew: 'אוּרִי',  labelEnglish: 'Uri',  personId: 'uri'   },
      { id: 'lior',  labelHebrew: 'לִיאוֹר', labelEnglish: 'Lior', personId: 'lior'  },
      { id: 'amit',  labelHebrew: 'עָמִית',  labelEnglish: 'Amit', personId: 'amit'  },
      { id: 'eitan', labelHebrew: 'אֵיתָן',  labelEnglish: 'Eitan',personId: 'eitan' },
    ],
    points: 3,
  },
  {
    id: 'q14',
    level: 3, levelLabel: 'קָשֶׁה',
    questionHebrew: 'כַּמָּה יְלָדִים יֵשׁ לְסַבָּא דָּוִד וּלְסַבְתָּא רָחֵל?',
    questionEnglish: 'How many children do Grandpa David and Grandma Rachel have?',
    correctOptionId: '3',
    options: [
      { id: '2', labelHebrew: '2', labelEnglish: 'two'   },
      { id: '3', labelHebrew: '3', labelEnglish: 'three' },
      { id: '4', labelHebrew: '4', labelEnglish: 'four'  },
      { id: '6', labelHebrew: '6', labelEnglish: 'six'   },
    ],
    points: 3,
  },
  {
    id: 'q15',
    level: 3, levelLabel: 'קָשֶׁה',
    questionHebrew: 'מִי הַסַּבָּא שֶׁל אֵיתָמָר?',
    questionEnglish: "Who is Eitamar's grandpa?",
    correctOptionId: 'david_sr',
    options: [
      { id: 'david_sr', labelHebrew: 'דָּוִד',  labelEnglish: 'David',  personId: 'david_sr' },
      { id: 'dani',     labelHebrew: 'דַּנִי',  labelEnglish: 'Dani',   personId: 'dani'     },
      { id: 'eitan',    labelHebrew: 'אֵיתָן',  labelEnglish: 'Eitan',  personId: 'eitan'    },
      { id: 'uri',      labelHebrew: 'אוּרִי',  labelEnglish: 'Uri',    personId: 'uri'      },
    ],
    points: 3,
  },
];

export const telephoneQuestions: TelephoneQuestion[] = [
  ...level1,
  ...level2,
  ...level3,
];

export const MAX_SCORE = telephoneQuestions.reduce((sum, q) => sum + q.points, 0);
