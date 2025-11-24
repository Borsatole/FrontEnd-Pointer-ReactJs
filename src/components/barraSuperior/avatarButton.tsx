import { useTheme } from '../../context/ThemeContext';
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


function AvatarButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div >

    <button
      // onClick={toggleTheme}
      className="w-10 h-10 bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <FaUser size={20} />
    </button>
    </div>
  );
}

export default AvatarButton;
