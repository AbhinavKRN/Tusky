import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return saved ? JSON.parse(saved) : prefersDark
    })

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDark))
        document.documentElement.classList.toggle('dark', isDark)
    }, [isDark])

    const toggleTheme = () => setIsDark(!isDark)

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within ThemeProvider')
    return context
}
