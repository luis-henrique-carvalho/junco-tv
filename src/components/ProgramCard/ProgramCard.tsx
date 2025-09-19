import * as React from "react";
import { Card } from "@/components/ui/card";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
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
                /* Layout Horizontal Premium para variante Single */
                <div className="flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[600px]">
                    {/* Seção da Imagem - Lado Esquerdo */}
                    <div className="lg:w-2/5 lg:flex-shrink-0 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 opacity-50" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)]" />

                        {/* Imagem Centralizada */}
                        <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-12">
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 rounded-2xl blur-xl opacity-60 animate-pulse" />

                                {/* Container da Imagem */}
                                <div className="relative">
                                    {isFilled.image(program.program_image) && (
                                        <div className="w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl">
                                            <PrismicNextImage
                                                field={program.program_image}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                        </div>
                                    )}

                                    {/* Floating Elements */}
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" />
                                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full animate-ping" />

                                    {/* Program Type Badge */}
                                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                        <div className="px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                                            <span className="text-xs font-semibold text-primary-foreground">
                                                {programType}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seção do Conteúdo - Lado Direito */}
                    <div className="lg:w-3/5 flex flex-col justify-center p-6 lg:p-8 xl:p-12">
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
                        <div className="mt-8 pt-6 border-t border-border/50">
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
