import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import FloatingParticles from "@/components/layout/floating-particles";

// Define the type for hyperlink nodes
interface HyperlinkNode {
    data: {
        url?: string;
        target?: string;
    };
}

/**
 * Props for `OurStory`.
 */
export type OurStoryProps = SliceComponentProps<Content.OurStorySlice>;

/**
 * Component for "OurStory" Slices.
 */
const OurStory: React.FC<OurStoryProps> = ({ slice }) => {
    const { primary } = slice;

    return (
        <section
            className="relative overflow-hidden py-16 lg:py-24"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            {/* Floating particles background */}
            <FloatingParticles />

            <div className="container mx-auto px-5 relative z-10">
                {/* Header Section */}
                <div className="text-center space-y-6 mb-16">
                    {/* Title */}
                    {isFilled.keyText(primary.title) && (
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {primary.title}
                            </span>
                        </h2>
                    )}

                    {/* Description */}
                    {isFilled.richText(primary.description) && (
                        <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
                            <PrismicRichText
                                field={primary.description}
                                components={{
                                    paragraph: ({ children }: { children: React.ReactNode }) => (
                                        <p className="text-lg leading-relaxed">{children}</p>
                                    ),
                                    strong: ({ children }: { children: React.ReactNode }) => (
                                        <strong className="font-semibold text-foreground">{children}</strong>
                                    ),
                                    em: ({ children }: { children: React.ReactNode }) => (
                                        <em className="italic">{children}</em>
                                    ),
                                    hyperlink: ({ children, node }: { children: React.ReactNode; node: HyperlinkNode }) => (
                                        <a
                                            href={node.data.url || "#"}
                                            className="text-primary underline-offset-4 hover:underline"
                                            target={node.data.target || undefined}
                                            rel={node.data.target === "_blank" ? "noopener noreferrer" : undefined}
                                        >
                                            {children}
                                        </a>
                                    ),
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Main Image */}
                {isFilled.image(primary.main_image) && (
                    <div className="mb-16">
                        <div className="group relative w-full max-w-4xl mx-auto">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <PrismicNextImage
                                field={primary.main_image}
                                className="relative z-10 rounded-2xl shadow-2xl w-full"
                                priority
                                alt=""
                            />
                        </div>
                    </div>
                )}

                {/* Timeline */}
                {isFilled.group(primary.timeline_item) && primary.timeline_item.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

                            {/* Timeline items */}
                            <div className="space-y-12">
                                {primary.timeline_item.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative flex items-start space-x-8"
                                        style={{
                                            animationDelay: `${index * 200}ms`,
                                            animation: 'fadeInUp 0.6s ease-out forwards'
                                        }}
                                    >
                                        {/* Timeline dot */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white font-bold text-sm">
                                                    {item.year}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-50 animate-pulse"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-primary/10 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                                <div className="relative z-10">
                                                    {/* Title */}
                                                    {isFilled.keyText(item.title) && (
                                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                                            {item.title}
                                                        </h3>
                                                    )}

                                                    {/* Description */}
                                                    {isFilled.richText(item.description) && (
                                                        <div className="prose prose-sm max-w-none text-muted-foreground">
                                                            <PrismicRichText
                                                                field={item.description}
                                                                components={{
                                                                    paragraph: ({ children }: { children: React.ReactNode }) => (
                                                                        <p className="text-base leading-relaxed mb-2">{children}</p>
                                                                    ),
                                                                    strong: ({ children }: { children: React.ReactNode }) => (
                                                                        <strong className="font-semibold text-foreground">{children}</strong>
                                                                    ),
                                                                    em: ({ children }: { children: React.ReactNode }) => (
                                                                        <em className="italic">{children}</em>
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Image */}
                                                    {isFilled.image(item.image) && (
                                                        <div className="mt-4">
                                                            <PrismicNextImage
                                                                field={item.image}
                                                                className="rounded-lg shadow-md w-full max-w-sm"
                                                                alt=""
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurStory;
