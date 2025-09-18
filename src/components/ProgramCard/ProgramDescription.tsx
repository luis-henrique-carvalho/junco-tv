import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { CardContent } from "@/components/ui/card";
import { isFilled } from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";

// Define o tipo específico para o node do hyperlink
interface HyperlinkNode {
    data: {
        url?: string;
        target?: string;
    };
}

interface ProgramDescriptionProps {
    description: RichTextField;
    variant?: "default" | "single";
}

const ProgramDescription: React.FC<ProgramDescriptionProps> = ({ description, variant = "default" }) => {
    if (!isFilled.richText(description)) {
        return null;
    }

    const isSingleVariant = variant === "single";

    return (
        <CardContent className={`${isSingleVariant ? "pb-4 lg:pb-6 px-0" : "pb-6"} flex-1`}>
            <div className="text-muted-foreground/90 group-hover:text-muted-foreground transition-colors duration-300">
                <PrismicRichText
                    field={description}
                    components={{
                        paragraph: ({ children }: { children: React.ReactNode }) => (
                            <p className={`${isSingleVariant ? "text-base lg:text-lg xl:text-xl" : "text-base lg:text-lg"} leading-relaxed ${isSingleVariant ? "line-clamp-6 lg:line-clamp-8" : "line-clamp-5 lg:line-clamp-6"} mb-3`}>{children}</p>
                        ),
                        heading1: ({ children }: { children: React.ReactNode }) => (
                            <h1 className="text-lg lg:text-xl font-bold text-foreground mb-3">{children}</h1>
                        ),
                        heading2: ({ children }: { children: React.ReactNode }) => (
                            <h2 className="text-base lg:text-lg font-bold text-foreground mb-3">{children}</h2>
                        ),
                        heading3: ({ children }: { children: React.ReactNode }) => (
                            <h3 className="text-sm font-bold text-foreground mb-1">{children}</h3>
                        ),
                        heading4: ({ children }: { children: React.ReactNode }) => (
                            <h4 className="text-sm font-bold text-foreground mb-1">{children}</h4>
                        ),
                        heading5: ({ children }: { children: React.ReactNode }) => (
                            <h5 className="text-xs font-bold text-foreground mb-1">{children}</h5>
                        ),
                        heading6: ({ children }: { children: React.ReactNode }) => (
                            <h6 className="text-xs font-bold text-foreground mb-1">{children}</h6>
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
                                className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-200"
                                target={node.data.target || undefined}
                                rel={node.data.target === "_blank" ? "noopener noreferrer" : undefined}
                            >
                                {children}
                            </a>
                        ),
                        listItem: ({ children }: { children: React.ReactNode }) => (
                            <li className="text-base leading-relaxed ml-4">{children}</li>
                        ),
                        oListItem: ({ children }: { children: React.ReactNode }) => (
                            <li className="text-base leading-relaxed ml-4">{children}</li>
                        ),
                        preformatted: ({ children }: { children: React.ReactNode }) => (
                            <pre className="bg-muted/50 p-3 rounded-lg text-sm overflow-x-auto border border-border/50">{children}</pre>
                        ),
                    }}
                />
            </div>
        </CardContent>
    );
};

export default ProgramDescription;
