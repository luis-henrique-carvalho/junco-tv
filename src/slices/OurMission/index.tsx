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
 * Props for `OurMission`.
 */
export type OurMissionProps = SliceComponentProps<Content.OurMissionSlice>;

/**
 * Component for "OurMission" Slices.
 */
const OurMission: React.FC<OurMissionProps> = ({ slice }) => {
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
                </div>

                {/* Mission and Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto">
                    {/* Mission */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-primary/10 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative z-10">
                            {isFilled.keyText(primary.mission_title) && (
                                <h3 className="text-2xl font-bold mb-6 text-foreground">
                                    {primary.mission_title}
                                </h3>
                            )}

                            {isFilled.richText(primary.mission_description) && (
                                <div className="prose prose-lg max-w-none text-muted-foreground">
                                    <PrismicRichText
                                        field={primary.mission_description}
                                        components={{
                                            paragraph: ({ children }: { children: React.ReactNode }) => (
                                                <p className="text-lg leading-relaxed mb-4">{children}</p>
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

                    {/* Vision */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-secondary/10 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative z-10">
                            {isFilled.keyText(primary.vision_title) && (
                                <h3 className="text-2xl font-bold mb-6 text-foreground">
                                    {primary.vision_title}
                                </h3>
                            )}

                            {isFilled.richText(primary.vision_description) && (
                                <div className="prose prose-lg max-w-none text-muted-foreground">
                                    <PrismicRichText
                                        field={primary.vision_description}
                                        components={{
                                            paragraph: ({ children }: { children: React.ReactNode }) => (
                                                <p className="text-lg leading-relaxed mb-4">{children}</p>
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
                </div>

                {/* Goals */}
                {isFilled.group(primary.goal_item) && primary.goal_item.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {primary.goal_item.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-accent/10 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
                                    style={{
                                        animationDelay: `${index * 200}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <div className="relative z-10 text-center">
                                        {/* Icon */}
                                        {isFilled.image(item.icon) && (
                                            <div className="mb-6 flex justify-center">
                                                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                                                    <PrismicNextImage
                                                        field={item.icon}
                                                        className="w-8 h-8"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Title */}
                                        {isFilled.keyText(item.title) && (
                                            <h4 className="text-xl font-bold mb-4 text-foreground">
                                                {item.title}
                                            </h4>
                                        )}

                                        {/* Description */}
                                        {isFilled.richText(item.description) && (
                                            <div className="prose prose-sm max-w-none text-muted-foreground">
                                                <PrismicRichText
                                                    field={item.description}
                                                    components={{
                                                        paragraph: ({ children }: { children: React.ReactNode }) => (
                                                            <p className="text-base leading-relaxed">{children}</p>
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurMission;
