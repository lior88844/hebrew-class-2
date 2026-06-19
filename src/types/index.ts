export type Gender = 'masculine' | 'feminine';

export interface FamilyMember {
  id: string;
  hebrew: string;
  hebrewNikud: string;        // with vowel marks
  hebrewPossessive: string;   // e.g. אמי / אחותי
  hebrewSheli: string;        // e.g. אמא שלי / אחות שלי
  english: string;
  emoji: string;
  gender: Gender;
  pronoun: string;            // זה / זאת
}

export type ActivityId = 'vocab' | 'memory' | 'tree' | 'myfamily' | 'bingo';

export interface Activity {
  id: ActivityId;
  title: string;
  hebrewTitle: string;
  description: string;
  duration: string;
  emoji: string;
  color: string;
}
