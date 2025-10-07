import { useTheme } from '../../context/ThemeContext';
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";


function DarkmodeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div >

    <button
      onClick={toggleTheme}
      className="w-10 h-10 bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <FaSun size={20}/>
      ) : (
        <MdDarkMode size={20} />
      )}
    </button>
    </div>
  );
}

export default DarkmodeButton;
