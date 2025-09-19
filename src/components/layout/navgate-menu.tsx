"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/layout/theme-toggle"

// TODO: change to prismic custom type
const programs: { title: string; href: string; description: string, target: React.HTMLAttributeAnchorTarget | undefined }[] = [
    {
        title: "Junco Cast",
        href: "https://www.youtube.com/@redejuncotv",
        description:
            "A podcast about the Junco project.",
        target: "_blank",
    }
]

export function NavigationMenuDemo() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="w-full mt-5">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between items-center w-full px-6">
                <NavigationMenu viewport={true}>
                    <NavigationMenuList className="gap-2">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Programas</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
                                    {programs.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                            target={component.target}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/junco-news">Junco News</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/about">Sobre nós</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Theme Toggle */}
                <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile Menu Button and Theme Toggle */}
                <div className="flex justify-between items-center px-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleMobileMenu}
                        className="flex items-center gap-2"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Menu className="h-4 w-4" />
                        )}
                        <span>Menu</span>
                    </Button>

                    <ThemeToggle />
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
                        {/* Header with close button */}
                        <div className="flex justify-between items-center p-4 border-b border-border">
                            <div className="text-xl font-bold text-foreground">
                                Menu
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMobileMenu}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Scrollable Menu Content */}
                        <div className="overflow-y-auto h-[calc(100vh-80px)]">
                            <div className="p-4 space-y-4">
                                <MobileMenuItem href="/" onClick={toggleMobileMenu}>
                                    Home
                                </MobileMenuItem>

                                {/* Programs Section */}
                                <div className="space-y-3">
                                    <span
                                        className="block px-4 py-2 text-muted-foreground font-semibold cursor-default select-none"
                                        aria-label="Seção Programas"
                                        role="presentation"
                                    >
                                        Programas
                                    </span>
                                    <div className="space-y-2">
                                        {programs.map((program) => (
                                            <MobileMenuItem
                                                key={program.title}
                                                href={program.href}
                                                onClick={toggleMobileMenu}
                                                isSubItem
                                            >
                                                <div>
                                                    <div className="font-medium">{program.title}</div>
                                                    <div className="text-sm text-muted-foreground mt-1">{program.description}</div>
                                                </div>
                                            </MobileMenuItem>
                                        ))}
                                    </div>
                                </div>

                                <MobileMenuItem href="/junco-news" onClick={toggleMobileMenu}>
                                    Junco News
                                </MobileMenuItem>

                                <MobileMenuItem href="/about" onClick={toggleMobileMenu}>
                                    Sobre nós
                                </MobileMenuItem>

                                <MobileMenuItem href="/contact" onClick={toggleMobileMenu}>
                                    Contato
                                </MobileMenuItem>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    target,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; target?: React.HTMLAttributeAnchorTarget }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href} target={target}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

function MobileMenuItem({
    href,
    onClick,
    children,
    isSubItem = false,
}: {
    href: string
    onClick: () => void
    children: React.ReactNode
    isSubItem?: boolean
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "block rounded-md p-3 hover:bg-accent hover:text-accent-foreground transition-colors",
                isSubItem && "ml-4 text-sm"
            )}
        >
            <div className={cn(
                isSubItem ? "text-sm" : "text-base font-medium",
                "text-foreground"
            )}>
                {children}
            </div>
        </Link>
    )
}
