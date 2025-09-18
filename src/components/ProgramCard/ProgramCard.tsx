import * as React from "react";
import { Card } from "@/components/ui/card";
import type { ProgramsListSliceDefaultPrimaryProgramItem } from "../../../prismicio-types";

import ProgramImage from "./ProgramImage";
import ProgramHeader from "./ProgramHeader";
import ProgramDescription from "./ProgramDescription";
import ProgramEpisodesButton from "./ProgramEpisodesButton";

interface ProgramCardProps {
    program: ProgramsListSliceDefaultPrimaryProgramItem;
    index: number;
    programType?: string;
    buttonText?: string;
    variant?: "default" | "single";
}

const ProgramCard: React.FC<ProgramCardProps> = ({
    program,
    index,
    programType = "PODCAST",
    buttonText = "Ver Episódios",
    variant = "default"
}) => {
    const isSingleVariant = variant === "single";

    return (
        <Card
            className={`group relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-primary/8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/15 border border-primary/30 hover:border-primary/50 ${isSingleVariant
                ? "min-h-[500px] lg:min-h-[600px] w-full"
                : "min-h-[420px] lg:min-h-[480px]"
                }`}
            style={{
                animationDelay: `${index * 300}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
            }}
        >
            {/* Gradient overlay for hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-secondary/3 to-accent/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {isSingleVariant ? (
                /* Layout Horizontal para variante Single */
                <div className="flex flex-col lg:flex-row h-full">
                    {/* Imagem à esquerda */}
                    <div className="lg:w-1/2 lg:flex-shrink-0">
                        <ProgramImage
                            image={program.program_image}
                            programType={programType}
                            variant={variant}
                        />
                    </div>

                    {/* Conteúdo à direita */}
                    <div className="lg:w-1/2 flex flex-col justify-between p-6 lg:p-8">
                        <div className="space-y-6">
                            {/* Program Header */}
                            <ProgramHeader
                                title={program.program_title}
                                variant={variant}
                            />

                            {/* Program Description */}
                            <ProgramDescription
                                description={program.program_description}
                                variant={variant}
                            />
                        </div>

                        {/* Episodes Link */}
                        <div className="mt-8">
                            <ProgramEpisodesButton
                                episodesLink={program.program_episodes_list}
                                buttonText={buttonText}
                                variant={variant}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                /* Layout Vertical para variante Default */
                <>
                    {/* Program Image */}
                    <ProgramImage
                        image={program.program_image}
                        programType={programType}
                        variant={variant}
                    />

                    {/* Program Header */}
                    <ProgramHeader
                        title={program.program_title}
                        variant={variant}
                    />

                    {/* Program Description */}
                    <ProgramDescription
                        description={program.program_description}
                        variant={variant}
                    />

                    {/* Episodes Link */}
                    <ProgramEpisodesButton
                        episodesLink={program.program_episodes_list}
                        buttonText={buttonText}
                        variant={variant}
                    />
                </>
            )}
        </Card>
    );
};

export default ProgramCard;
