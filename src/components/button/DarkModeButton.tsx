import { useTheme } from "../../hooks/useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function DarkModeButton() {
  const { state, dispatch } = useTheme();
  const nextMode = state.theme.length > 0 ? "light" : "dark";
  const dimensions:string = "h-6 w-6"

  return (
    <button
      onClick={() => dispatch({ type: nextMode })}
      className="hover:cursor-pointer text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      <span>{nextMode === 'light' ? <SunIcon className={dimensions}/> : <MoonIcon className={dimensions}/>}</span>
    </button>
  );
}
