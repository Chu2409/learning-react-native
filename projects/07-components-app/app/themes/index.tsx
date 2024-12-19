import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedSwitch from '@/presentation/shared/ThemedSwitch';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
import { useColorScheme } from "nativewind";

import { View, Text } from 'react-native';
import { useThemeChangerContext } from '@/presentation/context/ThemeChangerContext';

const ThemesScreen = () => {
  // const { colorScheme, setColorScheme } = useColorScheme();

  const {toggleTheme, currentTheme,setSystemTheme, isSystemTheme} = useThemeChangerContext()

  const [darkModeSettings, setDarkModeSettings] = useState({
    darkMode: currentTheme ==='dark',
    systeMode: isSystemTheme
  })

  const setDarkMode = (value: boolean) => {
    // setColorScheme(value ? 'dark' : 'light');

    toggleTheme()

    setDarkModeSettings({
      darkMode: value,
      systeMode: false
    })
  }

  const setSystemMode = (value: boolean) => {
    if (value) {
      setSystemTheme()
    }

    setDarkModeSettings({
      darkMode: darkModeSettings.darkMode,
      systeMode: value
    })
  }

  return (
    <ThemedView>
      <ThemedCard>
        <ThemedSwitch value={darkModeSettings.darkMode} onValueChange={setDarkMode}  text='Dark Mode' className='mb-5'/>

        <ThemedSwitch value={darkModeSettings.systeMode} onValueChange={setSystemMode}  text='System Mode' className='mb-5'/>

      </ThemedCard>
    </ThemedView>
  );
};
export default ThemesScreen;
