import { useState, useEffect, useCallback } from 'react';
import { familyMembers } from '../data/family';
import { ActivityHeader } from '../components/ActivityHeader';
import type { FamilyMember } from '../types';

interface CardData {
  uid: string;
  memberId: string;
  type: 'emoji' | 'word';
  content: string;
  member: FamilyMember;
}

function buildDeck(members: FamilyMember[]): CardData[] {
  const subset = members.slice(0, 6);
  const deck: CardData[] = [];
  subset.forEach((m) => {
    deck.push({ uid: `${m.id}-emoji`, memberId: m.id, type: 'emoji', content: m.emoji, member: m });
    deck.push({ uid: `${m.id}-word`, memberId: m.id, type: 'word', content: m.hebrewNikud, member: m });
  });
  return deck.sort(() => Math.random() - 0.5);
}

interface Props {
  onBack: () => void;
}

export function MemoryMatch({ onBack }: Props) {
  const [deck, setDeck] = useState<CardData[]>(() => buildDeck(familyMembers));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);
  const [lastWrong, setLastWrong] = useState<string[]>([]);

  const totalPairs = deck.length / 2;

  const reset = useCallback(() => {
    setDeck(buildDeck(familyMembers));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
    setLastWrong([]);
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    setMoves((m) => m + 1);

    const [a, b] = flipped.map((uid) => deck.find((c) => c.uid === uid)!);
    if (a.memberId === b.memberId) {
      const newMatched = [...matched, a.memberId];
      setMatched(newMatched);
      setFlipped([]);
      setLocked(false);
      if (newMatched.length === totalPairs) setWon(true);
    } else {
      setLastWrong([a.uid, b.uid]);
      setTimeout(() => {
        setFlipped([]);
        setLastWrong([]);
        setLocked(false);
      }, 900);
    }
  }, [flipped]);

  const handleFlip = (card: CardData) => {
    if (locked) return;
    if (flipped.includes(card.uid)) return;
    if (matched.includes(card.memberId)) return;
    if (flipped.length === 2) return;
    setFlipped((f) => [...f, card.uid]);
  };

  const isFlipped = (card: CardData) =>
    flipped.includes(card.uid) || matched.includes(card.memberId);
  const isMatched = (card: CardData) => matched.includes(card.memberId);
  const isWrong = (card: CardData) => lastWrong.includes(card.uid);

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div className="max-w-lg mx-auto">
        <ActivityHeader
          title="Memory Match"
          hebrewTitle="משחק זיכרון"
          emoji="🧠"
          onBack={onBack}
        />

        {/* Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>{moves}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>moves</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#0d9488' }}>{matched.length}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>matched</div>
            </div>
          </div>
          <button
            onClick={reset}
            className="text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{ background: '#ccfbf1', border: '1.5px solid #14b8a6', color: '#0d9488' }}
          >
            New Game
          </button>
        </div>

        {/* Win banner */}
        {won && (
          <div
            className="rounded-2xl p-5 mb-6 text-center"
            style={{ background: '#ccfbf1', border: '1.5px solid #14b8a6' }}
          >
            <div className="text-4xl mb-2">🎉</div>
            <div className="hebrew text-2xl font-bold mb-1" style={{ color: '#0d9488' }}>כׇּל הַכָּבוֹד!</div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              Well done! Matched all {totalPairs} pairs in {moves} moves.
            </div>
            <button
              onClick={reset}
              className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: '#14b8a6', color: 'white' }}
            >
              Play Again
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {deck.map((card) => {
            const faceUp = isFlipped(card);
            const ok = isMatched(card);
            const wrong = isWrong(card);

            return (
              <button
                key={card.uid}
                onClick={() => handleFlip(card)}
                disabled={ok || locked}
                className="relative aspect-square rounded-2xl transition-all duration-300"
                style={{
                  perspective: '600px',
                  transformStyle: 'preserve-3d',
                  opacity: ok ? 0.4 : 1,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                    transform: faceUp ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Card back */}
                  <div
                    className="absolute inset-0 rounded-2xl flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: '#e0f2fe',
                      border: '1.5px solid #7dd3fc',
                    }}
                  >
                    <span className="text-2xl">?</span>
                  </div>

                  {/* Card front */}
                  <div
                    className="absolute inset-0 rounded-2xl flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: wrong ? '#fee2e2' : ok ? '#dcfce7' : 'white',
                      border: `1.5px solid ${wrong ? '#f87171' : ok ? '#22c55e' : '#e5e7eb'}`,
                    }}
                  >
                    {card.type === 'emoji' ? (
                      <span className="text-3xl">{card.content}</span>
                    ) : (
                      <span className="hebrew text-xl font-bold" style={{ color: 'var(--ink)' }}>
                        {card.content}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--muted)' }}>
          Match each picture with its Hebrew word
        </p>
      </div>
    </div>
  );
}
