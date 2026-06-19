interface Props {
  title: string;
  hebrewTitle: string;
  emoji: string;
  onBack: () => void;
}

export function ActivityHeader({ title, hebrewTitle, emoji, onBack }: Props) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 transition-colors"
        style={{ color: 'var(--muted)' }}
      >
        ← Back
      </button>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{emoji}</span>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
            {title}
          </div>
          <div className="text-2xl font-bold hebrew" style={{ color: 'var(--ink)' }}>
            {hebrewTitle}
          </div>
        </div>
      </div>
    </div>
  );
}
