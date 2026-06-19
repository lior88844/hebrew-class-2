import type { FamilyMember, Activity } from '../types';

export const familyMembers: FamilyMember[] = [
  {
    id: 'ima',
    hebrew: 'אמא',
    hebrewNikud: 'אִמָּא',
    hebrewPossessive: 'אמא שלי',
    hebrewSheli: 'אמא שלי',
    hebrewPlural: 'אמהות',
    hebrewPluralNikud: 'אִמָּהוֹת',
    english: 'Mom',
    englishPlural: 'Moms',
    emoji: '👩',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'aba',
    hebrew: 'אבא',
    hebrewNikud: 'אַבָּא',
    hebrewPossessive: 'אבא שלי',
    hebrewSheli: 'אבא שלי',
    hebrewPlural: 'אבות',
    hebrewPluralNikud: 'אָבוֹת',
    english: 'Dad',
    englishPlural: 'Dads',
    emoji: '👨',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'ach',
    hebrew: 'אח',
    hebrewNikud: 'אָח',
    hebrewPossessive: 'אחי',
    hebrewSheli: 'אח שלי',
    hebrewPlural: 'אחים',
    hebrewPluralNikud: 'אַחִים',
    english: 'Brother',
    englishPlural: 'Brothers',
    emoji: '👦',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'achot',
    hebrew: 'אחות',
    hebrewNikud: 'אָחוֹת',
    hebrewPossessive: 'אחותי',
    hebrewSheli: 'אחות שלי',
    hebrewPlural: 'אחיות',
    hebrewPluralNikud: 'אַחָיוֹת',
    english: 'Sister',
    englishPlural: 'Sisters',
    emoji: '👧',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'saba',
    hebrew: 'סבא',
    hebrewNikud: 'סַבָּא',
    hebrewPossessive: 'סבא שלי',
    hebrewSheli: 'סבא שלי',
    hebrewPlural: 'סבאים',
    hebrewPluralNikud: 'סַבָּאִים',
    english: 'Grandpa',
    englishPlural: 'Grandpas',
    emoji: '👴',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'savta',
    hebrew: 'סבתא',
    hebrewNikud: 'סַבְתָּא',
    hebrewSheli: 'סבתא שלי',
    hebrewPossessive: 'סבתא שלי',
    hebrewPlural: 'סבתאות',
    hebrewPluralNikud: 'סַבְתָּאוֹת',
    english: 'Grandma',
    englishPlural: 'Grandmas',
    emoji: '👵',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'ben',
    hebrew: 'בן',
    hebrewNikud: 'בֵּן',
    hebrewPossessive: 'בני',
    hebrewSheli: 'בן שלי',
    hebrewPlural: 'בנים',
    hebrewPluralNikud: 'בָּנִים',
    english: 'Son',
    englishPlural: 'Sons',
    emoji: '🧒',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'bat',
    hebrew: 'בת',
    hebrewNikud: 'בַּת',
    hebrewPossessive: 'בתי',
    hebrewSheli: 'בת שלי',
    hebrewPlural: 'בנות',
    hebrewPluralNikud: 'בָּנוֹת',
    english: 'Daughter',
    englishPlural: 'Daughters',
    emoji: '👶',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'yeled',
    hebrew: 'ילד',
    hebrewNikud: 'יֶלֶד',
    hebrewPossessive: 'הילד שלי',
    hebrewSheli: 'ילד שלי',
    hebrewPlural: 'ילדים',
    hebrewPluralNikud: 'יְלָדִים',
    english: 'Boy / Child',
    englishPlural: 'Boys / Children',
    emoji: '👦🏻',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'yalda',
    hebrew: 'ילדה',
    hebrewNikud: 'יַלְדָּה',
    hebrewPossessive: 'הילדה שלי',
    hebrewSheli: 'ילדה שלי',
    hebrewPlural: 'ילדות',
    hebrewPluralNikud: 'יְלָדוֹת',
    english: 'Girl / Child',
    englishPlural: 'Girls / Children',
    emoji: '👧🏻',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'dod',
    hebrew: 'דוד',
    hebrewNikud: 'דּוֹד',
    hebrewPossessive: 'הדוד שלי',
    hebrewSheli: 'דוד שלי',
    hebrewPlural: 'דודים',
    hebrewPluralNikud: 'דּוֹדִים',
    english: 'Uncle',
    englishPlural: 'Uncles',
    emoji: '👨‍💼',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'doda',
    hebrew: 'דודה',
    hebrewNikud: 'דּוֹדָה',
    hebrewPossessive: 'הדודה שלי',
    hebrewSheli: 'דודה שלי',
    hebrewPlural: 'דודות',
    hebrewPluralNikud: 'דּוֹדוֹת',
    english: 'Aunt',
    englishPlural: 'Aunts',
    emoji: '👩‍💼',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'achyan',
    hebrew: 'אחיין',
    hebrewNikud: 'אַחְיָן',
    hebrewPossessive: 'האחיין שלי',
    hebrewSheli: 'אחיין שלי',
    hebrewPlural: 'אחיינים',
    hebrewPluralNikud: 'אַחְיָנִים',
    english: 'Nephew',
    englishPlural: 'Nephews',
    emoji: '👦',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'achyanit',
    hebrew: 'אחיינית',
    hebrewNikud: 'אַחְיָנִית',
    hebrewPossessive: 'האחיינית שלי',
    hebrewSheli: 'אחיינית שלי',
    hebrewPlural: 'אחייניות',
    hebrewPluralNikud: 'אַחְיָנִיּוֹת',
    english: 'Niece',
    englishPlural: 'Nieces',
    emoji: '👧',
    gender: 'feminine',
    pronoun: 'זאת',
  },
  {
    id: 'gis',
    hebrew: 'גיס',
    hebrewNikud: 'גִּיס',
    hebrewPossessive: 'הגיס שלי',
    hebrewSheli: 'גיס שלי',
    hebrewPlural: 'גיסים',
    hebrewPluralNikud: 'גִּיסִים',
    english: 'Brother-in-law',
    englishPlural: 'Brothers-in-law',
    emoji: '🤵',
    gender: 'masculine',
    pronoun: 'זה',
  },
  {
    id: 'gisa',
    hebrew: 'גיסה',
    hebrewNikud: 'גִּיסָה',
    hebrewPossessive: 'הגיסה שלי',
    hebrewSheli: 'גיסה שלי',
    hebrewPlural: 'גיסות',
    hebrewPluralNikud: 'גִּיסוֹת',
    english: 'Sister-in-law',
    englishPlural: 'Sisters-in-law',
    emoji: '👰',
    gender: 'feminine',
    pronoun: 'זאת',
  },
];

export const activities: Activity[] = [
  {
    id: 'vocab',
    title: 'Vocabulary Cards',
    hebrewTitle: 'מִלִּים חֲדָשׁוֹת',
    description: 'Learn family words with pictures',
    duration: '5 min',
    emoji: '🃏',
    color: 'amber',
  },
  {
    id: 'memory',
    title: 'Memory Match',
    hebrewTitle: 'מִשְׂחַק זִכָּרוֹן',
    description: 'Flip cards to match pictures with words',
    duration: '10 min',
    emoji: '🧠',
    color: 'teal',
  },
  {
    id: 'tree',
    title: 'Family Tree Mystery',
    hebrewTitle: 'עֵץ הַמִּשְׁפָּחָה',
    description: 'Answer questions about a family tree',
    duration: '10 min',
    emoji: '🌳',
    color: 'green',
  },
  {
    id: 'myfamily',
    title: 'My Family',
    hebrewTitle: 'הַמִּשְׁפָּחָה שֶׁלִּי',
    description: 'Build your family and describe it',
    duration: '15 min',
    emoji: '🏠',
    color: 'rose',
  },
  {
    id: 'bingo',
    title: 'Family Mystery',
    hebrewTitle: 'מִשְׂחַק הַנִּיחוּשׁ',
    description: 'Follow the chain of clues to find the right person',
    duration: '5 min',
    emoji: '🎯',
    color: 'purple',
  },
  {
    id: 'telephone',
    title: 'Family Telephone',
    hebrewTitle: 'טֶלֶפוֹן מִשְׁפָּחָה',
    description: 'Study the family tree, then answer questions from memory',
    duration: '10 min',
    emoji: '📞',
    color: 'blue',
  },
  {
    id: 'puzzle',
    title: 'Build the Family Tree',
    hebrewTitle: 'בְּנֵה אֶת עֵץ הַמִּשְׁפָּחָה',
    description: 'Read the clues and drag each person into the right place',
    duration: '10 min',
    emoji: '🧩',
    color: 'indigo',
  },
];

// ─── Extended family tree ────────────────────────────────────────────────────
// Structure:
//   סבא דוד + סבתא רחל
//       ├── יוסי + שרה         ← branch A
//       │     ├── דנה
//       │     └── עומר
//       └── לאה + דני           ← branch B
//             ├── תום
//             └── מיה

export interface TreePerson {
  id: string;
  firstName: string;
  firstNameNikud: string;
  label: string;
  english: string;
  emoji: string;
  gender: 'masculine' | 'feminine';
}

export const treePeople: TreePerson[] = [
  { id: 'david',  firstName: 'דוד',  firstNameNikud: 'דָּוִד',  label: 'דוד',  english: 'David',  emoji: '👴', gender: 'masculine' },
  { id: 'rachel', firstName: 'רחל',  firstNameNikud: 'רָחֵל',  label: 'רחל',  english: 'Rachel', emoji: '👵', gender: 'feminine'  },
  { id: 'yossi',  firstName: 'יוסי', firstNameNikud: 'יוֹסִי', label: 'יוסי', english: 'Yossi',  emoji: '👨', gender: 'masculine' },
  { id: 'sara',   firstName: 'שרה',  firstNameNikud: 'שָׂרָה',  label: 'שרה',  english: 'Sara',   emoji: '👩', gender: 'feminine'  },
  { id: 'lea',    firstName: 'לאה',  firstNameNikud: 'לֵאָה',  label: 'לאה',  english: 'Lea',    emoji: '👩‍🦱', gender: 'feminine'  },
  { id: 'danny',  firstName: 'דני',  firstNameNikud: 'דָּנִי',  label: 'דני',  english: 'Danny',  emoji: '👨‍🦲', gender: 'masculine' },
  { id: 'dana',   firstName: 'דנה',  firstNameNikud: 'דָּנָה',  label: 'דנה',  english: 'Dana',   emoji: '👧', gender: 'feminine'  },
  { id: 'omer',   firstName: 'עומר', firstNameNikud: 'עוֹמֶר', label: 'עומר', english: 'Omer',   emoji: '👦', gender: 'masculine' },
  { id: 'tom',    firstName: 'תום',  firstNameNikud: 'תּוֹם',  label: 'תום',  english: 'Tom',    emoji: '👦🏻', gender: 'masculine' },
  { id: 'mia',    firstName: 'מיה',  firstNameNikud: 'מִיָּה',  label: 'מיה',  english: 'Mia',    emoji: '👧🏻', gender: 'feminine'  },
];

export interface RoleChip {
  id: string;
  hebrew: string;      // plain, no article
  nikud: string;       // plain with nikud, no article — shown on tap chips
  nikudDef: string;    // with definite article + nikud — shown in confirmed sentence
  english: string;
}

export const roleChips: RoleChip[] = [
  { id: 'ima',      hebrew: 'אמא',     nikud: 'אִמָּא',     nikudDef: 'הָאִמָּא',     english: 'mom'            },
  { id: 'aba',      hebrew: 'אבא',     nikud: 'אַבָּא',     nikudDef: 'הָאַבָּא',     english: 'dad'            },
  { id: 'ach',      hebrew: 'אח',      nikud: 'אָח',        nikudDef: 'הָאָח',        english: 'brother'        },
  { id: 'achot',    hebrew: 'אחות',    nikud: 'אָחוֹת',     nikudDef: 'הָאָחוֹת',     english: 'sister'         },
  { id: 'saba',     hebrew: 'סבא',     nikud: 'סַבָּא',     nikudDef: 'הַסַּבָּא',    english: 'grandpa'        },
  { id: 'savta',    hebrew: 'סבתא',    nikud: 'סַבְתָּא',   nikudDef: 'הַסַּבְתָּא',  english: 'grandma'        },
  { id: 'ben',      hebrew: 'בן',      nikud: 'בֵּן',       nikudDef: 'הַבֵּן',       english: 'son'            },
  { id: 'bat',      hebrew: 'בת',      nikud: 'בַּת',       nikudDef: 'הַבַּת',       english: 'daughter'       },
  { id: 'dod',      hebrew: 'דוד',     nikud: 'דּוֹד',      nikudDef: 'הַדּוֹד',      english: 'uncle'          },
  { id: 'doda',     hebrew: 'דודה',    nikud: 'דּוֹדָה',    nikudDef: 'הַדּוֹדָה',    english: 'aunt'           },
  { id: 'achyan',   hebrew: 'אחיין',   nikud: 'אַחְיָן',    nikudDef: 'הָאַחְיָן',    english: 'nephew'         },
  { id: 'achyanit', hebrew: 'אחיינית', nikud: 'אַחְיָנִית', nikudDef: 'הָאַחְיָנִית', english: 'niece'          },
  { id: 'gis',      hebrew: 'גיס',     nikud: 'גִּיס',      nikudDef: 'הַגִּיס',      english: 'brother-in-law' },
  { id: 'gisa',     hebrew: 'גיסה',    nikud: 'גִּיסָה',    nikudDef: 'הַגִּיסָה',    english: 'sister-in-law'  },
];

export interface TreeQuestion {
  id: string;
  personAId: string;
  personBId: string;
  correctRoleId: string;
  sentence: string;
  sentenceNikud: string;
  sentenceEnglish: string;
}

export const treeQuestions: TreeQuestion[] = [
  { id: 'q1',  personAId: 'sara',   personBId: 'dana',  correctRoleId: 'ima',      sentence: 'שרה היא האמא של דנה.',       sentenceNikud: 'שָׂרָה הִיא הָאִמָּא שֶׁל דָּנָה.',        sentenceEnglish: "Sara is Dana's mom."              },
  { id: 'q2',  personAId: 'yossi',  personBId: 'omer',  correctRoleId: 'aba',      sentence: 'יוסי הוא האבא של עומר.',     sentenceNikud: 'יוֹסִי הוּא הָאַבָּא שֶׁל עוֹמֶר.',      sentenceEnglish: "Yossi is Omer's dad."             },
  { id: 'q3',  personAId: 'omer',   personBId: 'dana',  correctRoleId: 'ach',      sentence: 'עומר הוא האח של דנה.',       sentenceNikud: 'עוֹמֶר הוּא הָאָח שֶׁל דָּנָה.',         sentenceEnglish: "Omer is Dana's brother."          },
  { id: 'q4',  personAId: 'dana',   personBId: 'omer',  correctRoleId: 'achot',    sentence: 'דנה היא האחות של עומר.',     sentenceNikud: 'דָּנָה הִיא הָאָחוֹת שֶׁל עוֹמֶר.',      sentenceEnglish: "Dana is Omer's sister."           },
  { id: 'q5',  personAId: 'david',  personBId: 'dana',  correctRoleId: 'saba',     sentence: 'דוד הוא הסבא של דנה.',       sentenceNikud: 'דָּוִד הוּא הַסַּבָּא שֶׁל דָּנָה.',      sentenceEnglish: "David is Dana's grandpa."         },
  { id: 'q6',  personAId: 'rachel', personBId: 'omer',  correctRoleId: 'savta',    sentence: 'רחל היא הסבתא של עומר.',     sentenceNikud: 'רָחֵל הִיא הַסַּבְתָּא שֶׁל עוֹמֶר.',    sentenceEnglish: "Rachel is Omer's grandma."        },
  { id: 'q7',  personAId: 'dana',   personBId: 'yossi', correctRoleId: 'bat',      sentence: 'דנה היא הבת של יוסי.',       sentenceNikud: 'דָּנָה הִיא הַבַּת שֶׁל יוֹסִי.',        sentenceEnglish: "Dana is Yossi's daughter."        },
  { id: 'q8',  personAId: 'omer',   personBId: 'sara',  correctRoleId: 'ben',      sentence: 'עומר הוא הבן של שרה.',       sentenceNikud: 'עוֹמֶר הוּא הַבֵּן שֶׁל שָׂרָה.',        sentenceEnglish: "Omer is Sara's son."              },
  { id: 'q9',  personAId: 'lea',    personBId: 'dana',  correctRoleId: 'doda',     sentence: 'לאה היא הדודה של דנה.',      sentenceNikud: 'לֵאָה הִיא הַדּוֹדָה שֶׁל דָּנָה.',      sentenceEnglish: "Lea is Dana's aunt."              },
  { id: 'q10', personAId: 'danny',  personBId: 'omer',  correctRoleId: 'dod',      sentence: 'דני הוא הדוד של עומר.',      sentenceNikud: 'דָּנִי הוּא הַדּוֹד שֶׁל עוֹמֶר.',       sentenceEnglish: "Danny is Omer's uncle."           },
  { id: 'q11', personAId: 'mia',    personBId: 'lea',   correctRoleId: 'bat',      sentence: 'מיה היא הבת של לאה.',        sentenceNikud: 'מִיָּה הִיא הַבַּת שֶׁל לֵאָה.',         sentenceEnglish: "Mia is Lea's daughter."           },
  { id: 'q12', personAId: 'tom',    personBId: 'sara',  correctRoleId: 'achyan',   sentence: 'תום הוא האחיין של שרה.',     sentenceNikud: 'תּוֹם הוּא הָאַחְיָן שֶׁל שָׂרָה.',      sentenceEnglish: "Tom is Sara's nephew."            },
  { id: 'q13', personAId: 'mia',    personBId: 'yossi', correctRoleId: 'achyanit', sentence: 'מיה היא האחיינית של יוסי.',  sentenceNikud: 'מִיָּה הִיא הָאַחְיָנִית שֶׁל יוֹסִי.',  sentenceEnglish: "Mia is Yossi's niece."            },
  { id: 'q14', personAId: 'danny',  personBId: 'yossi', correctRoleId: 'gis',      sentence: 'דני הוא הגיס של יוסי.',      sentenceNikud: 'דָּנִי הוּא הַגִּיס שֶׁל יוֹסִי.',       sentenceEnglish: "Danny is Yossi's brother-in-law." },
  { id: 'q15', personAId: 'lea',    personBId: 'sara',  correctRoleId: 'gisa',     sentence: 'לאה היא הגיסה של שרה.',      sentenceNikud: 'לֵאָה הִיא הַגִּיסָה שֶׁל שָׂרָה.',      sentenceEnglish: "Lea is Sara's sister-in-law."     },
  { id: 'q16', personAId: 'rachel', personBId: 'lea',   correctRoleId: 'ima',      sentence: 'רחל היא האמא של לאה.',       sentenceNikud: 'רָחֵל הִיא הָאִמָּא שֶׁל לֵאָה.',        sentenceEnglish: "Rachel is Lea's mom."             },
  { id: 'q17', personAId: 'david',  personBId: 'yossi', correctRoleId: 'aba',      sentence: 'דוד הוא האבא של יוסי.',      sentenceNikud: 'דָּוִד הוּא הָאַבָּא שֶׁל יוֹסִי.',      sentenceEnglish: "David is Yossi's dad."            },
  { id: 'q18', personAId: 'tom',    personBId: 'danny', correctRoleId: 'ben',      sentence: 'תום הוא הבן של דני.',        sentenceNikud: 'תּוֹם הוּא הַבֵּן שֶׁל דָּנִי.',         sentenceEnglish: "Tom is Danny's son."              },
];
