import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FloatingParticles from "@/components/layout/floating-particles";
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

/**
 * Props for `PresentersTeam`.
 */
export type PresentersTeamProps = SliceComponentProps<Content.PresentersTeamSlice>;

/**
 * Component for "PresentersTeam" Slices.
 */
const PresentersTeam: React.FC<PresentersTeamProps> = ({ slice }) => {
  const { primary } = slice;

  return (
    <section
      className="py-16 lg:py-20"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FloatingParticles />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
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
                  )

                }}
              />
            </div>
          )}
        </div>
        {/* Presenters Grid */}
        {isFilled.group(primary.presenters) && primary.presenters.length > 0 && (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {primary.presenters.map((presenter: Content.PresentersTeamSliceDefaultPrimaryPresentersItem, index: number) => (
              <Card
                key={index}
                style={{
                  animationDelay: `${index * 300}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
                className="group bg-gradient-to-br from-card/90 via-card/70 to-primary/8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/15 border border-primary/30 hover:border-primary/50 h-full flex flex-col"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-secondary/3 to-accent/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                <CardHeader className="text-center pb-6 flex-shrink-0 px-4">
                  {/* Avatar */}
                  {isFilled.image(presenter.presenter_photo) && (
                    <div className="mx-auto mb-4">
                      <Avatar className="w-20 h-20 md:w-24 md:h-24 ring-2 ring-primary/10">
                        <AvatarImage
                          src={presenter.presenter_photo.url}
                          alt={presenter.presenter_photo.alt || ""}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          {isFilled.keyText(presenter.presenter_name)
                            ? presenter.presenter_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                            : 'PR'
                          }
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}

                  {/* Name */}
                  {isFilled.keyText(presenter.presenter_name) && (
                    <CardTitle className="text-lg md:text-xl font-bold text-foreground mb-2 leading-tight px-2">
                      {presenter.presenter_name}
                    </CardTitle>
                  )}

                  {/* Role */}
                  {isFilled.keyText(presenter.presenter_role) && (
                    <div className="px-2 flex justify-center items-center">
                      <Badge variant="secondary" className="text-xs px-2 py-1 font-medium max-w-full truncate">
                        {presenter.presenter_role}
                      </Badge>
                    </div>
                  )}
                </CardHeader>

                {/* Bio */}
                {isFilled.richText(presenter.presenter_bio) && (
                  <CardContent className="flex-1 px-3 pb-2">
                    <div className="text-sm text-muted-foreground leading-relaxed text-center">
                      <PrismicRichText
                        field={presenter.presenter_bio}
                        components={{
                          paragraph: ({ children }: { children: React.ReactNode }) => (
                            <p className="line-clamp-5 mb-0">{children}</p>
                          ),
                          strong: ({ children }: { children: React.ReactNode }) => (
                            <strong className="font-semibold text-foreground">{children}</strong>
                          ),
                          em: ({ children }: { children: React.ReactNode }) => (
                            <em className="italic text-primary/80">{children}</em>
                          ),
                        }}
                      />
                    </div>
                  </CardContent>
                )}

                {/* Social Links */}
                {isFilled.group(presenter.presenter_social_links) && presenter.presenter_social_links.length > 0 && (
                  <CardFooter className="justify-center pt-4 pb-2 flex-shrink-0">
                    <div className="flex gap-3">
                      {presenter.presenter_social_links.map((socialLink: Content.PresentersTeamSliceDefaultPrimaryPresentersPresenterSocialLinksItem, socialIndex: number) => (
                        isFilled.link(socialLink.social_url) && isFilled.select(socialLink.social_platform) && (
                          <PrismicNextLink
                            key={socialIndex}
                            field={socialLink.social_url}
                            className="p-3 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <SocialIcon platform={socialLink.social_platform} />
                          </PrismicNextLink>
                        )
                      ))}
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PresentersTeam;
