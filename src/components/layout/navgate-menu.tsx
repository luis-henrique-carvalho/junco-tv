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

const programs: { title: string; href: string; description: string }[] = [
    {
        title: "Junco Cast",
        href: "/programs/junco-cast",
        description:
            "A podcast about the Junco project.",
    },
    {
        title: "SEALBA AgroCast",
        href: "/programs/sealba-agrocast",
        description:
            "A podcast about the SEALBA project.",
    },
]

export function NavigationMenuDemo() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="w-full mt-5">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center w-full">
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
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/about">Sobre nós</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/contact">Contato</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile Menu Button */}
                <div className="flex justify-start px-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={toggleMobileMenu}
                        className={cn(
                            "group relative overflow-hidden",
                            "bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-xl",
                            "border border-primary/20 shadow-lg rounded-xl",
                            "px-6 py-3 text-sm font-semibold",
                            "transition-all duration-300",
                            "hover:scale-105 hover:shadow-xl hover:border-primary/40",
                            "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
                        )}
                    >
                        {/* Shimmer overlay effect */}
                        <div className="absolute inset-0 rounded-xl animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                        {/* Icon and text */}
                        <div className="relative z-10 flex items-center gap-2">
                            {isMobileMenuOpen ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Menu className="h-4 w-4" />
                            )}
                            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                                Menu
                            </span>
                        </div>
                    </Button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl">
                        {/* Header with close button */}
                        <div className="flex justify-between items-center p-4 border-b border-primary/20 bg-gradient-to-r from-card/50 to-primary/10 backdrop-blur-sm">
                            <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Menu
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMobileMenu}
                                className="group relative overflow-hidden bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-xl border border-primary/20 shadow-md rounded-xl hover:scale-105 hover:shadow-lg hover:border-primary/40 transition-all duration-300"
                            >
                                <div className="absolute inset-0 rounded-xl animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                <X className="h-4 w-4 relative z-10" />
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
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
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
                "group relative block overflow-hidden rounded-xl",
                "bg-gradient-to-br from-card/60 to-primary/5 backdrop-blur-sm",
                "border border-primary/10 shadow-md",
                "transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-xl hover:border-primary/30",
                "hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10",
                "active:scale-[0.98]",
                isSubItem ? "p-3 ml-4" : "p-4"
            )}
        >
            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 rounded-xl animate-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Animated glow background */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
                <div className={cn(
                    isSubItem ? "text-sm" : "text-base font-semibold",
                    "bg-gradient-to-r from-foreground to-foreground/90 bg-clip-text text-transparent",
                    "group-hover:from-primary group-hover:to-secondary",
                    "transition-all duration-300"
                )}>
                    {children}
                </div>
            </div>

            {/* Decorative corner accent */}
            <div className={cn(
                "absolute top-2 right-2 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full",
                isSubItem ? "h-0.5 w-4" : "h-1 w-6"
            )} />
        </Link>
    )
}
