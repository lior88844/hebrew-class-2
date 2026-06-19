import { useState } from 'react';
import { familyMembers } from '../data/family';
import { ActivityHeader } from '../components/ActivityHeader';
import type { FamilyMember } from '../types';

interface Props {
  onBack: () => void;
}

type Stage = 'build' | 'describe';

export function MyFamily({ onBack }: Props) {
  const [stage, setStage] = useState<Stage>('build');
  const [myFamily, setMyFamily] = useState<FamilyMember[]>([]);
  const [describeIndex, setDescribeIndex] = useState(0);
  const [useSheli, setUseSheli] = useState(false);

  const toggleMember = (member: FamilyMember) => {
    setMyFamily((prev) =>
      prev.find((m) => m.id === member.id)
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, member]
    );
  };

  const currentMember = myFamily[describeIndex];

  const pronoun = currentMember
    ? currentMember.gender === 'feminine' ? 'זֹאת' : 'זֶה'
    : '';
  const sentence = currentMember
    ? useSheli
      ? `${pronoun} ${currentMember.hebrewNikud} שֶׁלִּי.`
      : `${pronoun} ${currentMember.hebrewNikud}.`
    : '';

  const yeshSentence = currentMember
    ? `יֵשׁ לִי ${currentMember.hebrewNikud}.`
    : '';

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
              disabled={s === 'describe' && myFamily.length === 0}
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
              Click to add family members to your family
            </p>

            {/* Selected family display */}
            {myFamily.length > 0 && (
              <div
                className="rounded-2xl p-4 mb-6 text-center"
                style={{ background: '#fff7ed', border: '1.5px solid #fed7aa' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#c2410c' }}>
                  הַמִּשְׁפָּחָה שֶׁלִּי
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {myFamily.map((m) => (
                    <div key={m.id} className="flex flex-col items-center gap-1">
                      <span className="text-3xl">{m.emoji}</span>
                      <span className="hebrew text-sm font-bold" style={{ color: 'var(--ink)' }}>
                        {m.hebrewNikud}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All members to pick */}
            <div className="grid grid-cols-4 gap-3">
              {familyMembers.map((member) => {
                const selected = myFamily.some((m) => m.id === member.id);
                return (
                  <button
                    key={member.id}
                    onClick={() => toggleMember(member)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: selected ? '#fff7ed' : 'white',
                      border: `1.5px solid ${selected ? '#f97316' : '#e5e7eb'}`,
                    }}
                  >
                    <span className="text-3xl">{member.emoji}</span>
                    <span className="hebrew text-base font-bold" style={{ color: 'var(--ink)' }}>
                      {member.hebrewNikud}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>
                      {member.english}
                    </span>
                    {selected && (
                      <span className="text-xs font-bold" style={{ color: '#f97316' }}>✓ added</span>
                    )}
                  </button>
                );
              })}
            </div>

            {myFamily.length > 0 && (
              <button
                onClick={() => setStage('describe')}
                className="w-full mt-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#f97316', color: 'white' }}
              >
                Describe My Family →
              </button>
            )}
          </>
        )}

        {stage === 'describe' && myFamily.length > 0 && (
          <>
            {/* Mode toggle */}
            <div className="flex gap-2 justify-center mb-6 p-1 rounded-xl bg-stone-200 w-fit mx-auto">
              <button
                onClick={() => setUseSheli(false)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: !useSheli ? 'white' : 'transparent',
                  color: !useSheli ? 'var(--ink)' : 'var(--muted)',
                  boxShadow: !useSheli ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                Basic (זֹאת אִמָּא)
              </button>
              <button
                onClick={() => setUseSheli(true)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: useSheli ? 'white' : 'transparent',
                  color: useSheli ? 'var(--ink)' : 'var(--muted)',
                  boxShadow: useSheli ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                Possessive (שֶׁלִּי)
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {myFamily.map((_, i) => (
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
              <div className="text-8xl mb-4">{currentMember.emoji}</div>

              {/* יש לי sentence */}
              <div
                className="hebrew text-2xl font-semibold mb-4 px-4 py-2 rounded-xl inline-block"
                style={{ background: '#ffedd5', color: '#c2410c' }}
              >
                {yeshSentence}
              </div>

              {/* זה/זאת sentence */}
              <div
                className="hebrew text-3xl font-bold px-6 py-3 rounded-xl"
                style={{ background: 'white', color: 'var(--ink)', border: '1.5px solid #fed7aa' }}
              >
                {sentence}
              </div>

              <p className="text-sm mt-4" style={{ color: 'var(--muted)' }}>
                Say it out loud!
              </p>
            </div>

            {/* My family strip */}
            <div className="flex justify-center gap-3 mb-6">
              {myFamily.map((m, i) => (
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
                  <span className="hebrew text-xs font-bold" style={{ color: 'var(--ink)' }}>{m.hebrewNikud}</span>
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
              {describeIndex < myFamily.length - 1 ? (
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
