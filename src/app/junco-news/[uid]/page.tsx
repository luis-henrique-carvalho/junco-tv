import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled, asDate, asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ui/share-button";
import { Calendar, Clock, User, ArrowLeft, Bookmark } from "lucide-react";

type Params = Promise<{ uid: string }>;

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("junco_news").catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
        openGraph: {
            images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
        },
    };
}

export default async function NewsArticlePage(props: { params: Params }) {
    const params = await props.params;
    const client = createClient();

    const page = await client.getByUID("news_article", params.uid).catch(() => notFound());

    return (
        <NewsArticleContent page={page} />
    );
}

function NewsArticleContent({ page }: { page: any }) {
    const publicationDate = page.data.publication_date ? asDate(page.data.publication_date) : null;

    return (
        <div className="min-h-screen bg-background mt-4">
            {/* Header */}
            <div className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" asChild className="group">
                            <a href="/junco-news" className="flex items-center space-x-2 ">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Voltar para Notícias</span>
                            </a>
                        </Button>

                        <div className="flex items-center space-x-2">
                            <ShareButton
                                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/junco-news/${page.uid}`}
                                title={page.data.title?.[0]?.text || 'Artigo'}
                                description={page.data.excerpt?.[0]?.text || ''}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Header */}
            <section className="py-6 lg:py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Category and Meta Info */}
                        <div className="mb-6">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                {isFilled.select(page.data.category) && (
                                    <Badge variant="outline" className="text-xs">
                                        {page.data.category}
                                    </Badge>
                                )}

                                {page.data.featured && (
                                    <Badge variant="default" className="text-xs">
                                        Destaque
                                    </Badge>
                                )}
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                {publicationDate && (
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{publicationDate.toLocaleDateString('pt-BR')}</span>
                                    </div>
                                )}

                                {isFilled.number(page.data.reading_time) && (
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{page.data.reading_time} min de leitura</span>
                                    </div>
                                )}

                                {isFilled.keyText(page.data.author) && (
                                    <div className="flex items-center space-x-1">
                                        <User className="w-4 h-4" />
                                        <span>{page.data.author}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        {isFilled.richText(page.data.title) && (
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-6">
                                <PrismicRichText
                                    field={page.data.title}
                                    components={{
                                        heading1: ({ children }) => (
                                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">{children}</h1>
                                        ),
                                        heading2: ({ children }) => (
                                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">{children}</h2>
                                        ),
                                        heading3: ({ children }) => (
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-foreground">{children}</h3>
                                        ),
                                        paragraph: ({ children }) => (
                                            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">{children}</p>
                                        ),
                                    }}
                                />
                            </div>
                        )}

                        {/* Subtitle */}
                        {isFilled.richText(page.data.subtitle) && (
                            <div className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                                <PrismicRichText
                                    field={page.data.subtitle}
                                    components={{
                                        heading1: ({ children }) => (
                                            <h2 className="text-lg md:text-xl font-semibold text-muted-foreground">{children}</h2>
                                        ),
                                        heading2: ({ children }) => (
                                            <h3 className="text-lg md:text-xl font-semibold text-muted-foreground">{children}</h3>
                                        ),
                                        heading3: ({ children }) => (
                                            <h4 className="text-lg md:text-xl font-semibold text-muted-foreground">{children}</h4>
                                        ),
                                        paragraph: ({ children }) => (
                                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{children}</p>
                                        ),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Featured Image */}
                        {isFilled.image(page.data.featured_image) && (
                            <div className="mb-8">
                                <PrismicNextImage
                                    field={page.data.featured_image}
                                    className="w-full h-auto rounded-lg"
                                    priority
                                    alt=""
                                />
                            </div>
                        )}

                        {/* Excerpt */}
                        {isFilled.richText(page.data.excerpt) && (
                            <div className="mb-8 p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
                                <div className="text-lg font-medium text-foreground leading-relaxed">
                                    <PrismicRichText field={page.data.excerpt} />
                                </div>
                            </div>
                        )}

                        {/* Article Body */}
                        {isFilled.richText(page.data.body) && (
                            <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground">
                                <PrismicRichText
                                    field={page.data.body}
                                    components={{
                                        paragraph: ({ children }) => (
                                            <p className="mb-6 text-lg leading-relaxed text-foreground">{children}</p>
                                        ),
                                        heading1: ({ children }) => (
                                            <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">{children}</h2>
                                        ),
                                        heading2: ({ children }) => (
                                            <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">{children}</h3>
                                        ),
                                        heading3: ({ children }) => (
                                            <h4 className="text-lg font-medium mb-2 mt-4 text-foreground">{children}</h4>
                                        ),
                                        strong: ({ children }) => (
                                            <strong className="font-semibold text-foreground">{children}</strong>
                                        ),
                                        em: ({ children }) => (
                                            <em className="italic text-foreground">{children}</em>
                                        ),
                                        hyperlink: ({ children, node }) => {
                                            const target = (node.data as any).target;
                                            return (
                                                <a
                                                    href={node.data.url || "#"}
                                                    className="text-primary underline-offset-4 hover:underline font-medium"
                                                    target={target || undefined}
                                                    rel={target === "_blank" ? "noopener noreferrer" : undefined}
                                                >
                                                    {children}
                                                </a>
                                            );
                                        },
                                        listItem: ({ children }) => (
                                            <li className="mb-1 text-foreground">{children}</li>
                                        ),
                                        oListItem: ({ children }) => (
                                            <li className="mb-1 text-foreground">{children}</li>
                                        ),
                                        list: ({ children }) => (
                                            <ul className="mb-6 pl-6 space-y-1">{children}</ul>
                                        ),
                                        oList: ({ children }) => (
                                            <ol className="mb-6 pl-6 space-y-1 list-decimal">{children}</ol>
                                        ),
                                        preformatted: ({ children }) => (
                                            <pre className="mb-6 p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                                                <code>{children}</code>
                                            </pre>
                                        ),
                                    }}
                                />
                            </article>
                        )}

                        {/* Tags */}
                        {isFilled.keyText(page.data.tags) && (
                            <div className="mt-12 pt-8 border-t border-border">
                                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {page.data.tags.split(",").map((tag: string, index: number) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs px-3 py-1"
                                        >
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-muted/30">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Publicado em {publicationDate?.toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>

                            <Button variant="outline" size="sm" asChild>
                                <a href="/junco-news">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Voltar para Notícias
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
