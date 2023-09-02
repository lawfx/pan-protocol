import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggleIcon() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <ButtonIcon onClick={() => toggleTheme()}>
      {isDarkTheme ? <SunIcon /> : <MoonIcon />}
    </ButtonIcon>
  );
}