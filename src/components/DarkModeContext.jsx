import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  });

  // 값이 바뀔 때 localStorage 반영
  useEffect(() => {
    localStorage.setItem('darkMode', isDark);
    document.body.className = isDark ? 'dark' : 'light'; // body 태그 클래스명 지정
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// 커스텀 훅 제작
export function useDarkMode() {
  return useContext(DarkModeContext);
}