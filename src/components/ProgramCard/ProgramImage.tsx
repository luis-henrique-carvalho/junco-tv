import * as React from "react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { ImageField } from "@prismicio/client";

interface ProgramImageProps {
    image: ImageField;
    programType?: string;
    variant?: "default" | "single";
}

const ProgramImage: React.FC<ProgramImageProps> = ({
    image,
    programType = "PODCAST",
    variant = "default"
}) => {
    if (!isFilled.image(image)) {
        return null;
    }

    const isSingleVariant = variant === "single";

    return (
        <div className={`relative overflow-hidden ${isSingleVariant ? "h-full" : ""}`}>
            <PrismicNextImage
                field={image}
                alt=""
                className={`w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 ${isSingleVariant
                    ? "h-full min-h-[300px] lg:min-h-[400px]"
                    : "h-56 lg:h-64"
                    }`}
            />

            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />

            {/* Floating accent elements */}
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
            <div className="absolute top-6 left-4 w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-80 transition-all duration-700 animate-ping" />

            {/* Program type badge */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <span className="text-xs font-semibold text-primary-foreground">
                        {programType}
                    </span>
                </div>
            </div>

            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100" />
        </div>
    );
};

export default ProgramImage;
