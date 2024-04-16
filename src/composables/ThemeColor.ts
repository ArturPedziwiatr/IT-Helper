import { AppMode } from '@/enums/AppMode';

export default function useThemeColor() {
  const changePrimaryColor = (color: string) => changeVariable('--primary', color)
  
  const changeMode = (mode: AppMode) => {
    if (mode === AppMode.DARK) {
      changeVariable('--color-text', 'var(--color-text-dark)')
      changeVariable('--color-bg-primary', 'var(--color-bg-primary-dark)')
      changeVariable('--color-active-text', 'var(--color-active-text-dark)')
      changeVariable('--color-bg-secondary', 'var(--color-bg-secondary-dark)')
      return
    }

    changeVariable('--color-text', 'var(--color-text-light)')
    changeVariable('--color-bg-primary', 'var(--color-bg-primary-light)')
    changeVariable('--color-active-text', 'var(--color-active-text-light)')
    changeVariable('--color-bg-secondary', 'var(--color-bg-secondary-light)')
  }

  const changeVariable = (key: string, value: string) => {
    document.documentElement.style.setProperty(key, value)
  }

  return {
    changeMode,
    changePrimaryColor,
  }
}