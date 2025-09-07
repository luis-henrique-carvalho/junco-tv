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
export type FeaturedArticlesProps = SliceComponentProps<any>;

// Mock article data for demonstration - In real implementation, this would come from Prismic API
const mockArticles = [
    {
        id: "1",
        title: "Nova Tecnologia Revoluciona Setor de Comunicações",
        excerpt: "Descoberta científica promete transformar a forma como nos comunicamos digitalmente, oferecendo velocidades até 10x maiores.",
        category: "Tecnologia",
        author: "João Silva",
        publication_date: "2024-01-15",
        reading_time: 5,
        featured_image: {
            url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600",
            alt: "Tecnologia futurista"
        },
        featured: true,
        slug: "nova-tecnologia-revoluciona-comunicacoes"
    },
    {
        id: "2",
        title: "Economia Local Apresenta Crescimento de 15%",
        excerpt: "Relatório mostra que a economia da região teve o melhor desempenho dos últimos cinco anos, impulsionada pelo setor de serviços.",
        category: "Economia",
        author: "Maria Santos",
        publication_date: "2024-01-14",
        reading_time: 8,
        featured_image: {
            url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600",
            alt: "Gráficos econômicos"
        },
        featured: true,
        slug: "economia-local-crescimento-15-porcento"
    },
    {
        id: "3",
        title: "Time Local Conquista Campeonato Regional",
        excerpt: "Em partida emocionante, equipe da cidade vence por 3 a 2 e garante o título mais importante da temporada.",
        category: "Esportes",
        author: "Pedro Costa",
        publication_date: "2024-01-13",
        reading_time: 4,
        featured_image: {
            url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600",
            alt: "Celebração esportiva"
        },
        featured: true,
        slug: "time-local-conquista-campeonato-regional"
    },
    {
        id: "4",
        title: "Nova Lei Ambiental Entra em Vigor",
        excerpt: "Medidas mais rigorosas de proteção ao meio ambiente começam a valer a partir desta semana, afetando empresas e cidadãos.",
        category: "Política",
        author: "Ana Oliveira",
        publication_date: "2024-01-12",
        reading_time: 6,
        featured_image: {
            url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600",
            alt: "Natureza e política ambiental"
        },
        featured: false,
        slug: "nova-lei-ambiental-entra-vigor"
    },
    {
        id: "5",
        title: "Festival de Arte Movimenta Centro da Cidade",
        excerpt: "Evento cultural reúne artistas locais e visitantes de outras regiões, promovendo a economia criativa e o turismo cultural.",
        category: "Cultura",
        author: "Carlos Mendes",
        publication_date: "2024-01-11",
        reading_time: 7,
        featured_image: {
            url: "https://images.unsplash.com/photo-1499159058454-75067059248a?w=800&h=600",
            alt: "Festival de arte"
        },
        featured: false,
        slug: "festival-arte-movimenta-centro-cidade"
    },
]


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

const ArticleCard = ({ article, index, isGrid = true }: { article: any; index: number; isGrid?: boolean }) => {
    const isFeatured = index === 0;

    return (
        <Card
            className={`group bg-gradient-to-br from-card/90 via-card/70 to-primary/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 border border-primary/20 hover:border-primary/40 h-full flex flex-col overflow-hidden
        ${isFeatured && isGrid ? 'lg:col-span-2 lg:row-span-2' : ''}
      `}
            style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
            }}
        >
            <div className="relative overflow-hidden">
                <img
                    src={article.featured_image.url}
                    alt={article.featured_image.alt}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105
            ${isFeatured && isGrid ? 'h-64 lg:h-80' : 'h-48'}
          `}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(article.category)} border`}>
                        {article.category}
                    </Badge>
                </div>

                {/* Featured Badge */}
                {article.featured && (
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground border-primary">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Destaque
                        </Badge>
                    </div>
                )}
            </div>

            <CardContent className="flex-1 p-6 flex flex-col">
                {/* Title */}
                <CardTitle className={`text-foreground leading-tight mb-3 group-hover:text-primary transition-colors
          ${isFeatured && isGrid ? 'text-xl lg:text-2xl' : 'text-lg'}
        `}>
                    {article.title}
                </CardTitle>

                {/* Excerpt */}
                <p className={`text-muted-foreground leading-relaxed mb-4 flex-1
          ${isFeatured && isGrid ? 'text-base' : 'text-sm line-clamp-3'}
        `}>
                    {article.excerpt}
                </p>

                <Separator className="my-4" />

                {/* Meta information */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(article.publication_date).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.reading_time} min</span>
                        </div>
                    </div>

                    {/* Read More Button */}
                    <Button
                        variant="ghost"
                        className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                        asChild
                    >
                        <a href={`/junco-news/${article.slug}`}>
                            Ler Artigo Completo
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * Component for "FeaturedArticles" Slices.
 */
const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ slice }) => {
    const { primary } = slice;

    const maxArticles = primary.max_articles || 6;
    const articles = mockArticles.slice(0, maxArticles);

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


                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {articles.map((article, index) => (
                        <ArticleCard key={article.id} article={article} index={index} isGrid={true} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedArticles;
