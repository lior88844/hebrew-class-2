import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Printable } from './components/Printable';
import { VocabCards } from './activities/VocabCards';
import { MemoryMatch } from './activities/MemoryMatch';
import { FamilyTree } from './activities/FamilyTree';
import { MyFamily } from './activities/MyFamily';
import { FamilyDeduction } from './activities/FamilyDeduction';
import { FamilyTelephone } from './activities/FamilyTelephone';
import type { ActivityId } from './types';

type Screen = ActivityId | 'print' | null;

export default function App() {
  const [screen, setScreen] = useState<Screen>(null);

  const handleBack = () => setScreen(null);

  if (screen === 'vocab') return <VocabCards onBack={handleBack} />;
  if (screen === 'memory') return <MemoryMatch onBack={handleBack} />;
  if (screen === 'tree') return <FamilyTree onBack={handleBack} />;
  if (screen === 'myfamily') return <MyFamily onBack={handleBack} />;
  if (screen === 'bingo') return <FamilyDeduction onBack={handleBack} />;
  if (screen === 'telephone') return <FamilyTelephone onBack={handleBack} />;
  if (screen === 'print') return <Printable onBack={handleBack} />;

  return (
    <Dashboard
      onSelect={(id) => setScreen(id)}
      onPrint={() => setScreen('print')}
    />
  );
}
