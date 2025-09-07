import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FloatingParticles from "@/components/layout/floating-particles";

/**
 * Loading component for individual news article pages
 * Following the user's preference for a standard loading component [[memory:8364193]]
 */
export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Hero Section Skeleton */}
            <section className="relative overflow-hidden py-8 lg:py-12">
                <FloatingParticles />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Back Button Skeleton */}
                    <div className="mb-8">
                        <Skeleton className="h-10 w-40" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Article Header Skeleton */}
                        <div className="space-y-6 mb-8">
                            {/* Category and Meta Info Skeleton */}
                            <div className="flex flex-wrap items-center gap-4">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />

                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>

                            {/* Title Skeleton */}
                            <div className="space-y-4">
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-4/5" />
                                <Skeleton className="h-12 w-2/3" />
                            </div>

                            {/* Subtitle Skeleton */}
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-3/4" />
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-9 w-32" />
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content Skeleton */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Card className="overflow-hidden">
                            {/* Featured Image Skeleton */}
                            <Skeleton className="w-full aspect-video md:aspect-[2/1]" />

                            <CardContent className="p-8 md:p-12">
                                {/* Excerpt Skeleton */}
                                <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-4/5" />
                                        <Skeleton className="h-6 w-3/5" />
                                    </div>
                                </div>

                                {/* Separator */}
                                <Skeleton className="h-px w-full my-8" />

                                {/* Article Body Skeleton */}
                                <div className="space-y-6">
                                    {/* First paragraph */}
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-4/5" />
                                        <Skeleton className="h-6 w-3/4" />
                                    </div>

                                    {/* Heading */}
                                    <Skeleton className="h-10 w-2/3 mt-10" />

                                    {/* Second paragraph */}
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-5/6" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-2/3" />
                                    </div>

                                    {/* Sub heading */}
                                    <Skeleton className="h-8 w-1/2 mt-8" />

                                    {/* Third paragraph */}
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-4/5" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-3/5" />
                                        <Skeleton className="h-6 w-5/6" />
                                    </div>

                                    {/* List skeleton */}
                                    <div className="space-y-2 pl-6">
                                        <Skeleton className="h-5 w-4/5" />
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-5 w-5/6" />
                                        <Skeleton className="h-5 w-2/3" />
                                    </div>

                                    {/* Fourth paragraph */}
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-6 w-5/6" />
                                    </div>

                                    {/* Quote or highlight skeleton */}
                                    <div className="my-8 p-6 border-l-4 border-primary bg-primary/5">
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-full" />
                                            <Skeleton className="h-6 w-4/5" />
                                        </div>
                                    </div>

                                    {/* Final paragraphs */}
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-5/6" />
                                        <Skeleton className="h-6 w-3/4" />
                                    </div>

                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-4/5" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-2/3" />
                                    </div>
                                </div>

                                {/* Tags Section Skeleton */}
                                <div className="mt-12 pt-8 border-t">
                                    <Skeleton className="h-4 w-12 mb-4" />
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Skeleton key={index} className="h-6 w-20 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Back to News Button Skeleton */}
                        <div className="text-center mt-12">
                            <Skeleton className="h-12 w-64 mx-auto" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
