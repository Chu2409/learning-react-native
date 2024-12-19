import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "@/constants/Colors";

interface ThemeChangerContextType {
  currentTheme: "light" | "dark";
  isSystemTheme: boolean;

  bgColor: string;

  toggleTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeChangerContext = createContext({} as ThemeChangerContextType);

export const useThemeChangerContext = () => {
  const themeChanger = useContext(ThemeChangerContext);

  return themeChanger;
};

export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark')
  const [isSystemThemeEnabled, setisSystemThemeEnabled] = useState(true)

  const currentTheme = isSystemThemeEnabled ? colorScheme : isDarkMode ? 'dark' : 'light'

  useEffect(() => {
    AsyncStorage.getItem('selected-theme').then(theme => {
      if (!theme) return

      setIsDarkMode(theme === 'dark')
      setisSystemThemeEnabled(theme === 'system')
      setColorScheme(theme as 'dark' | 'light' | 'system')
    })
  }, [])

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemeChangerContext.Provider
        value={{
          currentTheme: currentTheme ?? "light",
          isSystemTheme: isSystemThemeEnabled,
          bgColor: isDarkMode ? Colors.dark.background : Colors.light.background,
          toggleTheme: async () => {
            setColorScheme(isDarkMode ? 'light' : 'dark')
            setIsDarkMode(!isDarkMode)
            setisSystemThemeEnabled(false)

            await AsyncStorage.setItem('selected-theme', isDarkMode ? 'light' : 'dark')
          },
          setSystemTheme: async () => {
            setisSystemThemeEnabled(true)
            setColorScheme('system')

            await AsyncStorage.setItem('selected-theme', 'system')

          },
        }}
      >
        {children}
      </ThemeChangerContext.Provider>
    </ThemeProvider>
  );
};
