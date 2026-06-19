import { familyMembers } from '../data/family';

interface Props {
  onBack: () => void;
}

export function Printable({ onBack }: Props) {
  const word = (m: (typeof familyMembers)[number]) => m.hebrewNikud;

  return (
    <>
      {/* Screen chrome — hidden when printing */}
      <div className="no-print" style={{ background: 'var(--sand)', padding: '1.5rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            className="no-print"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 10,
              border: '1.5px solid #d1d5db',
              background: 'white',
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => window.print()}
            style={{
              fontSize: 14,
              fontWeight: 700,
              padding: '8px 20px',
              borderRadius: 10,
              border: 'none',
              background: '#d97706',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            🖨 Print
          </button>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>
            A4 · portrait · no margins
          </span>
        </div>
      </div>

      {/* The actual printable sheet */}
      <div id="print-sheet" style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '40px 48px',
        background: 'white',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: '#1c1917',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32, borderBottom: '2px solid #e7e5e4', paddingBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🇮🇱</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>
            Hebrew Family Words
          </h1>
          <p style={{
            margin: '6px 0 0',
            fontSize: 22,
            fontFamily: "'Frank Ruhl Libre', serif",
            direction: 'rtl',
            color: '#d97706',
            fontWeight: 700,
          }}>
            המשפחה שלי
          </p>
        </div>

        {/* Vocabulary grid */}
        <section style={{ marginBottom: 36 }}>
          <SectionTitle>Vocabulary · מילים</SectionTitle>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 10,
          }}>
            {familyMembers.map((m) => (
              <div key={m.id} style={{
                border: '1.5px solid #e7e5e4',
                borderRadius: 10,
                padding: '10px 6px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 30, marginBottom: 4 }}>{m.emoji}</div>
                <div style={{
                  fontSize: 18,
                  fontWeight: 800,
                  fontFamily: "'Frank Ruhl Libre', serif",
                  direction: 'rtl',
                  marginBottom: 2,
                }}>
                  {word(m)}
                </div>
                <div style={{ fontSize: 12, color: '#78716c' }}>{m.english}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sentence patterns */}
        <section style={{ marginBottom: 36 }}>
          <SectionTitle>Sentence Patterns · מִשְׁפָּטִים</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

            <PatternBox
              label="זֶה (masculine)"
              color="#dbeafe"
              borderColor="#93c5fd"
              rows={[
                { he: 'זֶה אַבָּא.', en: 'This is dad.' },
                { he: 'זֶה אָח.', en: 'This is a brother.' },
                { he: 'זֶה סַבָּא.', en: 'This is grandpa.' },
                { he: 'זֶה דּוֹד.', en: 'This is an uncle.' },
                { he: 'זֶה גִּיס.', en: 'This is a brother-in-law.' },
              ]}
            />

            <PatternBox
              label="זֹאת (feminine)"
              color="#fce7f3"
              borderColor="#f9a8d4"
              rows={[
                { he: 'זֹאת אִמָּא.', en: 'This is mom.' },
                { he: 'זֹאת אָחוֹת.', en: 'This is a sister.' },
                { he: 'זֹאת סַבְתָּא.', en: 'This is grandma.' },
                { he: 'זֹאת דּוֹדָה.', en: 'This is an aunt.' },
                { he: 'זֹאת גִּיסָה.', en: 'This is a sister-in-law.' },
              ]}
            />

            <PatternBox
              label="יֵשׁ לִי (I have)"
              color="#dcfce7"
              borderColor="#86efac"
              rows={[
                { he: 'יֵשׁ לִי אָח.', en: 'I have a brother.' },
                { he: 'יֵשׁ לִי אָחוֹת.', en: 'I have a sister.' },
                { he: 'יֵשׁ לִי דּוֹד.', en: 'I have an uncle.' },
                { he: 'יֵשׁ לִי דּוֹדָה.', en: 'I have an aunt.' },
                { he: 'יֵשׁ לִי אַחְיָן.', en: 'I have a nephew.' },
              ]}
            />

            <PatternBox
              label="שֶׁלִּי (my / possessive)"
              color="#fef9c3"
              borderColor="#fde047"
              rows={[
                { he: 'זֹאת אִמָּא שֶׁלִּי.', en: 'This is my mom.' },
                { he: 'זֶה אַבָּא שֶׁלִּי.', en: 'This is my dad.' },
                { he: 'זֶה דּוֹד שֶׁלִּי.', en: 'This is my uncle.' },
                { he: 'זֹאת דּוֹדָה שֶׁלִּי.', en: 'This is my aunt.' },
                { he: 'זֶה גִּיס שֶׁלִּי.', en: 'This is my brother-in-law.' },
              ]}
            />
          </div>
        </section>

        {/* Practice section */}
        <section style={{ marginBottom: 36 }}>
          <SectionTitle>Practice · תרגול</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Fill in the blank */}
            <div style={{ border: '1.5px solid #e7e5e4', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#78716c', marginBottom: 12 }}>
                Fill in the blank
              </div>
              {[
                { he: '_______ אִמָּא.', hint: '(this is — feminine)' },
                { he: '_______ אַבָּא.', hint: '(this is — masculine)' },
                { he: 'יֵשׁ לִי _______.', hint: '(a sister)' },
                { he: 'זֹאת _______ שֶׁלִּי.', hint: '(grandma)' },
                { he: 'יֵשׁ לִי _______.', hint: '(an uncle)' },
                { he: 'זֹאת _______ שֶׁלִּי.', hint: '(aunt)' },
                { he: 'זֶה _______ שֶׁלִּי.', hint: '(brother-in-law)' },
                { he: 'יֵשׁ לִי _______.', hint: '(a nephew)' },
              ].map((row) => (
                <div key={row.hint} style={{ marginBottom: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 14, fontFamily: "'Frank Ruhl Libre', serif", direction: 'rtl', display: 'inline-block', minWidth: 140 }}>
                    {row.he}
                  </span>
                  <span style={{ fontSize: 11, color: '#a8a29e' }}>{row.hint}</span>
                </div>
              ))}
            </div>

            {/* Match — all 16 words split into two groups */}
            <div style={{ border: '1.5px solid #e7e5e4', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#78716c', marginBottom: 10 }}>
                Match Hebrew → English
              </div>

              {/* Basic family */}
              <div style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                Basic Family
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px', marginBottom: 10 }}>
                <div style={{ direction: 'rtl' }}>
                  {[
                    { n: '1', he: 'אִמָּא' }, { n: '2', he: 'אַבָּא' },
                    { n: '3', he: 'אָח' },    { n: '4', he: 'אָחוֹת' },
                    { n: '5', he: 'סַבָּא' }, { n: '6', he: 'סַבְתָּא' },
                    { n: '7', he: 'בֵּן' },   { n: '8', he: 'בַּת' },
                  ].map((item) => (
                    <div key={item.n} style={{ marginBottom: 5, fontSize: 14, fontFamily: "'Frank Ruhl Libre', serif", display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: '#a8a29e', direction: 'ltr', minWidth: 12 }}>{item.n}.</span>
                      <span>{item.he}</span>
                      <span style={{ flex: 1, borderBottom: '1px dotted #d1d5db', marginBottom: 2, minWidth: 20 }} />
                    </div>
                  ))}
                </div>
                <div>
                  {['daughter', 'grandma', 'dad', 'son', 'sister', 'mom', 'grandpa', 'brother'].map((en, i) => (
                    <div key={en} style={{ marginBottom: 5, fontSize: 11, color: '#57534e', display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ color: '#a8a29e', minWidth: 16 }}>{String.fromCodePoint(65 + i)}.</span>
                      <span>{en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extended family */}
              <div style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                Extended Family
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                <div style={{ direction: 'rtl' }}>
                  {[
                    { n: '1', he: 'יֶלֶד' },       { n: '2', he: 'יַלְדָּה' },
                    { n: '3', he: 'דּוֹד' },        { n: '4', he: 'דּוֹדָה' },
                    { n: '5', he: 'אַחְיָן' },      { n: '6', he: 'אַחְיָנִית' },
                    { n: '7', he: 'גִּיס' },        { n: '8', he: 'גִּיסָה' },
                  ].map((item) => (
                    <div key={item.n} style={{ marginBottom: 5, fontSize: 14, fontFamily: "'Frank Ruhl Libre', serif", display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: '#a8a29e', direction: 'ltr', minWidth: 12 }}>{item.n}.</span>
                      <span>{item.he}</span>
                      <span style={{ flex: 1, borderBottom: '1px dotted #d1d5db', marginBottom: 2, minWidth: 20 }} />
                    </div>
                  ))}
                </div>
                <div>
                  {['niece', 'brother-in-law', 'girl/child', 'nephew', 'sister-in-law', 'uncle', 'boy/child', 'aunt'].map((en, i) => (
                    <div key={en} style={{ marginBottom: 5, fontSize: 11, color: '#57534e', display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ color: '#a8a29e', minWidth: 16 }}>{String.fromCodePoint(65 + i)}.</span>
                      <span>{en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My family section */}
        <section>
          <SectionTitle>My Family · הַמִּשְׁפָּחָה שֶׁלִּי</SectionTitle>
          <div style={{ border: '1.5px solid #e7e5e4', borderRadius: 12, padding: '16px 20px' }}>
            <p style={{ fontSize: 12, color: '#78716c', marginBottom: 14, marginTop: 0 }}>
              Draw or write your family members and describe them using the sentence frames above.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ border: '1px dashed #d1d5db', borderRadius: 10, padding: '12px 10px', minHeight: 90 }}>
                  <div style={{ height: 48, borderBottom: '1px solid #e7e5e4', marginBottom: 6 }} />
                  <div style={{
                    fontSize: 14,
                    fontFamily: "'Frank Ruhl Libre', serif",
                    direction: 'rtl',
                    color: '#c7c3c0',
                    textAlign: 'right',
                  }}>
                    זֶה / זֹאת ___________
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 11, color: '#a8a29e', borderTop: '1px solid #e7e5e4', paddingTop: 14 }}>
          הַמִּשְׁפָּחָה שֶׁלִּי — Hebrew Family Lesson
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          #print-sheet {
            max-width: 100% !important;
            padding: 20px 24px !important;
            margin: 0 !important;
          }
          @page { margin: 10mm; size: A4 portrait; }
        }
      `}</style>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#57534e' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
    </div>
  );
}

function PatternBox({ label, color, borderColor, rows }: {
  label: string;
  color: string;
  borderColor: string;
  rows: { he: string; en: string }[];
}) {
  return (
    <div style={{ borderRadius: 12, padding: '14px 16px', background: color, border: `1.5px solid ${borderColor}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: '#57534e', marginBottom: 10 }}>
        {label}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#78716c' }}>{r.en}</span>
          <span style={{ fontSize: 15, fontFamily: "'Frank Ruhl Libre', serif", direction: 'rtl', fontWeight: 600 }}>
            {r.he}
          </span>
        </div>
      ))}
    </div>
  );
}
