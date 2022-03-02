import create from 'zustand';

export const useTheme = create(set => ({
  isDark: true,
  isLight: false,
  theme: 'dark',
  setTheme: theme =>
    set(() => ({
      isDark: theme === 'dark',
      isLight: theme === 'light',
      theme,
    })),
}));
