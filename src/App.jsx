import { DarkModeProvider } from './components/DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';
import AddButton from './components/AddButton';
import AddMemberForm from './components/AddMemberForm';
import { useState } from 'react';
import MemberList from './components/MemberList';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DarkModeProvider>
      <div style={{ padding: '2rem' }}>
        <DarkModeToggle />
      </div>
      <div>
        <MemberList />
      </div>
      <AddButton onClick={() => setShowForm(true)} />
      {showForm && <AddMemberForm onClose={() => setShowForm(false)} />}
    </DarkModeProvider>
  )
}

export default App
