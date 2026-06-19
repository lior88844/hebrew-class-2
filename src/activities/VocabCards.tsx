import { useState } from 'react';
import { familyMembers } from '../data/family';
import { ActivityHeader } from '../components/ActivityHeader';
import type { FamilyMember } from '../types';

interface Props {
  onBack: () => void;
}

type Mode = 'basic' | 'possessive';

export function VocabCards({ onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<Mode>('basic');
  const member: FamilyMember = familyMembers[currentIndex];

  const goNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i + 1) % familyMembers.length), 150);
  };

  const goPrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i - 1 + familyMembers.length) % familyMembers.length), 150);
  };

  const hebrewWord = mode === 'possessive' ? member.hebrewSheli : member.hebrewNikud;
  const pronoun = member.gender === 'feminine' ? 'זֹאת' : 'זֶה';
  const sentence = `${pronoun} ${hebrewWord}.`;

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--sand)' }}>
      <div className="max-w-md mx-auto">
        <ActivityHeader
          title="Vocabulary Cards"
          hebrewTitle="מילים חדשות"
          emoji="🃏"
          onBack={onBack}
        />

        {/* Mode toggle */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl bg-stone-200 w-fit mx-auto">
          {(['basic', 'possessive'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setIsFlipped(false); }}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: mode === m ? 'white' : 'transparent',
                color: mode === m ? 'var(--ink)' : 'var(--muted)',
                boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {m === 'basic' ? 'Basic' : 'My Family (שֶׁלִּי)'}
            </button>
          ))}
        </div>

        {/* Card counter */}
        <p className="text-center text-sm mb-4" style={{ color: 'var(--muted)' }}>
          {currentIndex + 1} / {familyMembers.length}
        </p>

        {/* Flip card */}
        <div
          className="relative w-full h-72 cursor-pointer perspective-1000"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className="w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front: Picture */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-4 shadow-lg"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'white',
                border: '1.5px solid var(--sand-dark)',
              }}
            >
              <div className="text-9xl">{member.emoji}</div>
              <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                Tap to reveal
              </p>
            </div>

            {/* Back: Hebrew word + sentence */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-5 shadow-lg"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: '#fef3c7',
                border: '1.5px solid #f59e0b',
              }}
            >
              <div className="text-7xl mb-1">{member.emoji}</div>
              <div className="text-center">
                <div className="hebrew text-5xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
                  {hebrewWord}
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--muted)' }}>
                  {member.english}
                </div>
              </div>
              <div
                className="hebrew text-2xl font-semibold px-6 py-2 rounded-xl"
                style={{ background: '#f59e0b22', color: '#d97706' }}
              >
                {sentence}
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-sm mt-4 mb-8" style={{ color: 'var(--muted)' }}>
          {isFlipped
            ? `"${member.gender === 'feminine' ? 'Zot' : 'Ze'} ${member.english}."`
            : 'מִי זֶה? / מִי זֹאת?  →  Who is this?'
          }
        </p>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={goPrev}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'white', border: '1.5px solid var(--sand-dark)', color: 'var(--ink)' }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: '#fef3c7', border: '1.5px solid #f59e0b', color: '#d97706' }}
          >
            {isFlipped ? 'Hide' : 'Reveal'}
          </button>
          <button
            onClick={goNext}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'white', border: '1.5px solid var(--sand-dark)', color: 'var(--ink)' }}
          >
            Next →
          </button>
        </div>

        {/* All words preview */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--muted)' }}>
            All Words
          </p>
          <div className="flex flex-wrap gap-2">
            {familyMembers.map((m, i) => (
              <button
                key={m.id}
                onClick={() => { setCurrentIndex(i); setIsFlipped(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: i === currentIndex ? '#fef3c7' : 'white',
                  border: `1.5px solid ${i === currentIndex ? '#f59e0b' : '#e5e7eb'}`,
                  color: i === currentIndex ? '#d97706' : 'var(--ink)',
                }}
              >
                <span>{m.emoji}</span>
                <span className="hebrew">{m.hebrewNikud}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
