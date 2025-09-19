import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
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
 * Props for `HeroAbout`.
 */
export type HeroAboutProps = SliceComponentProps<Content.HeroAboutSlice>;

/**
 * Component for "HeroAbout" Slices.
 */
const HeroAbout: React.FC<HeroAboutProps> = ({ slice }) => {
    const { primary } = slice;

    return (
        <section
            className="relative overflow-hidden py-8 lg:py-16"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            {/* Floating particles background */}
            <FloatingParticles />

            <div className="container mx-auto px-5 relative z-10">
                <div className="text-center space-y-8 max-w-5xl mx-auto">
                    {/* Subtitle Badge */}
                    {isFilled.keyText(primary.subtitle) && (
                        <div className="flex justify-center">
                            <div className="group relative">
                                {/* Animated glow background */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-all duration-700 animate-pulse"></div>

                                {/* Main badge */}
                                <div className="relative flex items-center space-x-3 bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-xl rounded-xl px-6 py-3 border border-primary/30 shadow-xl animate-float-subtle">
                                    {/* Shimmer overlay effect */}
                                    <div className="absolute inset-0 rounded-xl animate-shimmer opacity-30"></div>

                                    {/* Animated indicator dot */}
                                    <div className="relative z-10">
                                        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
                                        <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm animate-ping"></div>
                                    </div>

                                    {/* Badge text */}
                                    <span className="relative z-10 text-sm font-semibold text-foreground/90 tracking-wider uppercase">
                                        {primary.subtitle}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Title */}
                    {isFilled.keyText(primary.title) && (
                        <div className="relative group">
                            <div className="relative">
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none">
                                    {/* Main gradient text with multiple effects */}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent bg-size-200 animate-gradient filter drop-shadow-2xl">
                                            {primary.title}
                                        </span>
                                    </span>
                                </h1>

                                {/* Decorative underline effect */}
                                <div className="mt-6 flex justify-center">
                                    <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary rounded-full opacity-60 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {isFilled.richText(primary.description) && (
                        <div className="prose prose-lg max-w-5xl mx-auto text-muted-foreground">
                            <PrismicRichText
                                field={primary.description}
                                components={{
                                    paragraph: ({ children }: { children: React.ReactNode }) => (
                                        <p className="text-lg mb-5 leading-relaxed text-center">{children}</p>
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
            </div>
        </section>
    );
};

export default HeroAbout;
