import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled, asDate } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShareButton } from "@/components/ui/share-button";
import { Calendar, Clock, User, ArrowRight, TrendingUp } from "lucide-react";

/**
 * Props for `FeaturedArticles`.
 */
export type FeaturedArticlesProps = SliceComponentProps<any> & {
    articles?: any[];
};

const getCategoryColor = (category: string) => {
    const colors = {
        "Tecnologia": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "Economia": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "Esportes": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "Política": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "Cultura": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
        "Saúde": "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground border-border";
};

const ArticleCard = ({ article, index, isGrid = true }: { article: any; index: number; isGrid?: boolean }) => {
    const isFeatured = index === 0;

    return (
        <PrismicNextLink field={article}>
            <Card
                className={`group bg-card border transition-colors duration-200 hover:shadow-md h-full flex flex-col overflow-hidden cursor-pointer
        ${isFeatured ? 'lg:flex-row' : ''}
      `}
            >
                <div className={`relative overflow-hidden ${isFeatured ? 'lg:w-1/2' : ''}`}>
                    <PrismicNextImage
                        field={article.data.featured_image}
                        className={`w-full object-cover transition-transform duration-200 group-hover:scale-105
            ${isFeatured ? 'h-64 lg:h-full lg:min-h-[300px]' : 'h-48'}
          `}
                        alt=""
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(article.data.category)} border`}>
                            {article.data.category}
                        </Badge>
                    </div>

                    {/* Featured Badge */}
                    {article.data.featured && (
                        <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-background/90 text-foreground border">
                                Destaque
                            </Badge>
                        </div>
                    )}
                </div>

                <CardContent className={`flex-1 p-6 flex flex-col ${isFeatured ? 'lg:w-1/2' : ''}`}>
                    {/* Title */}
                    <CardTitle className={`text-foreground leading-tight mb-3 transition-colors group-hover:text-primary
          ${isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'}
        `}>
                        <PrismicRichText field={article.data.title} />
                    </CardTitle>

                    {/* Excerpt */}
                    <div className={`text-muted-foreground leading-relaxed mb-4 flex-1
          ${isFeatured ? 'text-base lg:text-lg' : 'text-sm line-clamp-3'}
        `}>
                        <PrismicRichText field={article.data.excerpt} />
                    </div>

                    <Separator className="my-4" />

                    {/* Meta information */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <User className="w-3 h-3" />
                                    <span>{article.data.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{asDate(article.data.publication_date)?.toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{article.data.reading_time} min</span>
                            </div>
                        </div>

                        {/* Read More Indicator */}
                        <div className="flex items-center justify-center space-x-2">
                            <ShareButton
                                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/junco-news/${article.uid}`}
                                title={article.data.title?.[0]?.text || 'Artigo'}
                                description={article.data.excerpt?.[0]?.text || ''}
                                size="sm"
                                variant="ghost"
                            />
                            <div className="text-xs text-primary group-hover:text-primary/80 transition-colors flex items-center space-x-1">
                                <span>Clique para ler o artigo completo</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </PrismicNextLink>
    );
};

/**
 * Component for "FeaturedArticles" Slices.
 */
const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ slice, articles = [] }) => {
    const { primary } = slice;

    // Filtrar e ordenar artigos destacados
    const featuredArticles = articles
        .filter(article => article.data.featured === true)
        .sort((a, b) => {
            const orderA = a.data.featured_order || 'none';
            const orderB = b.data.featured_order || 'none';

            // Se ambos têm ordem definida, ordenar numericamente
            if (orderA !== 'none' && orderB !== 'none') {
                const orderDiff = parseInt(orderA) - parseInt(orderB);

                // Se as ordens são diferentes, ordenar por ordem
                if (orderDiff !== 0) {
                    return orderDiff;
                }

                // Se as ordens são iguais, usar data de publicação como desempate
                // (mais recente primeiro)
                const dateA = new Date(a.data.publication_date || a.first_publication_date);
                const dateB = new Date(b.data.publication_date || b.first_publication_date);
                return dateB.getTime() - dateA.getTime();
            }

            // Se apenas um tem ordem definida, ele vem primeiro
            if (orderA !== 'none' && orderB === 'none') return -1;
            if (orderA === 'none' && orderB !== 'none') return 1;

            // Se nenhum tem ordem definida, ordenar por data de publicação
            const dateA = new Date(a.data.publication_date || a.first_publication_date);
            const dateB = new Date(b.data.publication_date || b.first_publication_date);
            return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 4); // Limitar a 4 artigos

    return (
        <section
            className=""
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    {primary.section_title && (
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                            {primary.section_title}
                        </h2>
                    )}

                    {primary.section_description && (
                        <div className="max-w-3xl mx-auto text-muted-foreground">
                            <PrismicRichText field={primary.section_description} />
                        </div>
                    )}
                </div>

                {/* Layout: 1 notícia principal + 3 abaixo */}
                <div className="space-y-8">
                    {featuredArticles.length > 0 ? (
                        <>
                            {/* Notícia Principal (primeira da lista ordenada) */}
                            <div className="grid gap-6">
                                <ArticleCard
                                    key={featuredArticles[0].id}
                                    article={featuredArticles[0]}
                                    index={0}
                                    isGrid={false}
                                />
                            </div>

                            {/* 3 Notícias Secundárias */}
                            {featuredArticles.length > 1 && (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {featuredArticles.slice(1, 4).map((article, index) => (
                                        <ArticleCard
                                            key={article.id}
                                            article={article}
                                            index={index + 1}
                                            isGrid={false}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                Nenhum artigo em destaque encontrado.
                                Configure artigos com "Artigo em Destaque" = Sim e defina a "Ordem de Destaque" no Prismic.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default FeaturedArticles;
