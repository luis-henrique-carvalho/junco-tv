import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled, asDate } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag } from "lucide-react";
import FloatingParticles from "@/components/layout/floating-particles";

import Loading from "./loading";

type Params = Promise<{ uid: string }>;


export default async function NewsArticlePage(props: { params: Params }) {
    const params = await props.params;
    const client = createClient();

    console.log("todos os artigos", await client.getAllByType("news_article"));

    console.log("params", params);

    let page

    try {
        page = await client.getByUID("news_article", params.uid).catch(() => notFound());
        console.log("page", JSON.stringify(page, null, 2));
    } catch (error) {
        return notFound();
    }

    console.log("page", JSON.stringify(page, null, 2));

    return (
        <Suspense fallback={<Loading />}>
            <NewsArticleContent page={page} />
        </Suspense>
    );
}

/**
 * News article content component.
 */
function NewsArticleContent({ page }: { page: any }) {
    const getCategoryColor = (category: string) => {
        const colors = {
            "Tecnologia": "bg-blue-500/10 text-blue-600 border-blue-500/20",
            "Economia": "bg-green-500/10 text-green-600 border-green-500/20",
            "Esportes": "bg-orange-500/10 text-orange-600 border-orange-500/20",
            "Política": "bg-purple-500/10 text-purple-600 border-purple-500/20",
            "Cultura": "bg-pink-500/10 text-pink-600 border-pink-500/20",
            "Saúde": "bg-red-500/10 text-red-600 border-red-500/20",
        };
        return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
    };

    const publicationDate = page.data.publication_date ? asDate(page.data.publication_date) : null;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-8 lg:py-12">
                <FloatingParticles />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="group">
                            <a href="/junco-news" className="flex items-center space-x-2">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                <span>Voltar para Notícias</span>
                            </a>
                        </Button>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Article Header */}
                        <div className="space-y-6 mb-8">
                            {/* Category and Meta Info */}
                            <div className="flex flex-wrap items-center gap-4">
                                {isFilled.select(page.data.category) && (
                                    <Badge className={`${getCategoryColor(page.data.category)} border`}>
                                        {page.data.category}
                                    </Badge>
                                )}

                                {page.data.featured && (
                                    <Badge className="bg-primary/10 text-primary border-primary/20">
                                        <Tag className="w-3 h-3 mr-1" />
                                        Destaque
                                    </Badge>
                                )}

                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        <PrismicRichText field={page.data.title} />
                                    </span>
                                </h1>
                            )}

                            {/* Subtitle */}
                            {isFilled.richText(page.data.subtitle) && (
                                <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                    <PrismicRichText field={page.data.subtitle} />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-4">
                                <Button variant="outline" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Compartilhar
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Bookmark className="w-4 h-4 mr-2" />
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Card className="overflow-hidden">
                            {/* Featured Image */}
                            {isFilled.image(page.data.featured_image) && (
                                <div className="relative aspect-video md:aspect-[2/1] overflow-hidden">
                                    <PrismicNextImage
                                        field={page.data.featured_image}
                                        className="w-full h-full object-cover"
                                        priority
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            )}

                            <CardContent className="p-8 md:p-12">
                                {/* Excerpt */}
                                {isFilled.richText(page.data.excerpt) && (
                                    <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                                        <div className="text-lg font-medium text-foreground leading-relaxed">
                                            <PrismicRichText field={page.data.excerpt} />
                                        </div>
                                    </div>
                                )}

                                <Separator className="my-8" />

                                {/* Article Body */}
                                {isFilled.richText(page.data.body) && (
                                    <div className="prose prose-lg max-w-none dark:prose-invert">
                                        <PrismicRichText
                                            field={page.data.body}
                                            components={{
                                                paragraph: ({ children }) => (
                                                    <p className="mb-6 text-lg leading-relaxed text-foreground">{children}</p>
                                                ),
                                                heading1: ({ children }) => (
                                                    <h2 className="text-3xl font-bold mb-6 mt-10 text-foreground">{children}</h2>
                                                ),
                                                heading2: ({ children }) => (
                                                    <h3 className="text-2xl font-semibold mb-4 mt-8 text-foreground">{children}</h3>
                                                ),
                                                heading3: ({ children }) => (
                                                    <h4 className="text-xl font-medium mb-3 mt-6 text-foreground">{children}</h4>
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
                                                    <li className="mb-2 text-lg text-foreground">{children}</li>
                                                ),
                                                oListItem: ({ children }) => (
                                                    <li className="mb-2 text-lg text-foreground">{children}</li>
                                                ),
                                                list: ({ children }) => (
                                                    <ul className="mb-6 pl-6 space-y-2">{children}</ul>
                                                ),
                                                oList: ({ children }) => (
                                                    <ol className="mb-6 pl-6 space-y-2 list-decimal">{children}</ol>
                                                ),
                                                preformatted: ({ children }) => (
                                                    <pre className="mb-6 p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                                                        <code>{children}</code>
                                                    </pre>
                                                ),
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Tags */}
                                {isFilled.keyText(page.data.tags) && (
                                    <div className="mt-12 pt-8 border-t">
                                        <h4 className="text-sm font-medium text-muted-foreground mb-4">TAGS</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {page.data.tags.split(",").map((tag: string, index: number) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="text-xs px-3 py-1"
                                                >
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Back to News */}
                        <div className="text-center mt-12">
                            <Button size="lg" asChild className="group">
                                <a href="/junco-news">
                                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                    Voltar para Todas as Notícias
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
