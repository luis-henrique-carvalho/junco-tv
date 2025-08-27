import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Social media icons components
const SocialIcon = ({ platform }: { platform: string }) => {
  const iconProps = {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 2
  };

  switch (platform?.toLowerCase()) {
    case 'instagram':
      return (
        <svg {...iconProps}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'twitter':
      return (
        <svg {...iconProps}>
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...iconProps}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...iconProps}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...iconProps}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...iconProps}>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case 'website':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
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
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="absolute top-40 right-20 h-1 w-1 rounded-full bg-secondary/50 animate-ping" />
        <div className="absolute bottom-40 left-20 h-1.5 w-1.5 rounded-full bg-accent/40 animate-bounce" />
        <div className="absolute top-60 left-1/3 h-1 w-1 rounded-full bg-primary/30 animate-pulse" />
        <div className="absolute bottom-20 right-1/3 h-2 w-2 rounded-full bg-secondary/40 animate-ping" />
      </div>

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
                className="hover:shadow-lg transition-shadow duration-300 border-border/50 h-full flex flex-col"
              >
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
