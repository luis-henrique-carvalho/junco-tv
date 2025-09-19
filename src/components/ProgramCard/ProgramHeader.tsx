import * as React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { isFilled } from "@prismicio/client";
import type { KeyTextField } from "@prismicio/client";

interface ProgramHeaderProps {
    title: KeyTextField;
    variant?: "default" | "single";
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ title, variant = "default" }) => {
    if (!isFilled.keyText(title)) {
        return null;
    }

    const isSingleVariant = variant === "single";

    return (
        <CardHeader className={`${isSingleVariant ? "pb-4 lg:pb-6 px-0" : "pb-4 lg:pb-6"}`}>
            <CardTitle className={`${isSingleVariant ? "text-2xl lg:text-3xl xl:text-4xl" : "text-2xl lg:text-3xl"} font-bold leading-tight`}>
                <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
                    {title}
                </span>
            </CardTitle>
        </CardHeader>
    );
};

export default ProgramHeader;
