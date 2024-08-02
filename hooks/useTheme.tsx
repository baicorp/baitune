import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

type Theme = {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const Theme = createContext<Theme | undefined>(undefined);

export function useTheme() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: ReactElement | ReactNode | ReactNode[];
}) {
  const colorSheme = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(colorSheme ?? "dark");

  useEffect(() => {
    setTheme(colorSheme ?? "dark");
  }, [colorSheme]);

  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
}
