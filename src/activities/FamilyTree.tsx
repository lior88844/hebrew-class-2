import { useState, useMemo } from 'react';
import { treePeople, treeQuestions, roleChips } from '../data/family';
import type { TreePerson, TreeQuestion, RoleChip } from '../data/family';
import { ActivityHeader } from '../components/ActivityHeader';

interface Props {
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getDistractors(correctId: string, count = 5): RoleChip[] {
  const wrong = roleChips.filter((r) => r.id !== correctId);
  return shuffle(wrong).slice(0, count);
}

function personById(id: string): TreePerson {
  return treePeople.find((p) => p.id === id)!;
}

export function FamilyTree({ onBack }: Props) {
  const questions = useMemo(() => shuffle(treeQuestions), []);
  const [currentQ, setCurrentQ] = useState(0);
  const [, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const question: TreeQuestion = questions[currentQ];
  const personA = personById(question.personAId);
  const personB = personById(question.personBId);

  const chips = useMemo(() => {
    const correct = roleChips.find((r) => r.id === question.correctRoleId)!;
    return shuffle([correct, ...getDistractors(question.correctRoleId, 5)]);
  }, [question]);

  const handleChip = (chip: RoleChip) => {
    if (confirmed) return;
    if (chip.id === question.correctRoleId) {
      setSelected(chip.id);
      setWrong(null);
      setConfirmed(true);
      const firstTry = wrong === null;
      if (firstTry) setScore((s) => s + 1);
      setHistory((h) => [...h, firstTry]);
    } else {
      setWrong(chip.id);
      setSelected(null);
    }
  };

  const next = () => {
    if (currentQ + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setWrong(null);
      setConfirmed(false);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setWrong(null);
    setConfirmed(false);
    setScore(0);
    setDone(false);
    setHistory([]);
  };

  const pronoun = personA.gender === 'feminine' ? 'הִיא' : 'הוּא';

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div className="max-w-lg mx-auto">
        <ActivityHeader
          title="Family Tree"
          hebrewTitle="עץ המשפחה"
          emoji="🌳"
          onBack={onBack}
        />

        {/* Family Tree Visual */}
        <FamilyTreeDiagram
          highlightA={question.personAId}
          highlightB={question.personBId}
        />

        {done ? (
          <div
            className="rounded-2xl p-6 text-center mt-4"
            style={{ background: '#dcfce7', border: '1.5px solid #22c55e' }}
          >
            <div className="text-5xl mb-3">🌟</div>
            <div className="hebrew text-3xl font-bold mb-2" style={{ color: '#16a34a' }}>
              סִיַּמְתְּ!
            </div>
            <div className="text-lg font-semibold mb-2" style={{ color: 'var(--ink)' }}>
              {score} / {questions.length} first try
            </div>
            <div className="flex justify-center flex-wrap gap-1.5 mb-4">
              {history.map((ok, i) => (
                <span key={i} className="text-lg">{ok ? '✅' : '🟡'}</span>
              ))}
            </div>
            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: '#22c55e', color: 'white' }}
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="mt-4">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mb-5 justify-center flex-wrap">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentQ ? 20 : 8,
                    height: 8,
                    background: i < history.length
                      ? (history[i] ? '#22c55e' : '#fbbf24')
                      : i === currentQ ? '#86efac' : '#d1d5db',
                  }}
                />
              ))}
            </div>

            {/* Sentence frame */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--muted)' }}>
                Complete the sentence · השלם את המשפט
              </p>

              {/* Two highlighted people */}
              <div className="flex items-center gap-3 justify-center mb-4">
                <PersonPill person={personA} highlight="green" />
                <span className="text-sm" style={{ color: 'var(--muted)' }}>→</span>
                <PersonPill person={personB} highlight="blue" />
              </div>

              {/* Sentence with blank */}
              <div
                className="hebrew text-2xl font-bold text-center rounded-xl py-3 px-4"
                style={{ background: 'white', border: '1.5px solid #bbf7d0', direction: 'rtl' }}
              >
                <span style={{ color: '#16a34a' }}>{personA.firstNameNikud}</span>
                {' '}
                <span style={{ color: 'var(--ink)' }}>{pronoun}</span>
                {' '}

                {confirmed ? (
                  <span
                    className="px-2 py-0.5 rounded-lg"
                    style={{ background: '#bbf7d0', color: '#15803d' }}
                  >
                    {roleChips.find(r => r.id === question.correctRoleId)!.nikudDef}
                  </span>
                ) : wrong ? (
                  <>
                    <span
                      className="px-2 py-0.5 rounded-lg line-through"
                      style={{ background: '#fee2e2', color: '#dc2626' }}
                    >
                      {roleChips.find(r => r.id === wrong)!.nikudDef}
                    </span>
                    <span style={{ color: '#d1d5db' }}> ______</span>
                  </>
                ) : (
                  <span style={{ color: '#d1d5db' }}>______</span>
                )}

                {' '}
                <span style={{ color: 'var(--ink)' }}>שֶׁל</span>
                {' '}
                <span style={{ color: '#2563eb' }}>{personB.firstNameNikud}</span>
                <span style={{ color: 'var(--ink)' }}>.</span>
              </div>

              {wrong && !confirmed && (
                <p className="text-center text-sm mt-2" style={{ color: '#dc2626' }}>
                  לא נכון — Try again!
                </p>
              )}
            </div>

            {/* Role chips */}
            {!confirmed && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {chips.map((chip) => {
                  const isWrong = wrong === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => handleChip(chip)}
                      className="transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        padding: '8px 16px',
                        borderRadius: 12,
                        border: `1.5px solid ${isWrong ? '#f87171' : '#bbf7d0'}`,
                        background: isWrong ? '#fee2e2' : 'white',
                    fontFamily: "'Frank Ruhl Libre', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: isWrong ? '#dc2626' : 'var(--ink)',
                    direction: 'rtl',
                    cursor: 'pointer',
                  }}
                >
                  {chip.nikud}
                      <span style={{ fontSize: 11, fontFamily: 'system-ui', fontWeight: 400, color: '#9ca3af', marginRight: 4 }}>
                        {chip.english}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Confirmed answer */}
            {confirmed && (
              <div
                className="rounded-xl p-4 mb-4 text-center"
                style={{ background: '#dcfce7', border: '1.5px solid #86efac' }}
              >
                <div className="text-2xl mb-1">✅</div>
                <div className="hebrew text-xl font-bold mb-0.5" style={{ color: '#15803d', direction: 'rtl' }}>
                  {question.sentenceNikud}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {question.sentenceEnglish}
                </div>
              </div>
            )}

            {confirmed && (
              <button
                onClick={next}
                className="w-full py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#22c55e', color: 'white' }}
              >
                {currentQ + 1 < questions.length ? 'Next →' : 'See Results'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PersonPill({
  person,
  highlight,
}: {
  person: TreePerson;
  highlight: 'green' | 'blue';
}) {
  const colors = {
    green: { bg: '#dcfce7', border: '#22c55e', text: '#15803d' },
    blue:  { bg: '#dbeafe', border: '#60a5fa', text: '#1d4ed8' },
  }[highlight];

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold"
      style={{ background: colors.bg, border: `1.5px solid ${colors.border}` }}
    >
      <span className="text-xl">{person.emoji}</span>
      <span className="hebrew text-lg" style={{ color: colors.text, direction: 'rtl' }}>
        {person.firstNameNikud}
      </span>
    </div>
  );
}

function TreeNode({
  person,
  highlightA,
  highlightB,
}: {
  person: TreePerson;
  highlightA: string;
  highlightB: string;
}) {
  const isA = person.id === highlightA;
  const isB = person.id === highlightB;
  const border = isA ? '#22c55e' : isB ? '#60a5fa' : '#e7e5e4';
  const bg = isA ? '#dcfce7' : isB ? '#dbeafe' : 'white';

  return (
    <div className="flex flex-col items-center gap-0.5" style={{ minWidth: 52 }}>
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all"
        style={{ background: bg, border: `2px solid ${border}` }}
      >
        {person.emoji}
      </div>
      <span
        className="hebrew text-xs font-bold text-center"
        style={{
          color: isA ? '#15803d' : isB ? '#1d4ed8' : 'var(--ink)',
          direction: 'rtl',
        }}
      >
        {person.firstNameNikud}
      </span>
    </div>
  );
}

function VLine() {
  return <div className="w-px bg-stone-300" style={{ height: 18, margin: '0 auto' }} />;
}

function HConnector({ width }: { width: number }) {
  return <div style={{ width, height: 1, background: '#d1d5db', margin: '0 auto' }} />;
}

function FamilyTreeDiagram({
  highlightA,
  highlightB,
}: {
  highlightA: string;
  highlightB: string;
}) {
  const p = (id: string) => treePeople.find((x) => x.id === id)!;

  return (
    <div
      className="rounded-2xl p-4 overflow-x-auto"
      style={{ background: 'white', border: '1.5px solid #bbf7d0' }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--muted)' }}>
        משפחת לוי
      </p>

      {/* Generation 1 — grandparents centered */}
      <div className="flex justify-center gap-4 mb-0">
        <TreeNode person={p('david')}  highlightA={highlightA} highlightB={highlightB} />
        <div className="flex items-center pt-1">
          <span style={{ color: '#d1d5db', fontSize: 18 }}>+</span>
        </div>
        <TreeNode person={p('rachel')} highlightA={highlightA} highlightB={highlightB} />
      </div>

      {/* Line down to generation 2 */}
      <VLine />

      {/* Horizontal branch spanning both families */}
      <div className="flex justify-center">
        <HConnector width={140} />
      </div>

      {/* Generation 2 — both couples */}
      <div className="flex justify-center gap-2">
        {/* Branch A */}
        <div className="flex flex-col items-center">
          <VLine />
          <div className="flex gap-2 items-center">
            <TreeNode person={p('yossi')} highlightA={highlightA} highlightB={highlightB} />
            <span style={{ color: '#d1d5db', fontSize: 18, paddingBottom: 12 }}>+</span>
            <TreeNode person={p('sara')}  highlightA={highlightA} highlightB={highlightB} />
          </div>
        </div>

        {/* Spacer */}
        <div style={{ width: 32 }} />

        {/* Branch B */}
        <div className="flex flex-col items-center">
          <VLine />
          <div className="flex gap-2 items-center">
            <TreeNode person={p('lea')}   highlightA={highlightA} highlightB={highlightB} />
            <span style={{ color: '#d1d5db', fontSize: 18, paddingBottom: 12 }}>+</span>
            <TreeNode person={p('danny')} highlightA={highlightA} highlightB={highlightB} />
          </div>
        </div>
      </div>

      {/* Lines to generation 3 */}
      <div className="flex justify-center gap-2">
        <div className="flex flex-col items-center" style={{ width: 140 }}>
          <VLine />
          <HConnector width={100} />
          <div className="flex justify-around w-full">
            <VLine />
            <VLine />
          </div>
          <div className="flex gap-4">
            <TreeNode person={p('dana')} highlightA={highlightA} highlightB={highlightB} />
            <TreeNode person={p('omer')} highlightA={highlightA} highlightB={highlightB} />
          </div>
        </div>

        <div style={{ width: 32 }} />

        <div className="flex flex-col items-center" style={{ width: 140 }}>
          <VLine />
          <HConnector width={100} />
          <div className="flex justify-around w-full">
            <VLine />
            <VLine />
          </div>
          <div className="flex gap-4">
            <TreeNode person={p('tom')} highlightA={highlightA} highlightB={highlightB} />
            <TreeNode person={p('mia')} highlightA={highlightA} highlightB={highlightB} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#dcfce7', border: '2px solid #22c55e' }} />
          <span className="text-xs" style={{ color: 'var(--muted)' }}>Person A</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#dbeafe', border: '2px solid #60a5fa' }} />
          <span className="text-xs" style={{ color: 'var(--muted)' }}>Person B</span>
        </div>
      </div>
    </div>
  );
}
