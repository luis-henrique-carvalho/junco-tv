import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { HeroStatsWithActionsSliceDefaultPrimary } from "../../../prismicio-types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeroStatsWithActionsProps {
  slice: {
    primary: HeroStatsWithActionsSliceDefaultPrimary;
  };
}

export default function HeroStatsWithActions({ slice }: HeroStatsWithActionsProps) {
  const { primary } = slice;

  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Title */}
            {isFilled.richText(primary.title) && (
              <div className="space-y-4">
                <PrismicRichText
                  field={primary.title}
                  components={{
                    heading1: ({ children }: { children: React.ReactNode }) => (
                      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {children}
                      </h1>
                    ),
                  }}
                />
              </div>
            )}

            {/* Description */}
            {isFilled.richText(primary.description) && (
              <div className="prose prose-lg max-w-none text-muted-foreground">
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
                    hyperlink: ({ children, node }: { children: React.ReactNode; node: any }) => (
                      <a
                        href={node.data.url}
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {isFilled.link(primary.primary_cta) && (
                <PrismicNextLink field={primary.primary_cta}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {primary.primary_cta.text || "Primary Action"}
                  </Button>
                </PrismicNextLink>
              )}

              {isFilled.link(primary.secondary_cta) && (
                <PrismicNextLink field={primary.secondary_cta}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {primary.secondary_cta.text || "Secondary Action"}
                  </Button>
                </PrismicNextLink>
              )}
            </div>

            {/* Statistics */}
            {isFilled.group(primary.stats) && primary.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {primary.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary lg:text-4xl">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground lg:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Column */}
          <div className="flex items-center justify-center">
            {isFilled.image(primary.main_media) && (
              <div className="relative w-full max-w-lg">
                <PrismicNextImage
                  field={primary.main_media}
                  className="rounded-2xl shadow-2xl"
                  priority
                  alt=""
                />
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        {isFilled.group(primary.features) && primary.features.length > 0 && (
          <div className="mt-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {primary.features.map((feature, index) => (
                <PrismicNextLink
                  key={index}
                  field={feature.link}
                  className="group block transition-transform hover:scale-105"
                >
                  <Card className="h-full border-0 bg-muted/50 shadow-sm transition-all hover:shadow-md">
                    <CardHeader className="pb-4">
                      {isFilled.image(feature.icon) && (
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                          <PrismicNextImage
                            field={feature.icon}
                            className="h-6 w-6"
                          />
                        </div>
                      )}
                      <CardTitle className="text-lg font-semibold group-hover:text-primary">
                        {feature.heading}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </PrismicNextLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
