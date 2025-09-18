import * as React from "react";
import { PrismicNextLink } from "@prismicio/next";
import { CardFooter } from "@/components/ui/card";
import { isFilled } from "@prismicio/client";
import type { GroupField } from "@prismicio/client";
import { Instagram, Twitter, Linkedin, Facebook, Youtube, Globe, Link } from "lucide-react";

// Social media icons components using Lucide React
const SocialIcon = ({ platform }: { platform: string }) => {
    const iconProps = {
        className: "w-4 h-4"
    };

    switch (platform?.toLowerCase()) {
        case 'instagram':
            return <Instagram {...iconProps} />;
        case 'twitter':
            return <Twitter {...iconProps} />;
        case 'linkedin':
            return <Linkedin {...iconProps} />;
        case 'facebook':
            return <Facebook {...iconProps} />;
        case 'youtube':
            return <Youtube {...iconProps} />;
        case 'website':
            return <Globe {...iconProps} />;
        case 'tiktok':
            // TikTok não tem ícone específico no Lucide, usando ícone genérico
            return <Link {...iconProps} />;
        default:
            return <Link {...iconProps} />;
    }
};

interface PresenterSocialProps {
    socialLinks: GroupField;
    variant?: "default" | "single";
}

const PresenterSocial: React.FC<PresenterSocialProps> = ({ socialLinks, variant = "default" }) => {
    if (!isFilled.group(socialLinks) || socialLinks.length === 0) {
        return null;
    }

    const isSingleVariant = variant === "single";

    return (
        <CardFooter className={`${isSingleVariant ? "justify-start pt-0 pb-0 px-0" : "justify-center pt-4 pb-2 flex-shrink-0"}`}>
            <div className={`flex ${isSingleVariant ? "gap-3" : "gap-3"}`}>
                {socialLinks.map((socialLink: any, socialIndex: number) => (
                    isFilled.link(socialLink.social_url) && isFilled.select(socialLink.social_platform) && (
                        <PrismicNextLink
                            key={socialIndex}
                            field={socialLink.social_url}
                            className={`${isSingleVariant ? "p-3 lg:p-4" : "p-3"} rounded-full bg-muted/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 border border-border/50 hover:border-primary/30`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SocialIcon platform={socialLink.social_platform} />
                        </PrismicNextLink>
                    )
                ))}
            </div>
        </CardFooter>
    );
};

export default PresenterSocial;
