import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import FloatingParticles from "@/components/layout/floating-particles";
import { ProgramCard } from "@/components/ProgramCard";

// Define o tipo específico para o node do hyperlink
interface HyperlinkNode {
  data: {
    url?: string;
    target?: string;
  };
}

/**
 * Props for `ProgramsList`.
 */
export type ProgramsListProps = SliceComponentProps<Content.ProgramsListSlice>;

/**
 * Component for "ProgramsList" Slices.
 */
const ProgramsList: React.FC<ProgramsListProps> = ({ slice }) => {
  const { primary } = slice;

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Floating particles background */}
      <FloatingParticles />

      <div className="container mx-auto px-5 relative z-10">
        {/* Header Section */}
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
                  ),
                  heading1: ({ children }: { children: React.ReactNode }) => (
                    <h1 className="text-2xl font-bold text-foreground">{children}</h1>
                  ),
                  heading2: ({ children }: { children: React.ReactNode }) => (
                    <h2 className="text-xl font-bold text-foreground">{children}</h2>
                  ),
                  heading3: ({ children }: { children: React.ReactNode }) => (
                    <h3 className="text-lg font-bold text-foreground">{children}</h3>
                  ),
                  heading4: ({ children }: { children: React.ReactNode }) => (
                    <h4 className="text-base font-bold text-foreground">{children}</h4>
                  ),
                  heading5: ({ children }: { children: React.ReactNode }) => (
                    <h5 className="text-sm font-bold text-foreground">{children}</h5>
                  ),
                  heading6: ({ children }: { children: React.ReactNode }) => (
                    <h6 className="text-xs font-bold text-foreground">{children}</h6>
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
                  listItem: ({ children }: { children: React.ReactNode }) => (
                    <li className="text-lg leading-relaxed">{children}</li>
                  ),
                  oListItem: ({ children }: { children: React.ReactNode }) => (
                    <li className="text-lg leading-relaxed">{children}</li>
                  ),
                  preformatted: ({ children }: { children: React.ReactNode }) => (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">{children}</pre>
                  ),
                }}
              />
            </div>
          )}
        </div>

        {/* Programs Grid */}
        {isFilled.group(primary.program) && primary.program.length > 0 && (
          <div className={`w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 ${primary.program.length === 1
              ? "flex justify-center"
              : "grid gap-8 lg:grid-cols-2"
            }`}>
            {primary.program.map((programItem, index) => (
              <ProgramCard
                key={index}
                program={programItem}
                index={index}
                programType="PODCAST"
                buttonText="Ver Episódios"
                variant={primary.program.length === 1 ? "single" : "default"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsList;
