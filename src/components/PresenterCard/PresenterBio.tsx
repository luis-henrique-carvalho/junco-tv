import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { CardContent } from "@/components/ui/card";
import { isFilled } from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";

interface PresenterBioProps {
    bio: RichTextField;
    variant?: "default" | "single";
}

const PresenterBio: React.FC<PresenterBioProps> = ({ bio, variant = "default" }) => {
    if (!isFilled.richText(bio)) {
        return null;
    }

    const isSingleVariant = variant === "single";

    return (
        <CardContent className={`${isSingleVariant ? "flex-1 px-0 pb-0" : "flex-1 px-3 pb-2"}`}>
            <div className={`${isSingleVariant ? "text-base lg:text-lg xl:text-xl" : "text-sm"} ${isSingleVariant ? "text-muted-foreground/90" : "text-muted-foreground"} leading-relaxed ${isSingleVariant ? "text-left" : "text-center"}`}>
                <PrismicRichText
                    field={bio}
                    components={{
                        paragraph: ({ children }: { children: React.ReactNode }) => (
                            <p className={`${isSingleVariant ? "line-clamp-4 lg:line-clamp-6" : "line-clamp-5"} mb-0`}>{children}</p>
                        ),
                        strong: ({ children }: { children: React.ReactNode }) => (
                            <strong className="font-semibold text-foreground">{children}</strong>
                        ),
                        em: ({ children }: { children: React.ReactNode }) => (
                            <em className="italic text-primary/80">{children}</em>
                        ),
                        heading1: ({ children }: { children: React.ReactNode }) => (
                            <h1 className={`${isSingleVariant ? "text-lg lg:text-xl" : "text-base"} font-bold text-foreground mb-2`}>{children}</h1>
                        ),
                        heading2: ({ children }: { children: React.ReactNode }) => (
                            <h2 className={`${isSingleVariant ? "text-base lg:text-lg" : "text-sm"} font-bold text-foreground mb-2`}>{children}</h2>
                        ),
                        heading3: ({ children }: { children: React.ReactNode }) => (
                            <h3 className={`${isSingleVariant ? "text-sm lg:text-base" : "text-xs"} font-bold text-foreground mb-1`}>{children}</h3>
                        ),
                        hyperlink: ({ children, node }: { children: React.ReactNode; node: any }) => (
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
                            <li className={`${isSingleVariant ? "text-base lg:text-lg" : "text-sm"} leading-relaxed ml-4`}>{children}</li>
                        ),
                        oListItem: ({ children }: { children: React.ReactNode }) => (
                            <li className={`${isSingleVariant ? "text-base lg:text-lg" : "text-sm"} leading-relaxed ml-4`}>{children}</li>
                        ),
                    }}
                />
            </div>
        </CardContent>
    );
};

export default PresenterBio;
