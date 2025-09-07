"use client";

import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled, asDate } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/components/ui/pagination";
import { Calendar, Clock, User, Search, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react";

/**
 * Props for `ArticlesGrid`.
 */
export type ArticlesGridProps = SliceComponentProps<any>;

// Extended mock data for demonstration
const mockArticles = [
    {
        id: "1",
        title: "Nova Tecnologia Revoluciona Setor de Comunicações",
        excerpt: "Descoberta científica promete transformar a forma como nos comunicamos digitalmente, oferecendo velocidades até 10x maiores que as atuais tecnologias disponíveis.",
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
        excerpt: "Relatório mostra que a economia da região teve o melhor desempenho dos últimos cinco anos, impulsionada principalmente pelo setor de serviços e inovação.",
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
        excerpt: "Em partida emocionante que durou 90 minutos, equipe da cidade vence por 3 a 2 e garante o título mais importante da temporada.",
        category: "Esportes",
        author: "Pedro Costa",
        publication_date: "2024-01-13",
        reading_time: 4,
        featured_image: {
            url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600",
            alt: "Celebração esportiva"
        },
        featured: false,
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
    {
        id: "6",
        title: "Novo Hospital Público Será Inaugurado",
        excerpt: "Unidade de saúde moderna atenderá mais de 50 mil habitantes da região, oferecendo serviços especializados e tecnologia avançada.",
        category: "Saúde",
        author: "Dra. Paula Lima",
        publication_date: "2024-01-10",
        reading_time: 9,
        featured_image: {
            url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600",
            alt: "Hospital moderno"
        },
        featured: false,
        slug: "novo-hospital-publico-sera-inaugurado"
    }
];

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

const ArticleCard = ({ article, index, viewMode }: { article: any; index: number; viewMode: 'grid' | 'list' }) => {
    if (viewMode === 'list') {
        return (
            <Card
                className="group bg-gradient-to-br from-card/90 via-card/70 to-primary/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border border-primary/20 hover:border-primary/40"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                }}
            >
                <CardContent className="p-0">
                    <div className="flex gap-6 p-6">
                        {/* Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={article.featured_image.url}
                                alt={article.featured_image.alt}
                                className="w-32 h-24 md:w-48 md:h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                                <Badge className={`${getCategoryColor(article.category)} border`}>
                                    {article.category}
                                </Badge>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(article.publication_date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{article.reading_time} min</span>
                                    </div>
                                </div>
                            </div>

                            <CardTitle className="text-lg lg:text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                            </CardTitle>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                                {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    <span>{article.author}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" asChild>
                                    <a href={`/junco-news/${article.slug}`}>
                                        Ler mais
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            className="group bg-gradient-to-br from-card/90 via-card/70 to-primary/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 border border-primary/20 hover:border-primary/40 h-full flex flex-col overflow-hidden"
            style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
            }}
        >
            <div className="relative overflow-hidden">
                <img
                    src={article.featured_image.url}
                    alt={article.featured_image.alt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(article.category)} border`}>
                        {article.category}
                    </Badge>
                </div>
            </div>

            <CardContent className="flex-1 p-6 flex flex-col">
                <CardTitle className="text-lg text-foreground leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                </CardTitle>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
                </p>

                <Separator className="my-4" />

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

                    <Button
                        variant="ghost"
                        className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                        asChild
                    >
                        <a href={`/junco-news/${article.slug}`}>
                            Ler Artigo Completo
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * Component for "ArticlesGrid" Slices.
 */
const ArticlesGrid: React.FC<ArticlesGridProps> = ({ slice }) => {
    const { primary } = slice;

    // State management
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [sortOrder, setSortOrder] = React.useState(primary.default_sort || "publication_date_desc");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

    const articlesPerPage = primary.articles_per_page || 12;

    // Get available categories from slice or fallback to mockup
    const availableCategories = React.useMemo(() => {
        const sliceCategories = isFilled.group(primary.filter_categories) ?
            primary.filter_categories.map((cat: any) => ({
                name: cat.category_name,
                slug: cat.category_slug
            })) : [];

        // Fallback categories if none defined in slice
        const fallbackCategories = [
            { name: "Tecnologia", slug: "tecnologia" },
            { name: "Economia", slug: "economia" },
            { name: "Esportes", slug: "esportes" },
            { name: "Política", slug: "politica" },
            { name: "Cultura", slug: "cultura" },
            { name: "Saúde", slug: "saude" }
        ];

        return sliceCategories.length > 0 ? sliceCategories : fallbackCategories;
    }, [primary.filter_categories]);

    // Filter and sort articles
    const filteredAndSortedArticles = React.useMemo(() => {
        let filtered = mockArticles;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(article =>
                article.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortOrder) {
                case "publication_date_desc":
                    return new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime();
                case "publication_date_asc":
                    return new Date(a.publication_date).getTime() - new Date(b.publication_date).getTime();
                case "title_asc":
                    return a.title.localeCompare(b.title);
                case "title_desc":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchTerm, selectedCategory, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);
    const paginatedArticles = filteredAndSortedArticles.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage
    );

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, sortOrder]);

    return (
        <section
            className="py-16 lg:py-20"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center space-y-6 mb-12">
                    {isFilled.keyText(primary.section_title) && (
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {primary.section_title}
                            </span>
                        </h2>
                    )}
                </div>

                {/* Filters and Controls */}
                <div className="mb-8 space-y-6">
                    {/* Search and View Toggle */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        {primary.show_search && (
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Buscar artigos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        )}

                        {/* View Mode Toggle */}
                        <div className="flex items-center space-x-2">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Filters and Sort */}
                    {(primary.show_filters || primary.default_sort) && (
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            {/* Category Filter */}
                            {primary.show_filters && (
                                <div className="flex items-center space-x-2">
                                    <Filter className="w-4 h-4 text-muted-foreground" />
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as Categorias</SelectItem>
                                            {availableCategories.map((category: any) => (
                                                <SelectItem key={category.slug} value={category.name}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Sort Options */}
                            <div className="flex items-center space-x-2">
                                <SortAsc className="w-4 h-4 text-muted-foreground" />
                                <Select value={sortOrder} onValueChange={setSortOrder}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Ordenar por" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="publication_date_desc">Mais Recentes</SelectItem>
                                        <SelectItem value="publication_date_asc">Mais Antigas</SelectItem>
                                        <SelectItem value="title_asc">Título A-Z</SelectItem>
                                        <SelectItem value="title_desc">Título Z-A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Results Count */}
                            <div className="text-sm text-muted-foreground md:ml-auto">
                                {filteredAndSortedArticles.length} artigo{filteredAndSortedArticles.length !== 1 ? 's' : ''} encontrado{filteredAndSortedArticles.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    )}
                </div>

                {/* Articles */}
                {paginatedArticles.length > 0 ? (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                                {paginatedArticles.map((article, index) => (
                                    <ArticleCard key={article.id} article={article} index={index} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6 mb-12">
                                {paginatedArticles.map((article, index) => (
                                    <ArticleCard key={article.id} article={article} index={index} viewMode={viewMode} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                                            }}
                                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(page);
                                                    }}
                                                    isActive={currentPage === page}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {totalPages > 5 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                            }}
                                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                ) : (
                    /* No Results */
                    <div className="text-center py-16">
                        <div className="mb-4">
                            <Search className="w-12 h-12 text-muted-foreground mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Nenhum artigo encontrado
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Tente ajustar seus filtros ou termo de busca
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("all");
                                setSortOrder(primary.default_sort || "publication_date_desc");
                            }}
                        >
                            Limpar Filtros
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArticlesGrid;
