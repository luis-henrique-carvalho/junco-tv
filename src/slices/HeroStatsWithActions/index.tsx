import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { HeroStatsWithActionsSliceDefaultPrimary } from "../../../prismicio-types";
import { Button } from "@/components/ui/button";
import FloatingParticles from "@/components/layout/floating-particles";
interface HyperlinkNode {
  data: {
    url?: string;
    target?: string;
  };
}

interface HeroStatsWithActionsProps {
  slice: {
    primary: HeroStatsWithActionsSliceDefaultPrimary;
  };
}

export default function HeroStatsWithActions({ slice }: HeroStatsWithActionsProps) {
  const { primary } = slice;

  return (
    <section className="relative overflow-hidden  py-16 lg:py-24">
      {/* Floating particles background */}
      <FloatingParticles />

      <div className="container mx-auto px-5">
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
                      <h1 className="group relative text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {children}
                        </span>
                      </h1>
                    ),
                    strong: ({ children }: { children: React.ReactNode }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {isFilled.link(primary.primary_cta) && (
                <PrismicNextLink field={primary.primary_cta}>
                  <Button
                    size="lg"
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-primary to-secondary px-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto"
                  >
                    <span className="relative z-10 font-semibold">
                      {primary.primary_cta.text || "Primary Action"}
                    </span>
                  </Button>
                </PrismicNextLink>
              )}

              {isFilled.link(primary.secondary_cta) && (
                <PrismicNextLink field={primary.secondary_cta}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative w-full overflow-hidden border-2 border-primary/30 bg-transparent px-8 py-3 transition-all duration-300 hover:scale-105 hover:border-transparent hover:bg-gradient-to-r hover:from-primary hover:to-secondary sm:w-auto"
                  >
                    <span className="relative z-10 font-semibold text-foreground group-hover:text-white">
                      {primary.secondary_cta.text || "Secondary Action"}
                    </span>
                  </Button>
                </PrismicNextLink>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="flex items-center justify-center">
            {isFilled.image(primary.main_media) && (
              <div className="group relative w-full max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <PrismicNextImage
                  field={primary.main_media}
                  className="relative z-10 rounded-2xl shadow-2xl"
                  priority
                  alt=""
                />
              </div>
            )}
          </div>
        </div>


      </div>

      {/* Statistics */}
      <div className="container mx-auto px-5 mt-10">
        {isFilled.group(primary.stats) && primary.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {primary.stats.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/50 to-primary/10 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent lg:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-muted-foreground lg:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
