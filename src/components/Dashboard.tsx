import type { Activity, ActivityId } from '../types';
import { activities } from '../data/family';

interface Props {
  onSelect: (id: ActivityId) => void;
  onPrint: () => void;
}

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  amber: { bg: '#fef3c7', border: '#f59e0b', badge: '#d97706' },
  teal:  { bg: '#ccfbf1', border: '#14b8a6', badge: '#0d9488' },
  green: { bg: '#dcfce7', border: '#22c55e', badge: '#16a34a' },
  rose:  { bg: '#ffe4e6', border: '#f43f5e', badge: '#e11d48' },
  purple:{ bg: '#ede9fe', border: '#8b5cf6', badge: '#7c3aed' },
};

export function Dashboard({ onSelect, onPrint }: Props) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--sand)' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🇮🇱</div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
            Hebrew Family Words
          </h1>
          <p className="hebrew text-2xl mt-3 mb-2" style={{ color: 'var(--amber-dark)' }}>
            הַמִּשְׁפָּחָה שֶׁלִּי
          </p>
          <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
            A complete 45-minute beginner lesson
          </p>
        </div>

        {/* Lesson flow label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-stone-300" />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Lesson Flow
          </span>
          <div className="h-px flex-1 bg-stone-300" />
        </div>

        {/* Activity cards */}
        <div className="flex flex-col gap-3">
          {activities.map((activity: Activity, index: number) => {
            const colors = colorMap[activity.color] ?? colorMap.amber;
            return (
              <button
                key={activity.id}
                onClick={() => onSelect(activity.id)}
                className="w-full text-left rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99]"
                style={{
                  background: colors.bg,
                  border: `1.5px solid ${colors.border}`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl w-12 text-center">{activity.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="font-bold text-lg" style={{ color: 'var(--ink)' }}>
                        {activity.title}
                      </span>
                      <span className="hebrew text-base font-medium" style={{ color: colors.badge }}>
                        {activity.hebrewTitle}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold" style={{ color: colors.border }}>
                      {index + 1} of {activities.length}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Print handout button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: 'white', border: '1.5px solid #d1d5db', color: 'var(--muted)' }}
          >
            🖨 Print Student Handout
          </button>
        </div>
      </div>
    </div>
  );
}
