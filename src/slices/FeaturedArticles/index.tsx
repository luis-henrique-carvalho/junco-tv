import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled, asDate } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
        <Card
            className={`group bg-card border transition-colors duration-200 hover:shadow-md h-full flex flex-col overflow-hidden
        ${isFeatured ? 'lg:flex-row' : ''}
      `}
        >
            <div className={`relative overflow-hidden ${isFeatured ? 'lg:w-1/2' : ''}`}>
                <PrismicNextImage
                    field={article.data.featured_image}
                    className={`w-full object-cover transition-transform duration-200
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
                <CardTitle className={`text-foreground leading-tight mb-3 transition-colors
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

                    {/* Read More Button */}
                    <Button
                        variant="outline"
                        className="w-full justify-between"
                        asChild
                    >
                        <PrismicNextLink field={article}>
                            Ler Artigo Completo
                            <ArrowRight className="w-4 h-4" />
                        </PrismicNextLink>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * Component for "FeaturedArticles" Slices.
 */
const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ slice, articles = [] }) => {
    const { primary } = slice;

    return (
        <section
            className="py-8 lg:py-12"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    {/* Category Filter */}
                    {primary.show_category_filter && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {["Todas", "Tecnologia", "Economia", "Esportes", "Política"].map((category) => (
                                <Button
                                    key={category}
                                    variant={category === "Todas" ? "default" : "outline"}
                                    size="sm"
                                    className="text-xs"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>


                {/* Layout: 1 notícia principal + 3 abaixo */}
                <div className="space-y-8">
                    {articles.length > 0 && (
                        <>
                            {/* Notícia Principal */}
                            <div className="grid gap-6">
                                <ArticleCard key={articles[0].id} article={articles[0]} index={0} isGrid={false} />
                            </div>

                            {/* 3 Notícias Secundárias */}
                            {articles.length > 1 && (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {articles.slice(1, 4).map((article, index) => (
                                        <ArticleCard key={article.id} article={article} index={index + 1} isGrid={false} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </section>
    );
};

export default FeaturedArticles;
