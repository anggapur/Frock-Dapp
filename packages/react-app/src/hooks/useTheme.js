import create from 'zustand';

export const useTheme = create(set => ({
  isDark: false,
  isLight: true,
  theme: 'light',
  setTheme: theme =>
    set(() => ({
      isDark: theme === 'dark',
      isLight: theme === 'light',
      theme,
    })),
}));
