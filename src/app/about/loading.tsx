import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Hero Section Loading */}
            <section className="relative min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-muted animate-pulse" />
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <Skeleton className="h-16 w-96 mx-auto mb-6" />
                    <Skeleton className="h-8 w-80 mx-auto mb-8" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
            </section>

            {/* Content Sections Loading */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-64 mx-auto mb-6" />
                        <Skeleton className="h-6 w-96 mx-auto mb-4" />
                        <Skeleton className="h-6 w-80 mx-auto" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="flex items-start">
                                    <Skeleton className="w-16 h-16 rounded-full flex-shrink-0 mr-8" />
                                    <div className="flex-1">
                                        <Skeleton className="h-6 w-48 mb-3" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section Loading */}
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-64 mx-auto mb-6" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="bg-card rounded-xl p-8 shadow-lg border">
                                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
                                <Skeleton className="h-6 w-32 mx-auto mb-4" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section Loading */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-64 mx-auto mb-6" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="bg-card rounded-xl p-6 shadow-lg border">
                                    <div className="flex items-center mb-4">
                                        <Skeleton className="w-12 h-12 rounded-full mr-4" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
