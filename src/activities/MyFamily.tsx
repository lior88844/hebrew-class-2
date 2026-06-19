import { useState } from 'react';
import { familyMembers } from '../data/family';
import { ActivityHeader } from '../components/ActivityHeader';
import type { FamilyMember } from '../types';

interface Props {
  onBack: () => void;
}

type Stage = 'build' | 'describe';

// Maps memberId → how many of that relative the student has (0 = not in family)
type FamilyCounts = Record<string, number>;

const MAX_COUNT = 5;

function buildYeshSentence(member: FamilyMember, count: number): { hebrew: string; english: string } {
  if (count === 1) {
    return {
      hebrew: `יֵשׁ לִי ${member.hebrewNikud}.`,
      english: `I have a ${member.english.toLowerCase()}.`,
    };
  }
  return {
    hebrew: `יֵשׁ לִי ${count} ${member.hebrewPluralNikud}.`,
    english: `I have ${count} ${member.englishPlural.toLowerCase()}.`,
  };
}

export function MyFamily({ onBack }: Props) {
  const [stage, setStage] = useState<Stage>('build');
  const [counts, setCounts] = useState<FamilyCounts>({});
  const [describeIndex, setDescribeIndex] = useState(0);

  const setCount = (id: string, delta: number) => {
    setCounts((prev) => {
      const next = Math.max(0, Math.min(MAX_COUNT, (prev[id] ?? 0) + delta));
      return { ...prev, [id]: next };
    });
  };

  // Members that have at least count 1
  const activeMembers = familyMembers.filter((m) => (counts[m.id] ?? 0) > 0);
  const currentMember = activeMembers[describeIndex];
  const currentCount = currentMember ? (counts[currentMember.id] ?? 1) : 1;

  const pronoun = currentMember
    ? currentMember.gender === 'feminine' ? 'זֹאת' : 'זֶה'
    : '';

  const basicSentence = currentMember && currentCount === 1
    ? `${pronoun} ${currentMember.hebrewNikud}.`
    : null;

  const yeshData = currentMember ? buildYeshSentence(currentMember, currentCount) : null;

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div className="max-w-lg mx-auto">
        <ActivityHeader
          title="My Family"
          hebrewTitle="הַמִּשְׁפָּחָה שֶׁלִּי"
          emoji="🏠"
          onBack={onBack}
        />

        {/* Stage tabs */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl bg-stone-200 w-fit mx-auto">
          {(['build', 'describe'] as Stage[]).map((s) => (
            <button
              key={s}
              onClick={() => { setStage(s); setDescribeIndex(0); }}
              disabled={s === 'describe' && activeMembers.length === 0}
              className="px-5 py-1.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
              style={{
                background: stage === s ? 'white' : 'transparent',
                color: stage === s ? 'var(--ink)' : 'var(--muted)',
                boxShadow: stage === s ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {s === 'build' ? '1. Build' : '2. Describe'}
            </button>
          ))}
        </div>

        {stage === 'build' && (
          <>
            <p className="text-center text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Use <strong>＋</strong> and <strong>－</strong> to choose how many of each relative you have
            </p>

            {/* Selected family summary */}
            {activeMembers.length > 0 && (
              <div
                className="rounded-2xl p-4 mb-6 text-center"
                style={{ background: '#fff7ed', border: '1.5px solid #fed7aa' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#c2410c' }}>
                  הַמִּשְׁפָּחָה שֶׁלִּי
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {activeMembers.map((m) => {
                    const cnt = counts[m.id] ?? 0;
                    const { hebrew } = buildYeshSentence(m, cnt);
                    return (
                      <div key={m.id} className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{m.emoji}</span>
                        <span
                          className="hebrew text-sm font-bold"
                          style={{ color: 'var(--ink)', direction: 'rtl' }}
                        >
                          {hebrew}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Member grid with counters */}
            <div className="grid grid-cols-2 gap-3">
              {familyMembers.map((member) => {
                const count = counts[member.id] ?? 0;
                const active = count > 0;
                return (
                  <div
                    key={member.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200"
                    style={{
                      background: active ? '#fff7ed' : 'white',
                      border: `1.5px solid ${active ? '#f97316' : '#e5e7eb'}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{member.emoji}</span>
                      <div className="text-right" style={{ direction: 'rtl' }}>
                        <div className="hebrew text-base font-bold" style={{ color: 'var(--ink)' }}>
                          {count <= 1 ? member.hebrewNikud : member.hebrewPluralNikud}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>
                          {count <= 1 ? member.english : member.englishPlural}
                        </div>
                      </div>
                    </div>

                    {/* Counter row */}
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        onClick={() => setCount(member.id, -1)}
                        disabled={count === 0}
                        className="w-7 h-7 rounded-full text-lg font-bold flex items-center justify-center transition-all disabled:opacity-30 hover:scale-110 active:scale-95"
                        style={{ background: '#fed7aa', color: '#c2410c' }}
                      >
                        −
                      </button>
                      <span
                        className="w-6 text-center text-lg font-bold tabular-nums"
                        style={{ color: active ? '#c2410c' : 'var(--muted)' }}
                      >
                        {count}
                      </span>
                      <button
                        onClick={() => setCount(member.id, +1)}
                        disabled={count === MAX_COUNT}
                        className="w-7 h-7 rounded-full text-lg font-bold flex items-center justify-center transition-all disabled:opacity-30 hover:scale-110 active:scale-95"
                        style={{ background: '#f97316', color: 'white' }}
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {activeMembers.length > 0 && (
              <button
                onClick={() => { setDescribeIndex(0); setStage('describe'); }}
                className="w-full mt-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#f97316', color: 'white' }}
              >
                Describe My Family →
              </button>
            )}
          </>
        )}

        {stage === 'describe' && activeMembers.length > 0 && currentMember && (
          <>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {activeMembers.map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{
                    background: i === describeIndex ? '#f97316' : i < describeIndex ? '#fed7aa' : '#e5e7eb',
                  }}
                />
              ))}
            </div>

            {/* Big member card */}
            <div
              className="rounded-3xl p-8 text-center mb-6 shadow-sm"
              style={{ background: '#fff7ed', border: '1.5px solid #fed7aa' }}
            >
              {/* Emoji row — repeat the emoji for each count (up to 5) */}
              <div className="flex justify-center gap-1 mb-4 flex-wrap">
                {Array.from({ length: currentCount }).map((_, i) => (
                  <span key={i} className="text-5xl">{currentMember.emoji}</span>
                ))}
              </div>

              {/* יש לי sentence — primary */}
              <div
                className="hebrew text-2xl font-bold mb-3 px-6 py-3 rounded-xl inline-block"
                style={{ background: '#f97316', color: 'white', direction: 'rtl' }}
              >
                {yeshData?.hebrew}
              </div>

              {/* English translation */}
              <p className="text-base font-medium mt-1 mb-3" style={{ color: 'var(--muted)' }}>
                {yeshData?.english}
              </p>

              {/* זה/זאת sentence — shown only for count = 1 */}
              {basicSentence && (
                <div
                  className="hebrew text-xl font-semibold px-5 py-2 rounded-xl mt-2"
                  style={{ background: 'white', color: 'var(--ink)', border: '1.5px solid #fed7aa', direction: 'rtl' }}
                >
                  {basicSentence}
                </div>
              )}

              {/* Singular / plural reminder */}
              <div className="mt-4 flex justify-center gap-6 text-sm" style={{ color: '#c2410c' }}>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="hebrew font-bold text-base" dir="rtl">{currentMember.hebrewNikud}</span>
                  <span className="font-medium">{currentMember.english}</span>
                </div>
                {currentCount > 1 && (
                  <>
                    <span className="font-bold self-center" style={{ color: '#fed7aa' }}>→</span>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="hebrew font-bold text-base" dir="rtl">{currentMember.hebrewPluralNikud}</span>
                      <span className="font-medium">{currentMember.englishPlural}</span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm mt-4" style={{ color: 'var(--muted)' }}>
                Say it out loud!
              </p>
            </div>

            {/* Mini strip of active members */}
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {activeMembers.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setDescribeIndex(i)}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                  style={{
                    background: i === describeIndex ? '#fff7ed' : 'transparent',
                    border: `1.5px solid ${i === describeIndex ? '#f97316' : 'transparent'}`,
                    opacity: i < describeIndex ? 0.5 : 1,
                  }}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span
                    className="hebrew text-xs font-bold"
                    style={{ color: 'var(--ink)', direction: 'rtl' }}
                  >
                    {(counts[m.id] ?? 1) > 1 ? m.hebrewPluralNikud : m.hebrewNikud}
                  </span>
                  {(counts[m.id] ?? 1) > 1 && (
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: '#f97316' }}
                    >
                      ×{counts[m.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {describeIndex > 0 && (
                <button
                  onClick={() => setDescribeIndex((i) => i - 1)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{ background: 'white', border: '1.5px solid var(--sand-dark)', color: 'var(--ink)' }}
                >
                  ← Back
                </button>
              )}
              {describeIndex < activeMembers.length - 1 ? (
                <button
                  onClick={() => setDescribeIndex((i) => i + 1)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{ background: '#f97316', color: 'white' }}
                >
                  Next →
                </button>
              ) : (
                <div
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-center"
                  style={{ background: '#dcfce7', border: '1.5px solid #22c55e', color: '#16a34a' }}
                >
                  🎉 כׇּל הַכָּבוֹד! All done!
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
