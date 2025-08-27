import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="absolute top-40 right-20 h-1 w-1 rounded-full bg-secondary/50 animate-ping" />
        <div className="absolute bottom-40 left-20 h-1.5 w-1.5 rounded-full bg-accent/40 animate-bounce" />
        <div className="absolute top-60 left-1/3 h-1 w-1 rounded-full bg-primary/30 animate-pulse" />
        <div className="absolute bottom-20 right-1/3 h-2 w-2 rounded-full bg-secondary/40 animate-ping" />
      </div>

      <div className="container mx-auto px-5">
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
          <div className="grid gap-8 lg:grid-cols-2 w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16">
            {primary.program.map((programItem, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-primary/8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/15 border border-primary/30 hover:border-primary/50 min-h-[420px] lg:min-h-[480px]"
                style={{
                  animationDelay: `${index * 300}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Gradient overlay for hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-secondary/3 to-accent/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Program Image */}
                {isFilled.image(programItem.program_image) && (
                  <div className="relative overflow-hidden">
                    <PrismicNextImage
                      field={programItem.program_image}
                      alt=""
                      className="w-full h-56 lg:h-64 object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />

                    {/* Floating accent elements */}
                    <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                    <div className="absolute top-6 left-4 w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-80 transition-all duration-700 animate-ping" />

                    {/* Program type badge */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                        <span className="text-xs font-semibold text-primary-foreground">PODCAST</span>
                      </div>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-4 lg:pb-6">
                  {/* Program Title */}
                  {isFilled.keyText(programItem.program_title) && (
                    <CardTitle className="text-2xl lg:text-3xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
                        {programItem.program_title}
                      </span>
                    </CardTitle>
                  )}
                </CardHeader>

                <CardContent className="pb-6 flex-1">
                  {/* Program Description */}
                  {isFilled.richText(programItem.program_description) && (
                    <div className="text-muted-foreground/90 group-hover:text-muted-foreground transition-colors duration-300">
                      <PrismicRichText
                        field={programItem.program_description}
                        components={{
                          paragraph: ({ children }: { children: React.ReactNode }) => (
                            <p className="text-base lg:text-lg leading-relaxed line-clamp-5 lg:line-clamp-6 mb-3">{children}</p>
                          ),
                          heading1: ({ children }: { children: React.ReactNode }) => (
                            <h1 className="text-lg lg:text-xl font-bold text-foreground mb-3">{children}</h1>
                          ),
                          heading2: ({ children }: { children: React.ReactNode }) => (
                            <h2 className="text-base lg:text-lg font-bold text-foreground mb-3">{children}</h2>
                          ),
                          heading3: ({ children }: { children: React.ReactNode }) => (
                            <h3 className="text-sm font-bold text-foreground mb-1">{children}</h3>
                          ),
                          heading4: ({ children }: { children: React.ReactNode }) => (
                            <h4 className="text-sm font-bold text-foreground mb-1">{children}</h4>
                          ),
                          heading5: ({ children }: { children: React.ReactNode }) => (
                            <h5 className="text-xs font-bold text-foreground mb-1">{children}</h5>
                          ),
                          heading6: ({ children }: { children: React.ReactNode }) => (
                            <h6 className="text-xs font-bold text-foreground mb-1">{children}</h6>
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
                              className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-200"
                              target={node.data.target || undefined}
                              rel={node.data.target === "_blank" ? "noopener noreferrer" : undefined}
                            >
                              {children}
                            </a>
                          ),
                          listItem: ({ children }: { children: React.ReactNode }) => (
                            <li className="text-base leading-relaxed ml-4">{children}</li>
                          ),
                          oListItem: ({ children }: { children: React.ReactNode }) => (
                            <li className="text-base leading-relaxed ml-4">{children}</li>
                          ),
                          preformatted: ({ children }: { children: React.ReactNode }) => (
                            <pre className="bg-muted/50 p-3 rounded-lg text-sm overflow-x-auto border border-border/50">{children}</pre>
                          ),
                        }}
                      />
                    </div>
                  )}
                </CardContent>

                {/* Episodes Link */}
                {isFilled.link(programItem.program_episodes_list) && (
                  <CardFooter className="pt-0 mt-auto">
                    <PrismicNextLink field={programItem.program_episodes_list} className="w-full">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full group/btn relative overflow-hidden border-2 border-primary/40 bg-transparent hover:bg-transparent hover:border-primary/70 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/25 py-6"
                      >
                        {/* Button background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/8 to-primary/15 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                        {/* Animated border effect */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 animate-pulse" />

                        <span className="relative z-10 font-bold text-base text-foreground group-hover/btn:text-primary transition-colors duration-300 flex items-center justify-center gap-3">
                          {programItem.program_episodes_list.text || "Ver Episódios"}
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Button>
                    </PrismicNextLink>
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

export default ProgramsList;
