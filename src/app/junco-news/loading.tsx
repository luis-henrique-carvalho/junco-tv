import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FloatingParticles from "@/components/layout/floating-particles";

/**
 * Loading component for the news index page
 * Following the user's preference for a standard loading component [[memory:8364193]]
 */
export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Hero Section Skeleton */}
            <section className="relative overflow-hidden py-16 lg:py-20 min-h-[60vh]">
                <FloatingParticles />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
                        {/* Content Column */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div className="space-y-6">
                                {/* Subtitle Badge Skeleton */}
                                <div className="flex justify-center lg:justify-start">
                                    <Skeleton className="h-10 w-48 rounded-xl" />
                                </div>

                                {/* Main Title Skeleton */}
                                <div className="space-y-4">
                                    <Skeleton className="h-16 w-full max-w-lg mx-auto lg:mx-0" />
                                    <Skeleton className="h-16 w-3/4 max-w-md mx-auto lg:mx-0" />
                                </div>

                                {/* Decorative line */}
                                <div className="flex justify-center lg:justify-start">
                                    <Skeleton className="h-1 w-24 rounded-full" />
                                </div>
                            </div>

                            {/* Description Skeleton */}
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-4/5" />
                                <Skeleton className="h-6 w-3/5" />
                            </div>

                            {/* Search Bar Skeleton */}
                            <div className="flex justify-center lg:justify-start">
                                <Card className="p-1 w-full max-w-md">
                                    <Skeleton className="h-12 w-full rounded-md" />
                                </Card>
                            </div>
                        </div>

                        {/* Stats Column */}
                        <div className="flex flex-col space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <Skeleton className="w-3 h-3 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-6 w-12" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <Skeleton className="w-5 h-5" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-12" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Trending Topics Skeleton */}
                            <Card className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Skeleton className="w-5 h-5" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Articles Section Skeleton */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    {/* Header Skeleton */}
                    <div className="text-center space-y-6 mb-16">
                        <Skeleton className="h-12 w-64 mx-auto" />
                        <div className="space-y-3 max-w-3xl mx-auto">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-3/4 mx-auto" />
                        </div>
                    </div>

                    {/* Featured Articles Grid Skeleton */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="h-full flex flex-col overflow-hidden">
                                {/* Image Skeleton */}
                                <Skeleton className="w-full h-48" />

                                <CardContent className="flex-1 p-6 flex flex-col">
                                    {/* Title Skeleton */}
                                    <div className="space-y-2 mb-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-3/4" />
                                    </div>

                                    {/* Excerpt Skeleton */}
                                    <div className="space-y-2 mb-4 flex-1">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>

                                    {/* Separator */}
                                    <Skeleton className="h-px w-full my-4" />

                                    {/* Meta info Skeleton */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                            <Skeleton className="h-3 w-12" />
                                        </div>

                                        {/* Button Skeleton */}
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* View All Button Skeleton */}
                    <div className="text-center">
                        <Skeleton className="h-12 w-48 mx-auto" />
                    </div>
                </div>
            </section>

            {/* Articles Grid Section Skeleton */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    {/* Header Skeleton */}
                    <div className="text-center space-y-6 mb-12">
                        <Skeleton className="h-12 w-48 mx-auto" />
                    </div>

                    {/* Filters Skeleton */}
                    <div className="mb-8 space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <Skeleton className="h-9 w-80" />
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <Skeleton className="h-9 w-48" />
                            <Skeleton className="h-9 w-48" />
                            <Skeleton className="h-4 w-32 md:ml-auto" />
                        </div>
                    </div>

                    {/* Articles Grid Skeleton */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Card key={index} className="h-full flex flex-col overflow-hidden">
                                <Skeleton className="w-full h-48" />
                                <CardContent className="flex-1 p-6 flex flex-col">
                                    <div className="space-y-2 mb-3">
                                        <Skeleton className="h-5 w-full" />
                                        <Skeleton className="h-5 w-2/3" />
                                    </div>
                                    <div className="space-y-2 mb-4 flex-1">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-4/5" />
                                    </div>
                                    <Skeleton className="h-px w-full my-4" />
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                        <Skeleton className="h-9 w-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center">
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-10 w-20" />
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-10" />
                            ))}
                            <Skeleton className="h-10 w-16" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
