import { useState, useMemo } from 'react';
import { deductionClues } from '../data/deductionFamily';
import type { DeductionPerson } from '../data/deductionFamily';
import { ActivityHeader } from '../components/ActivityHeader';
import { DeductionTreeCanvas, TreeLegend } from '../components/DeductionTreeCanvas';

interface Props {
  onBack: () => void;
}

function shuffle<T>(a: T[]): T[] {
  return [...a].sort(() => Math.random() - 0.5);
}

const CLUES_PER_GAME = 12;


// ─── Main component ───────────────────────────────────────────────────────────

function getProgressDotColor(i: number, idx: number, history: boolean[]): string {
  if (i < history.length) return history[i] ? '#22c55e' : '#fbbf24';
  if (i === idx) return '#f59e0b';
  return '#e5e7eb';
}

export function FamilyDeduction({ onBack }: Props) {
  const clues = useMemo(
    () => shuffle(deductionClues).slice(0, CLUES_PER_GAME),
    [],
  );

  const [idx, setIdx] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [firstTry, setFirstTry] = useState(true);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const clue = clues[idx];

  const handleSelect = (person: DeductionPerson) => {
    if (result === 'correct') return;

    setSelectedId(person.id);

    if (person.id === clue.answerId) {
      setResult('correct');
      if (firstTry) setScore(s => s + 1);
      setHistory(h => [...h, firstTry]);
    } else {
      setFirstTry(false);
      setResult('wrong');
      setTimeout(() => {
        setResult(null);
        setSelectedId(null);
      }, 1000);
    }
  };

  const next = () => {
    if (idx + 1 >= clues.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelectedId(null);
      setResult(null);
      setShowHint(false);
      setFirstTry(true);
    }
  };

  const reset = () => {
    setIdx(0);
    setSelectedId(null);
    setResult(null);
    setShowHint(false);
    setScore(0);
    setFirstTry(true);
    setDone(false);
    setHistory([]);
  };

  // ── Done screen ─────────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((score / CLUES_PER_GAME) * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : '💪';
    return (
      <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
        <div className="max-w-lg mx-auto">
          <ActivityHeader title="Family Mystery" hebrewTitle="מִשְׂחַק הַנִּיחוּשׁ" emoji="🕵️" onBack={onBack} />
          <div className="rounded-2xl p-8 text-center" style={{ background: '#dcfce7', border: '1.5px solid #22c55e' }}>
            <div className="text-6xl mb-3">{emoji}</div>
            <div className="hebrew text-3xl font-bold mb-1" style={{ color: '#15803d', direction: 'rtl' }}>
              סִיַּמְתְּ!
            </div>
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
              {score} / {CLUES_PER_GAME}
            </div>
            <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
              {history.map((ok, i) => (
                <span key={i} className="text-lg">{ok ? '✅' : '🟡'}</span>
              ))}
            </div>
            <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
              ✅ first try · 🟡 needed hints/retries
            </p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{ background: '#22c55e', fontSize: 16 }}
            >
              שַׂחֵק שׁוּב
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Game screen ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <ActivityHeader title="Family Mystery" hebrewTitle="מִשְׂחַק הַנִּיחוּשׁ" emoji="🕵️" onBack={onBack} />

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-semibold" style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>
            {idx + 1} / {CLUES_PER_GAME}
          </span>
          <div className="flex gap-1 flex-1 flex-wrap">
            {clues.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  height: 8,
                  flex: 1,
                  minWidth: 10,
                  background: getProgressDotColor(i, idx, history),
                }}
              />
            ))}
          </div>
          <span className="text-sm font-bold" style={{ color: '#16a34a', whiteSpace: 'nowrap' }}>
            ✓ {score}
          </span>
        </div>

        {/* Clue card */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: '#fffbeb', border: '2px solid #f59e0b' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#92400e' }}>
            🕵️ מְצָא/י אֶת הָאָדָם הַנָּכוֹן — Click the right person
          </p>
          <p
            className="hebrew text-2xl font-bold text-center mb-4"
            style={{ direction: 'rtl', color: 'var(--ink)', lineHeight: 1.7 }}
          >
            {clue.clue}
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setShowHint(h => !h)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: showHint ? '#fef3c7' : 'white',
                border: '1.5px solid #f59e0b',
                color: '#d97706',
              }}
            >
              💡 {showHint ? 'הַסְתֵּר רֶמֶז' : 'רֶמֶז'}
            </button>
          </div>

          {showHint && (
            <p
              className="hebrew text-base text-center mt-3"
              style={{ direction: 'rtl', color: '#92400e', lineHeight: 1.8 }}
            >
              {clue.hint}
            </p>
          )}
        </div>

        {/* Family tree (scrollable on mobile) */}
        <div
          className="rounded-2xl mb-4"
          style={{ background: 'white', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}
        >
          <div style={{ overflowX: 'auto', padding: '8px 4px' }}>
            <DeductionTreeCanvas
              selectedId={selectedId}
              answerId={result === 'correct' ? clue.answerId : null}
              wrongId={result === 'wrong' ? selectedId : null}
              onSelect={handleSelect}
            />
          </div>
          <TreeLegend />
        </div>

        {/* Feedback */}
        {result === 'correct' && (
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: '#dcfce7', border: '1.5px solid #86efac' }}
          >
            <p
              className="hebrew text-xl font-bold text-center mb-2"
              style={{ direction: 'rtl', color: '#15803d' }}
            >
              נָכוֹן מְאוֹד! 🎉
            </p>
            <p
              className="hebrew text-base text-center"
              style={{ direction: 'rtl', color: '#166534', lineHeight: 2 }}
            >
              {clue.pathNikud}
            </p>
          </div>
        )}

        {result === 'wrong' && (
          <div
            className="rounded-xl p-3 mb-4 text-center"
            style={{ background: '#fee2e2', border: '1.5px solid #fca5a5' }}
          >
            <p className="hebrew text-lg font-bold" style={{ direction: 'rtl', color: '#dc2626' }}>
              כִּמְעַט! נַסִּי שׁוּב 💪
            </p>
          </div>
        )}

        {/* Next button */}
        {result === 'correct' && (
          <button
            onClick={next}
            className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: '#22c55e', fontSize: 16 }}
          >
            {idx + 1 < clues.length ? 'שְׁאֵלָה הַבָּאָה ←' : 'רְאִי תוֹצָאוֹת'}
          </button>
        )}
      </div>
    </div>
  );
}

