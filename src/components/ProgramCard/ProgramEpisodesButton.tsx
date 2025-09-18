import * as React from "react";
import { PrismicNextLink } from "@prismicio/next";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isFilled } from "@prismicio/client";
import type { LinkField } from "@prismicio/client";

interface ProgramEpisodesButtonProps {
    episodesLink: LinkField;
    buttonText?: string;
    variant?: "default" | "single";
}

const ProgramEpisodesButton: React.FC<ProgramEpisodesButtonProps> = ({
    episodesLink,
    buttonText = "Ver Episódios",
    variant = "default"
}) => {
    if (!isFilled.link(episodesLink)) {
        return null;
    }

    const isSingleVariant = variant === "single";

    return (
        <CardFooter className={`${isSingleVariant ? "pt-0 mt-auto px-0" : "pt-0 mt-auto"}`}>
            <PrismicNextLink field={episodesLink} className="w-full">
                <Button
                    variant="outline"
                    size="lg"
                    className={`w-full group/btn relative overflow-hidden border-2 border-primary/40 bg-transparent hover:bg-transparent hover:border-primary/70 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/25 ${isSingleVariant ? "py-4 lg:py-6" : "py-6"}`}
                >
                    {/* Button background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/8 to-primary/15 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 animate-pulse" />

                    <span className={`relative z-10 font-bold ${isSingleVariant ? "text-base lg:text-lg" : "text-base"} text-foreground group-hover/btn:text-primary transition-colors duration-300 flex items-center justify-center gap-3`}>
                        {episodesLink.text || buttonText}
                        <svg
                            className={`${isSingleVariant ? "w-5 h-5" : "w-5 h-5"} transition-transform duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </Button>
            </PrismicNextLink>
        </CardFooter>
    );
};

export default ProgramEpisodesButton;
