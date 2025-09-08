"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Evita hidratação incorreta
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch disabled />
                <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-2">
            <Sun className={`h-4 w-4 transition-colors ${theme === 'light' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked: boolean) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Alternar tema"
            />
            <Moon className={`h-4 w-4 transition-colors ${theme === 'dark' ? 'text-blue-400' : 'text-muted-foreground'}`} />
        </div>
    )
}

export default ThemeToggle
