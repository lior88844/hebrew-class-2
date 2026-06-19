import { useState, useRef, useMemo } from 'react';
import { ActivityHeader } from '../components/ActivityHeader';
import { deductionFamily } from '../data/deductionFamily';
import {
  puzzleSlots, puzzleClues, svgLines,
  SLOT_W, SLOT_H, CANVAS_W, CANVAS_H, HALF_W, HALF_H,
} from '../data/treePuzzle';

interface Props {
  onBack: () => void;
}

// ── People included in this puzzle (core family only, no extended relatives) ──
const PUZZLE_IDS = [
  'david_sr', 'rachel_sr',
  'yael', 'dani', 'michal', 'eitan', 'uri', 'noa',
  'tamar', 'omer', 'roni', 'gai', 'maya', 'eitamar',
];

const peopleMap = Object.fromEntries(
  deductionFamily
    .filter((p) => PUZZLE_IDS.includes(p.id))
    .map((p) => [p.id, p]),
);

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Slot background/border colours ───────────────────────────────────────────
function slotStyle(opts: {
  isLocked: boolean;
  isTarget: boolean;
  isWrong: boolean;
  isCorrectFlash: boolean;
}): React.CSSProperties {
  const { isLocked, isTarget, isWrong, isCorrectFlash } = opts;
  if (isLocked) {
    return {
      background: '#f0fdf4',
      border: '2px solid #22c55e',
      boxShadow: isCorrectFlash ? '0 0 0 5px #86efac' : 'none',
    };
  }
  if (isWrong) {
    return { background: '#fff1f2', border: '2px dashed #f43f5e', boxShadow: 'none' };
  }
  if (isTarget) {
    return { background: '#fff7ed', border: '2px dashed #f97316', boxShadow: '0 0 0 3px #fed7aa' };
  }
  return { background: '#f9fafb', border: '2px dashed #d1d5db', boxShadow: 'none' };
}

// ── Main component ────────────────────────────────────────────────────────────
export function TreePuzzle({ onBack }: Props) {
  // slotId → personId (only correct placements get locked)
  const [locked, setLocked] = useState<Record<string, string>>({});
  // personId of the currently selected bank card (click-based)
  const [selected, setSelected] = useState<string | null>(null);
  // animation triggers
  const [wrongSlot,   setWrongSlot]   = useState<string | null>(null);
  const [correctSlot, setCorrectSlot] = useState<string | null>(null);
  // hint reveal level
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);

  // Ref used by drag-and-drop so the personId survives across event handlers
  const dragPersonRef = useRef<string | null>(null);

  // Shuffle cards once on mount
  const shuffledIds = useMemo(() => shuffle(PUZZLE_IDS), []);

  const lockedPersonIds = new Set(Object.values(locked));
  const availableIds    = shuffledIds.filter((id) => !lockedPersonIds.has(id));
  const lockedCount     = Object.keys(locked).length;
  const isDone          = lockedCount === PUZZLE_IDS.length;
  const visibleClues    = puzzleClues.filter((c) => c.hintLevel <= hintLevel);

  // ── Core placement logic ──────────────────────────────────────────────────
  const placeCard = (personId: string, slotId: string) => {
    if (!personId || locked[slotId]) return;
    const slot = puzzleSlots.find((s) => s.id === slotId);
    if (!slot) return;

    if (personId === slot.correctPersonId) {
      setLocked((l) => ({ ...l, [slotId]: personId }));
      setCorrectSlot(slotId);
      setTimeout(() => setCorrectSlot(null), 700);
    } else {
      setWrongSlot(slotId);
      setTimeout(() => setWrongSlot(null), 550);
    }
    setSelected(null);
  };

  // ── Drag handlers (desktop) ───────────────────────────────────────────────
  const handleDragStart = (personId: string) => {
    dragPersonRef.current = personId;
    setSelected(personId);
  };

  const handleDragEnd = () => {
    dragPersonRef.current = null;
    // If dropped outside a slot, deselect
    setTimeout(() => setSelected(null), 50);
  };

  const handleSlotDrop = (slotId: string, e: React.DragEvent) => {
    e.preventDefault();
    const pid = dragPersonRef.current;
    if (pid) placeCard(pid, slotId);
    dragPersonRef.current = null;
  };

  // ── Click handlers (mobile-friendly) ─────────────────────────────────────
  const handleCardClick = (personId: string) => {
    setSelected((prev) => (prev === personId ? null : personId));
  };

  const handleSlotClick = (slotId: string) => {
    if (locked[slotId]) return;
    if (selected) placeCard(selected, slotId);
  };

  const reset = () => {
    setLocked({});
    setSelected(null);
    setHintLevel(0);
    setWrongSlot(null);
    setCorrectSlot(null);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>

      {/* CSS keyframe animations */}
      <style>{`
        @keyframes puzzleShake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-9px); }
          45%      { transform: translateX(9px); }
          65%      { transform: translateX(-5px); }
          82%      { transform: translateX(5px); }
        }
        @keyframes puzzlePop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.16); }
          100% { transform: scale(1); }
        }
        .slot-shake { animation: puzzleShake 0.5s ease-in-out; }
        .slot-pop   { animation: puzzlePop   0.45s ease-out; }
      `}</style>

      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        <ActivityHeader
          title="Build the Family Tree"
          hebrewTitle="בְּנֵה אֶת עֵץ הַמִּשְׁפָּחָה"
          emoji="🧩"
          onBack={onBack}
        />

        {/* ── Progress bar ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(lockedCount / PUZZLE_IDS.length) * 100}%`,
                background: '#22c55e',
              }}
            />
          </div>
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: isDone ? '#16a34a' : 'var(--muted)', whiteSpace: 'nowrap' }}
          >
            {lockedCount} / {PUZZLE_IDS.length} placed
          </span>
        </div>

        {/* ── Clues panel ───────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ background: '#fffbeb', border: '2px solid #fde68a' }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: '#92400e' }}>
              💡 רְמָזִים — Clues
            </p>
            <div className="flex gap-2">
              {hintLevel < 1 && (
                <button
                  onClick={() => setHintLevel(1)}
                  className="text-xs font-bold px-3 py-1 rounded-lg transition-all hover:scale-105"
                  style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' }}
                >
                  +4 more hints
                </button>
              )}
              {hintLevel === 1 && (
                <button
                  onClick={() => setHintLevel(2)}
                  className="text-xs font-bold px-3 py-1 rounded-lg transition-all hover:scale-105"
                  style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }}
                >
                  +4 final hints
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleClues.map((clue) => (
              <div
                key={clue.id}
                className="rounded-xl px-3 py-2"
                style={{
                  background:
                    clue.hintLevel === 0 ? 'white' :
                    clue.hintLevel === 1 ? '#fef9c3' : '#fff1f2',
                  border: `1px solid ${
                    clue.hintLevel === 0 ? '#e5e7eb' :
                    clue.hintLevel === 1 ? '#fde68a' : '#fecaca'
                  }`,
                  flex: '1 1 200px',
                  minWidth: 190,
                  maxWidth: 280,
                }}
              >
                <p className="hebrew text-sm font-semibold" dir="rtl" style={{ color: 'var(--ink)' }}>
                  {clue.textHebrew}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  {clue.textEnglish}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Selected-card banner ───────────────────────────────────────── */}
        <div
          className="rounded-xl px-4 py-2 mb-3 text-center transition-all duration-200"
          style={{
            background: selected ? '#fff7ed' : 'transparent',
            border: `1.5px solid ${selected ? '#f97316' : 'transparent'}`,
            minHeight: 38,
          }}
        >
          {selected ? (
            <p className="text-sm font-semibold" style={{ color: '#c2410c' }}>
              <span className="text-lg mr-2">{peopleMap[selected]?.emoji}</span>
              <span className="hebrew font-bold" dir="rtl">{peopleMap[selected]?.nameNikud}</span>
              {' '}selected — click an empty slot to place  ·{' '}
              <button
                onClick={() => setSelected(null)}
                className="underline text-xs"
                style={{ color: '#9a3412' }}
              >
                cancel
              </button>
            </p>
          ) : (
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Click a card below (or drag it) then click an empty slot in the tree
            </p>
          )}
        </div>

        {/* ── Tree canvas ───────────────────────────────────────────────── */}
        <div
          className="rounded-2xl mb-4"
          style={{ background: 'white', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}
        >
          <div style={{ overflowX: 'auto', padding: '12px 8px' }}>
            <div style={{ position: 'relative', width: CANVAS_W, height: CANVAS_H }}>

              {/* SVG connection lines */}
              <svg
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
              >
                {svgLines.coupleLines.map((l, i) => (
                  <line key={`c${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                ))}
                {svgLines.parentLines.map((l, i) => (
                  <line key={`p${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                ))}
                {/* Generation labels */}
                <text x={16} y={55 + 5}  textAnchor="start" style={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'system-ui', fontWeight: 600 }}>Gen 1</text>
                <text x={16} y={205 + 5} textAnchor="start" style={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'system-ui', fontWeight: 600 }}>Gen 2</text>
                <text x={16} y={390 + 5} textAnchor="start" style={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'system-ui', fontWeight: 600 }}>Gen 3</text>
              </svg>

              {/* Slots */}
              {puzzleSlots.map((slot) => {
                const lockedPerson  = locked[slot.id] ? peopleMap[locked[slot.id]] : null;
                const isLocked      = !!lockedPerson;
                const isWrong       = wrongSlot   === slot.id;
                const isCorrectFlash = correctSlot === slot.id;
                const isTarget      = !!selected && !isLocked;

                return (
                  <div
                    key={slot.id}
                    className={isWrong ? 'slot-shake' : isCorrectFlash ? 'slot-pop' : ''}
                    onDragOver={(e) => { if (!isLocked) e.preventDefault(); }}
                    onDrop={(e) => handleSlotDrop(slot.id, e)}
                    onClick={() => handleSlotClick(slot.id)}
                    style={{
                      position: 'absolute',
                      left: slot.x - HALF_W,
                      top:  slot.y - HALF_H,
                      width:  SLOT_W,
                      height: SLOT_H,
                      borderRadius: 14,
                      cursor: isLocked ? 'default' : selected ? 'cell' : 'default',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      transition: 'box-shadow 0.2s, background 0.2s',
                      ...slotStyle({ isLocked, isTarget, isWrong, isCorrectFlash }),
                    }}
                  >
                    {lockedPerson ? (
                      <>
                        <span style={{ fontSize: 24, lineHeight: 1 }}>{lockedPerson.emoji}</span>
                        <span style={{
                          fontSize: lockedPerson.nameNikud.length > 5 ? 10 : 12,
                          fontWeight: 700,
                          fontFamily: "'Frank Ruhl Libre', serif",
                          direction: 'rtl',
                          color: '#15803d',
                          textAlign: 'center',
                          lineHeight: 1.2,
                          padding: '0 3px',
                        }}>
                          {lockedPerson.nameNikud}
                        </span>
                        {/* Lock badge */}
                        <span style={{
                          position: 'absolute', top: -9, right: -9,
                          fontSize: 14, lineHeight: 1,
                          background: 'white', borderRadius: '50%', padding: 1,
                        }}>
                          🔒
                        </span>
                      </>
                    ) : (
                      /* Empty slot — show a ghost silhouette */
                      <span style={{ fontSize: 28, opacity: 0.18 }}>👤</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Card bank ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-4"
          style={{ background: 'white', border: '1.5px solid #e5e7eb' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--muted)' }}>
            🃏 Cards — drag to a slot, or click then click a slot
          </p>

          {availableIds.length === 0 ? (
            <p className="text-center text-sm font-semibold py-2" style={{ color: '#16a34a' }}>
              🎉 All cards have been placed!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {availableIds.map((personId) => {
                const person = peopleMap[personId];
                if (!person) return null;
                const isSelected = selected === personId;

                return (
                  <div
                    key={personId}
                    draggable
                    onDragStart={() => handleDragStart(personId)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleCardClick(personId)}
                    className="flex flex-col items-center gap-1 rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-150 select-none"
                    style={{
                      padding: '8px 10px',
                      minWidth: 72,
                      background: isSelected ? '#fff7ed' : 'white',
                      border:  `2px solid ${isSelected ? '#f97316' : '#e5e7eb'}`,
                      boxShadow: isSelected
                        ? '0 0 0 3px #fed7aa, 0 2px 8px rgba(249,115,22,0.2)'
                        : '0 1px 4px rgba(0,0,0,0.07)',
                      transform: isSelected ? 'translateY(-3px)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 26, lineHeight: 1 }}>{person.emoji}</span>
                    <span style={{
                      fontSize: person.nameNikud.length > 5 ? 10 : 12,
                      fontWeight: 700,
                      fontFamily: "'Frank Ruhl Libre', serif",
                      direction: 'rtl',
                      color: isSelected ? '#c2410c' : 'var(--ink)',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}>
                      {person.nameNikud}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Reset button ───────────────────────────────────────────────── */}
        {lockedCount > 0 && !isDone && (
          <div className="flex justify-center mt-4">
            <button
              onClick={reset}
              className="text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{ background: 'white', border: '1px solid #e5e7eb', color: 'var(--muted)' }}
            >
              🔄 Start over
            </button>
          </div>
        )}
      </div>

      {/* ── Done overlay ──────────────────────────────────────────────────── */}
      {isDone && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
        >
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background: 'white',
              maxWidth: 400,
              width: '100%',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            }}
          >
            <div className="text-7xl mb-4">🏆</div>
            <p className="hebrew text-3xl font-black mb-1" dir="rtl" style={{ color: '#15803d' }}>
              כׇּל הַכָּבוֹד!
            </p>
            <p className="text-xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
              You built the whole family tree!
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              All 14 family members are in the right place.
            </p>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#f3f4f6', color: 'var(--ink)' }}
              >
                שַׂחֵק שׁוּב 🔄
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: '#22c55e' }}
              >
                Done ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
