import { deductionFamily, treeLines } from '../data/deductionFamily';
import type { DeductionPerson, PersonSubtype } from '../data/deductionFamily';

export { deductionFamily, treeLines };
export type { DeductionPerson, PersonSubtype };

export const subtypeColors: Record<PersonSubtype, { bg: string; border: string; text: string }> = {
  grandparent: { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
  child:       { bg: '#dbeafe', border: '#3b82f6', text: '#1d4ed8' },
  spouse:      { bg: '#e0f2fe', border: '#0ea5e9', text: '#0369a1' },
  grandchild:  { bg: '#dcfce7', border: '#22c55e', text: '#15803d' },
  extended:    { bg: '#fef9c3', border: '#ca8a04', text: '#92400e' },
};

type NodeState = 'correct' | 'wrong' | 'idle';

function nodeColors(person: DeductionPerson, state: NodeState) {
  if (state === 'correct') return { bg: '#bbf7d0', border: '#15803d', text: '#14532d' };
  if (state === 'wrong')   return { bg: '#fecaca', border: '#dc2626', text: '#7f1d1d' };
  return subtypeColors[person.subtype];
}

interface Props {
  selectedId?: string | null;
  answerId?: string | null;
  wrongId?: string | null;
  highlightIds?: Set<string>;
  onSelect?: (p: DeductionPerson) => void;
  readonly?: boolean;
}

const W = 900;
const H = 555;

const allParentLines = [
  ...treeLines.gp,
  ...treeLines.yaelDaniToKids,
  ...treeLines.michalEitanToKids,
  ...treeLines.uriNoaToKids,
];

export function DeductionTreeCanvas({
  selectedId = null,
  answerId = null,
  wrongId = null,
  highlightIds,
  onSelect,
  readonly = false,
}: Props) {
  return (
    <div style={{ position: 'relative', width: W, height: H }}>
      {/* SVG lines */}
      <svg
        width={W} height={H}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        {treeLines.coupleLines.map((l, i) => (
          <line key={`couple-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#cbd5e1" strokeWidth="2.5" />
        ))}
        {allParentLines.map((l, i) => (
          <line key={`tree-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#cbd5e1" strokeWidth="2" />
        ))}
        <line x1={20} y1={448} x2={880} y2={448}
          stroke="#e2e8f0" strokeWidth="1" strokeDasharray="6 4" />
        <text x={450} y={444} textAnchor="middle"
          style={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'system-ui' }}>
          מִשְׁפָּחָה מֻרְחֶבֶת
        </text>
      </svg>

      {/* Person nodes */}
      {deductionFamily.map((person) => {
        let state: NodeState = 'idle';
        if (person.id === answerId) state = 'correct';
        else if (person.id === wrongId) state = 'wrong';
        const colors = nodeColors(person, state);
        const isActive = person.id === selectedId;
        const isHighlighted = highlightIds?.has(person.id);

        return (
          <button
            key={person.id}
            onClick={() => !readonly && onSelect?.(person)}
            disabled={readonly}
            style={{
              position: 'absolute',
              left: person.x - 36,
              top: person.y - 37,
              width: 72,
              height: 74,
              borderRadius: 12,
              border: `2px solid ${isHighlighted ? '#f59e0b' : colors.border}`,
              background: isHighlighted ? '#fffbeb' : colors.bg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: readonly ? 'default' : 'pointer',
              transition: 'transform 0.15s, border-color 0.15s, box-shadow 0.15s',
              transform: isActive ? 'scale(1.12)' : 'scale(1)',
              boxShadow: isActive ? `0 0 0 3px ${colors.border}44` : 'none',
              zIndex: isActive ? 3 : 2,
              padding: 0,
            }}
          >
            <span style={{ fontSize: 22, lineHeight: 1 }}>{person.emoji}</span>
            <span style={{
              fontSize: person.nameNikud.length > 6 ? 10 : 12,
              fontWeight: 700,
              fontFamily: "'Frank Ruhl Libre', serif",
              direction: 'rtl',
              color: colors.text,
              textAlign: 'center',
              lineHeight: 1.2,
              padding: '0 2px',
            }}>
              {person.nameNikud}
            </span>
            {person.relationLabel && (
              <span style={{
                fontSize: 8,
                color: '#92400e',
                direction: 'rtl',
                textAlign: 'center',
                lineHeight: 1.1,
                padding: '0 2px',
                fontFamily: "'Frank Ruhl Libre', serif",
              }}>
                {person.relationLabel}
              </span>
            )}
            {state === 'correct' && (
              <span style={{ position: 'absolute', top: -8, right: -8, fontSize: 14, lineHeight: 1 }}>
                ✅
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function TreeLegend() {
  return (
    <div className="flex flex-wrap gap-3 px-4 pb-3 pt-1">
      {([
        ['grandparent', 'סַבָּא וְסַבְתָּא'],
        ['child',       'בְּנֵי הַמִּשְׁפָּחָה'],
        ['spouse',      'בְּנֵי זוּג'],
        ['grandchild',  'נְכָדִים'],
        ['extended',    'מִשְׁפָּחָה מֻרְחֶבֶת'],
      ] as [PersonSubtype, string][]).map(([type, label]) => (
        <div key={type} className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{
            background: subtypeColors[type].bg,
            border: `1.5px solid ${subtypeColors[type].border}`,
          }} />
          <span className="hebrew text-xs" style={{ color: 'var(--muted)', direction: 'rtl' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
