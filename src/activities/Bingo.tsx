import { useState, useCallback } from 'react';
import { familyMembers } from '../data/family';
import { ActivityHeader } from '../components/ActivityHeader';
import type { FamilyMember } from '../types';

interface Props {
  onBack: () => void;
}

function buildBoard(): FamilyMember[] {
  const shuffled = [...familyMembers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 9);
}

function checkWin(marked: Set<string>, board: FamilyMember[]): boolean {
  const grid = board.map((m) => marked.has(m.id));

  const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];
  return patterns.some((p) => p.every((i) => grid[i]));
}

export function Bingo({ onBack }: Props) {
  const [board, setBoard] = useState<FamilyMember[]>(() => buildBoard());
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [called, setCalled] = useState<FamilyMember[]>([]);
  const [won, setWon] = useState(false);
  const [mode, setMode] = useState<'student' | 'teacher'>('teacher');

  const callWord = useCallback(() => {
    const uncalled = familyMembers.filter((m) => !called.some((c) => c.id === m.id));
    if (uncalled.length === 0) return;
    const word = uncalled[Math.floor(Math.random() * uncalled.length)];
    setCalled((c) => [...c, word]);
  }, [called]);

  const markCell = (member: FamilyMember) => {
    if (won) return;
    const isCurrentlyCalled = called.some((c) => c.id === member.id);
    if (mode === 'student' && !isCurrentlyCalled) return;

    const newMarked = new Set(marked);
    if (newMarked.has(member.id)) {
      newMarked.delete(member.id);
    } else {
      newMarked.add(member.id);
    }
    setMarked(newMarked);
    if (checkWin(newMarked, board)) setWon(true);
  };

  const reset = () => {
    setBoard(buildBoard());
    setMarked(new Set());
    setCalled([]);
    setWon(false);
  };

  const lastCalled = called[called.length - 1];

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div className="max-w-lg mx-auto">
        <ActivityHeader
          title="Bingo"
          hebrewTitle="בינגו"
          emoji="🎯"
          onBack={onBack}
        />

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-stone-200 w-fit mx-auto">
          {(['teacher', 'student'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: mode === m ? 'white' : 'transparent',
                color: mode === m ? 'var(--ink)' : 'var(--muted)',
                boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {m === 'teacher' ? '👩‍🏫 Teacher calls' : '🎓 Student marks'}
            </button>
          ))}
        </div>

        {/* Win banner */}
        {won && (
          <div
            className="rounded-2xl p-5 mb-5 text-center"
            style={{ background: '#ede9fe', border: '1.5px solid #8b5cf6' }}
          >
            <div className="text-4xl mb-2">🎉</div>
            <div className="hebrew text-3xl font-bold mb-1" style={{ color: '#7c3aed' }}>בינגו!</div>
            <div className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
              You got a line!
            </div>
            <button
              onClick={reset}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: '#8b5cf6', color: 'white' }}
            >
              New Board
            </button>
          </div>
        )}

        {/* Called word display */}
        {mode === 'teacher' && (
          <div className="mb-5">
            {lastCalled ? (
              <div
                className="rounded-2xl p-4 text-center mb-3"
                style={{ background: '#ede9fe', border: '1.5px solid #c4b5fd' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                  Now calling
                </p>
                <div className="text-4xl mb-1">{lastCalled.emoji}</div>
                <div className="hebrew text-4xl font-bold" style={{ color: '#7c3aed' }}>
                  {lastCalled.hebrewNikud}
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                  {lastCalled.english}
                </div>
              </div>
            ) : (
              <div
                className="rounded-2xl p-4 text-center mb-3"
                style={{ background: 'white', border: '1.5px solid #e5e7eb' }}
              >
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Press "Call Word" to start
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={callWord}
                disabled={called.length >= familyMembers.length}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                style={{ background: '#8b5cf6', color: 'white' }}
              >
                Call Word ({called.length}/{familyMembers.length})
              </button>
              <button
                onClick={reset}
                className="px-4 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'white', border: '1.5px solid #e5e7eb', color: 'var(--muted)' }}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {mode === 'student' && (
          <div className="mb-4">
            <p className="text-sm text-center" style={{ color: 'var(--muted)' }}>
              The teacher says a word — tap it on your board!
            </p>
            {called.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {called.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm"
                    style={{ background: '#ede9fe', color: '#7c3aed' }}
                  >
                    <span>{c.emoji}</span>
                    <span className="hebrew font-semibold">{c.hebrewNikud}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3x3 Bingo board */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((member) => {
            const isMarked = marked.has(member.id);
            const isCalled = called.some((c) => c.id === member.id);
            const isLast = lastCalled?.id === member.id;

            return (
              <button
                key={member.id}
                onClick={() => markCell(member)}
                className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: isMarked ? '#ede9fe' : isLast ? '#f5f3ff' : 'white',
                  border: `1.5px solid ${isMarked ? '#8b5cf6' : isLast ? '#c4b5fd' : '#e5e7eb'}`,
                  opacity: mode === 'student' && !isCalled && !isMarked ? 0.7 : 1,
                }}
              >
                {isMarked ? (
                  <>
                    <div className="text-2xl">⭐</div>
                    <div className="hebrew text-sm font-bold" style={{ color: '#7c3aed' }}>
                      {member.hebrewNikud}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl">{member.emoji}</div>
                    <div className="hebrew text-sm font-bold" style={{ color: 'var(--ink)' }}>
                      {member.hebrewNikud}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Called words history */}
        {called.length > 0 && mode === 'teacher' && (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--muted)' }}>
              Words called
            </p>
            <div className="flex flex-wrap gap-2">
              {called.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm"
                  style={{ background: '#f3f4f6', color: 'var(--ink)' }}
                >
                  <span>{c.emoji}</span>
                  <span className="hebrew font-semibold">{c.hebrewNikud}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-5" style={{ color: 'var(--muted)' }}>
          Get 3 in a row to win • Rows, columns, or diagonals
        </p>
      </div>
    </div>
  );
}
