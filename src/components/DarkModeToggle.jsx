import { useDarkMode } from "./DarkModeContext";
import '../style/DarkModeToggle.css'

export default function DarkModeToggle() { 
  // context 값에 직접 접근하여 데이터 얻음
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDark ? '☀️ 라이트모드' : '🌙 다크모드'}
    </button>
  );
}