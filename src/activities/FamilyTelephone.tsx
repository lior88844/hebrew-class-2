import { useState, useEffect } from 'react';
import { ActivityHeader } from '../components/ActivityHeader';
import { DeductionTreeCanvas, TreeLegend } from '../components/DeductionTreeCanvas';
import { deductionFamily } from '../data/deductionFamily';
import { telephoneQuestions, MAX_SCORE } from '../data/telephoneQuestions';
import type { TelephoneQuestion } from '../data/telephoneQuestions';

interface Props {
  onBack: () => void;
}

type Phase = 'study' | 'quiz' | 'results';

const STUDY_SECONDS = 30;
const QUESTIONS = telephoneQuestions; // fixed order: easy → medium → hard

// look up emoji for a personId
const emojiMap = Object.fromEntries(deductionFamily.map((p) => [p.id, p.emoji]));

// ─── Level badge ──────────────────────────────────────────────────────────────
function LevelBadge({ level, label }: { level: 1 | 2 | 3; label: string }) {
  const colors = [
    { bg: '#dcfce7', text: '#15803d', border: '#86efac' },  // easy - green
    { bg: '#fef9c3', text: '#92400e', border: '#fde68a' },  // medium - amber
    { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },  // hard - red
  ][level - 1];
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {label}
    </span>
  );
}

// ─── Study Phase ──────────────────────────────────────────────────────────────
function StudyPhase({ onReady }: { onReady: () => void }) {
  const [seconds, setSeconds] = useState(STUDY_SECONDS);

  useEffect(() => {
    if (seconds <= 0) { onReady(); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onReady]);

  const pct = (seconds / STUDY_SECONDS) * 100;
  const urgent = seconds <= 10;

  return (
    <div>
      {/* Timer bar */}
      <div
        className="rounded-2xl p-5 mb-4 text-center"
        style={{
          background: urgent ? '#fef2f2' : '#fffbeb',
          border: `2px solid ${urgent ? '#fca5a5' : '#fde68a'}`,
          transition: 'background 0.5s, border-color 0.5s',
        }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: urgent ? '#dc2626' : '#92400e' }}>
          {urgent ? '⚡ ' : '👀 '}
          זְכֹר אֶת הָעֵץ — Remember the family tree!
        </p>
        <div
          className="text-5xl font-black mb-3 tabular-nums"
          style={{ color: urgent ? '#dc2626' : '#d97706' }}
        >
          {seconds}
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: urgent ? '#ef4444' : '#f59e0b',
            }}
          />
        </div>
        <button
          onClick={onReady}
          className="mt-4 px-6 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{ background: '#f97316', color: 'white' }}
        >
          אֲנִי מוּכָן/מוּכָנָה ← I'm Ready!
        </button>
      </div>

      {/* Read-only family tree */}
      <div
        className="rounded-2xl"
        style={{ background: 'white', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}
      >
        <div style={{ overflowX: 'auto', padding: '8px 4px' }}>
          <DeductionTreeCanvas readonly />
        </div>
        <TreeLegend />
      </div>
    </div>
  );
}

// ─── Quiz Phase ───────────────────────────────────────────────────────────────
interface QuizResult {
  question: TelephoneQuestion;
  correct: boolean;
  firstTry: boolean;
}

function QuizPhase({ onFinish }: { onFinish: (results: QuizResult[]) => void }) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [firstTry, setFirstTry] = useState(true);
  const [results, setResults] = useState<QuizResult[]>([]);

  const question = QUESTIONS[idx];

  const handleChoose = (optionId: string) => {
    if (state === 'correct') return;
    setChosen(optionId);

    if (optionId === question.correctOptionId) {
      setState('correct');
      setResults((r) => [...r, { question, correct: true, firstTry }]);
    } else {
      setFirstTry(false);
      setState('wrong');
      setTimeout(() => {
        setState('idle');
        setChosen(null);
      }, 900);
    }
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS.length) {
      onFinish(results);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      setState('idle');
      setFirstTry(true);
    }
  };

  const score = results.reduce((s, r) => s + (r.firstTry ? r.question.points : 0), 0);
  const currentLevel = question.level;

  const optionStyle = (optId: string): React.CSSProperties => {
    const isChosen = optId === chosen;
    const isCorrect = optId === question.correctOptionId;
    if (state === 'correct' && isCorrect) {
      return { background: '#dcfce7', border: '2px solid #22c55e', color: '#15803d', transform: 'scale(1.04)' };
    }
    if (state === 'wrong' && isChosen) {
      return { background: '#fee2e2', border: '2px solid #ef4444', color: '#991b1b', transform: 'scale(0.97)' };
    }
    return {
      background: 'white',
      border: '1.5px solid #e5e7eb',
      color: 'var(--ink)',
    };
  };

  return (
    <div>
      {/* Score + progress bar */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm font-semibold" style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          {idx + 1} / {QUESTIONS.length}
        </span>
        <div className="flex gap-1 flex-1">
          {QUESTIONS.map((_, i) => {
            const r = results[i];
            let bg = '#e5e7eb';
            if (r) bg = r.firstTry ? '#22c55e' : '#fbbf24';
            else if (i === idx) bg = '#f97316';
            return (
              <div key={i} className="rounded-full transition-all" style={{ height: 8, flex: 1, background: bg }} />
            );
          })}
        </div>
        <span className="text-sm font-bold" style={{ color: '#16a34a', whiteSpace: 'nowrap' }}>
          ✓ {score} pts
        </span>
      </div>

      {/* Level indicator */}
      <div className="flex items-center gap-2 mb-3">
        <LevelBadge level={currentLevel} label={question.levelLabel} />
        <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
          {currentLevel === 1 ? 'Easy' : currentLevel === 2 ? 'Medium' : 'Hard'} · {question.points} {question.points === 1 ? 'point' : 'points'}
        </span>
      </div>

      {/* Question card */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{ background: '#fffbeb', border: '2px solid #f59e0b' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#92400e' }}>
          📞 ענִי עַל הַשְּׁאֵלָה — Answer the question
        </p>
        <p
          className="hebrew text-2xl font-bold text-center mb-2"
          style={{ direction: 'rtl', color: 'var(--ink)', lineHeight: 1.7 }}
        >
          {question.questionHebrew}
        </p>
        <p className="text-sm text-center" style={{ color: 'var(--muted)' }}>
          {question.questionEnglish}
        </p>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleChoose(opt.id)}
            disabled={state === 'correct'}
            className="flex flex-col items-center gap-1 p-4 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-default"
            style={optionStyle(opt.id)}
          >
            {opt.personId && (
              <span className="text-3xl">{emojiMap[opt.personId] ?? '👤'}</span>
            )}
            <span
              className="hebrew text-xl font-bold"
              dir="rtl"
              style={{ color: 'inherit' }}
            >
              {opt.labelHebrew}
            </span>
            <span className="text-xs" style={{ color: 'inherit', opacity: 0.75 }}>
              {opt.labelEnglish}
            </span>
            {state === 'correct' && opt.id === question.correctOptionId && (
              <span className="text-lg">✅</span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {state === 'correct' && (
        <div
          className="rounded-xl p-4 mb-4 text-center"
          style={{ background: '#dcfce7', border: '1.5px solid #86efac' }}
        >
          <p className="hebrew text-xl font-bold" style={{ direction: 'rtl', color: '#15803d' }}>
            {firstTry ? '🎉 נָכוֹן מְאוֹד!' : '✅ נָכוֹן!'}
          </p>
          {firstTry && (
            <p className="text-sm mt-1" style={{ color: '#166534' }}>
              +{question.points} {question.points === 1 ? 'point' : 'points'}
            </p>
          )}
          {!firstTry && (
            <p className="text-sm mt-1" style={{ color: '#166534' }}>
              No points for retries — but well done for getting it!
            </p>
          )}
        </div>
      )}

      {state === 'wrong' && (
        <div
          className="rounded-xl p-3 mb-4 text-center"
          style={{ background: '#fee2e2', border: '1.5px solid #fca5a5' }}
        >
          <p className="hebrew text-lg font-bold" style={{ direction: 'rtl', color: '#dc2626' }}>
            נַסִּי שׁוּב! 💪 Try again!
          </p>
        </div>
      )}

      {/* Next button */}
      {state === 'correct' && (
        <button
          onClick={next}
          className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: '#22c55e', fontSize: 16 }}
        >
          {idx + 1 < QUESTIONS.length ? 'שְׁאֵלָה הַבָּאָה ←' : 'רְאִי תוֹצָאוֹת 🏁'}
        </button>
      )}
    </div>
  );
}

// ─── Results Phase ────────────────────────────────────────────────────────────
function ResultsPhase({
  results,
  onReplay,
  onBack,
}: {
  results: QuizResult[];
  onReplay: () => void;
  onBack: () => void;
}) {
  const score = results.reduce((s, r) => s + (r.firstTry ? r.question.points : 0), 0);
  const pct = Math.round((score / MAX_SCORE) * 100);

  const byLevel = [1, 2, 3].map((lvl) => {
    const qs = results.filter((r) => r.question.level === lvl);
    const pts = qs.reduce((s, r) => s + (r.firstTry ? r.question.points : 0), 0);
    const maxPts = qs.reduce((s, r) => s + r.question.points, 0);
    return { lvl: lvl as 1 | 2 | 3, label: qs[0]?.question.levelLabel ?? '', pts, maxPts, count: qs.length };
  });

  const emoji = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 40 ? '💪' : '📞';
  const message = pct === 100 ? 'מַעֲלָה! מוֹשׁלָם!' : pct >= 70 ? 'כׇּל הַכָּבוֹד!' : pct >= 40 ? 'יָפֶה! נַסִּי עוֹד פַּעַם!' : 'תַּמְשִׁיכִי לְהִתְאַמֵּן!';

  return (
    <div>
      {/* Score card */}
      <div
        className="rounded-3xl p-8 text-center mb-6"
        style={{ background: '#dcfce7', border: '2px solid #86efac' }}
      >
        <div className="text-6xl mb-3">{emoji}</div>
        <div className="hebrew text-3xl font-black mb-1" dir="rtl" style={{ color: '#15803d' }}>
          {message}
        </div>
        <div className="text-5xl font-black my-3" style={{ color: 'var(--ink)' }}>
          {score} <span className="text-2xl font-semibold" style={{ color: 'var(--muted)' }}>/ {MAX_SCORE}</span>
        </div>
        <div className="text-lg font-bold" style={{ color: '#15803d' }}>{pct}%</div>
      </div>

      {/* Per-level breakdown */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1.5px solid #e5e7eb' }}>
        {byLevel.map(({ lvl, label, pts, maxPts, count }) => (
          <div
            key={lvl}
            className="flex items-center gap-4 px-5 py-3"
            style={{ borderBottom: lvl < 3 ? '1px solid #f3f4f6' : 'none', background: 'white' }}
          >
            <LevelBadge level={lvl} label={label} />
            <div className="flex-1">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${maxPts > 0 ? (pts / maxPts) * 100 : 0}%`,
                    background: lvl === 1 ? '#22c55e' : lvl === 2 ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
            </div>
            <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--ink)', whiteSpace: 'nowrap' }}>
              {pts} / {maxPts} pts
            </span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{count} Qs</span>
          </div>
        ))}
      </div>

      {/* Per-question recap */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1.5px solid #e5e7eb' }}>
        {results.map((r, i) => (
          <div
            key={r.question.id}
            className="flex items-start gap-3 px-4 py-3"
            style={{
              borderBottom: i < results.length - 1 ? '1px solid #f3f4f6' : 'none',
              background: r.firstTry ? '#f0fdf4' : '#fffbeb',
            }}
          >
            <span className="text-lg mt-0.5">{r.firstTry ? '✅' : '🟡'}</span>
            <div className="flex-1 min-w-0">
              <p
                className="hebrew text-sm font-semibold truncate"
                dir="rtl"
                style={{ color: 'var(--ink)' }}
              >
                {r.question.questionHebrew}
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                {r.question.questionEnglish}
              </p>
            </div>
            <span className="text-xs font-bold whitespace-nowrap" style={{ color: r.firstTry ? '#15803d' : '#d97706' }}>
              {r.firstTry ? `+${r.question.points}` : '+0'}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-center mb-5" style={{ color: 'var(--muted)' }}>
        ✅ first try (full points) · 🟡 needed retries (no points)
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
          style={{ background: 'white', border: '1.5px solid #e5e7eb', color: 'var(--ink)' }}
        >
          ← Back
        </button>
        <button
          onClick={onReplay}
          className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02]"
          style={{ background: '#f97316' }}
        >
          שַׂחֵק שׁוּב 🔄
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function FamilyTelephone({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('study');
  const [results, setResults] = useState<QuizResult[]>([]);

  const restart = () => {
    setResults([]);
    setPhase('study');
  };

  const phaseLabel =
    phase === 'study' ? 'שְׁלַב 1: לִמּוּד' :
    phase === 'quiz'  ? 'שְׁלַב 2: שְׁאֵלוֹת' :
                        'תּוֹצָאוֹת';

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <ActivityHeader
          title="Family Telephone"
          hebrewTitle="טֶלֶפוֹן מִשְׁפָּחָה"
          emoji="📞"
          onBack={onBack}
        />

        {/* Phase indicator */}
        <div className="flex gap-2 justify-center mb-6">
          {(['study', 'quiz', 'results'] as Phase[]).map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              {i > 0 && <div className="w-6 h-px" style={{ background: '#e5e7eb' }} />}
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: phase === p ? '#f97316' : phase === 'results' || (phase === 'quiz' && p === 'study') ? '#dcfce7' : '#f3f4f6',
                  color: phase === p ? 'white' : 'var(--muted)',
                }}
              >
                {i === 0 ? '👀' : i === 1 ? '❓' : '🏁'} {p === 'study' ? 'Study' : p === 'quiz' ? 'Quiz' : 'Results'}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mb-4" style={{ color: 'var(--muted)' }}>{phaseLabel}</p>

        {phase === 'study' && (
          <StudyPhase onReady={() => setPhase('quiz')} />
        )}

        {phase === 'quiz' && (
          <QuizPhase onFinish={(r) => { setResults(r); setPhase('results'); }} />
        )}

        {phase === 'results' && (
          <ResultsPhase results={results} onReplay={restart} onBack={onBack} />
        )}
      </div>
    </div>
  );
}
