import * as React from "react";
import { Card } from "@/components/ui/card";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { PresentersTeamSliceDefaultPrimaryPresentersItem } from "../../../prismicio-types";

import PresenterAvatar from "./PresenterAvatar";
import PresenterBio from "./PresenterBio";
import PresenterSocial from "./PresenterSocial";

interface PresenterCardProps {
    presenter: PresentersTeamSliceDefaultPrimaryPresentersItem;
    index: number;
    variant?: "default" | "single";
}

const PresenterCard: React.FC<PresenterCardProps> = ({
    presenter,
    index,
    variant = "default"
}) => {
    const isSingleVariant = variant === "single";

    return (
        <Card
            className={`group bg-gradient-to-br from-card/90 via-card/70 to-primary/8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/15 border border-primary/30 hover:border-primary/50 h-full flex flex-col ${isSingleVariant
                ? "min-h-[400px] lg:min-h-[500px] w-full"
                : ""
                }`}
            style={{
                animationDelay: `${index * 300}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
            }}
        >
            {/* Gradient overlay for hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-secondary/3 to-accent/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

            {isSingleVariant ? (
                /* Layout Horizontal Premium para variante Single */
                <div className="flex flex-col lg:flex-row h-full min-h-[500px] lg:min-h-[600px]">
                    {/* Seção da Foto - Lado Esquerdo */}
                    <div className="lg:w-2/5 lg:flex-shrink-0 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 opacity-50" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)]" />

                        {/* Avatar Centralizado */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-12">
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 rounded-full blur-xl opacity-60 animate-pulse" />

                                {/* Avatar */}
                                <div className="relative">
                                    {isFilled.image(presenter.presenter_photo) && (
                                        <div className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
                                            <PrismicNextImage
                                                field={presenter.presenter_photo}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                        </div>
                                    )}

                                    {/* Floating Elements */}
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" />
                                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full animate-ping" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seção do Conteúdo - Lado Direito */}
                    <div className="lg:w-3/5 flex flex-col justify-center p-6 lg:p-8 xl:p-12">
                        <div className="space-y-6">
                            {/* Nome */}
                            {isFilled.keyText(presenter.presenter_name) && (
                                <div>
                                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight">
                                        <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
                                            {presenter.presenter_name}
                                        </span>
                                    </h3>
                                </div>
                            )}

                            {/* Cargo */}
                            {isFilled.keyText(presenter.presenter_role) && (
                                <div>
                                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                                        <span className="text-sm lg:text-base font-medium text-primary">
                                            {presenter.presenter_role}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Bio */}
                            <PresenterBio
                                bio={presenter.presenter_bio}
                                variant={variant}
                            />
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 pt-6 border-t border-border/50">
                            <PresenterSocial
                                socialLinks={presenter.presenter_social_links}
                                variant={variant}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                /* Layout Vertical para variante Default */
                <>
                    {/* Presenter Avatar */}
                    <PresenterAvatar
                        photo={presenter.presenter_photo}
                        name={presenter.presenter_name}
                        role={presenter.presenter_role}
                        variant={variant}
                    />

                    {/* Presenter Bio */}
                    <PresenterBio
                        bio={presenter.presenter_bio}
                        variant={variant}
                    />

                    {/* Presenter Social */}
                    <PresenterSocial
                        socialLinks={presenter.presenter_social_links}
                        variant={variant}
                    />
                </>
            )}
        </Card>
    );
};

export default PresenterCard;
