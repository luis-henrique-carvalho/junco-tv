import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Mail, Phone, Instagram, Twitter, Linkedin, Facebook, Youtube, Globe } from "lucide-react";
import FloatingParticles from "@/components/layout/floating-particles";

// Define the type for hyperlink nodes
interface HyperlinkNode {
    data: {
        url?: string;
        target?: string;
    };
}

/**
 * Props for `ContactSection`.
 */
export type ContactSectionProps = SliceComponentProps<Content.ContactSectionSlice>;

const getSocialIcon = (platform: string) => {
    switch (platform) {
        case "Instagram":
            return Instagram;
        case "Twitter":
            return Twitter;
        case "LinkedIn":
            return Linkedin;
        case "Facebook":
            return Facebook;
        case "YouTube":
            return Youtube;
        case "Website":
            return Globe;
        default:
            return Globe;
    }
};

/**
 * Component for "ContactSection" Slices.
 */
const ContactSection: React.FC<ContactSectionProps> = ({ slice }) => {
    const { primary } = slice;

    return (
        <section
            className="relative overflow-hidden py-8 lg:py-16"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            {/* Floating particles background */}
            <FloatingParticles />

            <div className="container mx-auto px-5 relative z-10">
                {/* Header Section */}
                <div className="text-center space-y-6 mb-6">
                    {/* Title */}
                    {isFilled.keyText(primary.title) && (
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {primary.title}
                            </span>
                        </h2>
                    )}

                    {/* Description */}
                    {isFilled.richText(primary.description) && (
                        <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
                            <PrismicRichText
                                field={primary.description}
                                components={{
                                    paragraph: ({ children }: { children: React.ReactNode }) => (
                                        <p className="text-lg leading-relaxed">{children}</p>
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

                {/* Contact Information */}
                <div className="max-w-4xl mx-auto">
                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* Email */}
                        {isFilled.keyText(primary.email) && (
                            <div className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                                <div className="relative bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                                                <Mail className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Email</h3>
                                            <a
                                                href={`mailto:${primary.email}`}
                                                className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 block truncate"
                                            >
                                                {primary.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {isFilled.keyText(primary.phone) && (
                            <div className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                                <div className="relative bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-secondary/30 transition-all duration-300">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center shadow-lg">
                                                <Phone className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Telefone</h3>
                                            <a
                                                href={`tel:${primary.phone}`}
                                                className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 block"
                                            >
                                                {primary.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Social Links */}
                    {isFilled.group(primary.social_links) && primary.social_links.length > 0 && (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-foreground mb-6">
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Siga-nos
                                </span>
                            </h3>
                            <div className="flex justify-center flex-wrap gap-4">
                                {primary.social_links.map((social, index) => {
                                    const IconComponent = getSocialIcon(social.platform || "");

                                    return (
                                        <div key={index}>
                                            {isFilled.link(social.url) && (
                                                <PrismicNextLink
                                                    field={social.url}
                                                    className="group relative inline-flex items-center justify-center w-12 h-12 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    <IconComponent className="w-5 h-5 relative z-10" />
                                                </PrismicNextLink>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
