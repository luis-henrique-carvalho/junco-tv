import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import FloatingParticles from "@/components/layout/floating-particles";
import { PresenterCard } from "@/components/PresenterCard";


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
      className="relative overflow-hidden py-16 lg:py-20"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FloatingParticles />

      <div className="container mx-auto px-4 relative z-10">
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
          <div className={`max-w-6xl mx-auto ${primary.presenters.length === 1
            ? "flex justify-center"
            : "grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
            }`}>
            {primary.presenters.map((presenter: Content.PresentersTeamSliceDefaultPrimaryPresentersItem, index: number) => (
              <PresenterCard
                key={index}
                presenter={presenter}
                index={index}
                variant={primary.presenters.length === 1 ? "single" : "default"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PresentersTeam;
