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
export type ArticlesGridProps = SliceComponentProps<any> & {
    articles?: any[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        nextPage: string | null;
        prevPage: string | null;
    };
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
                            <PrismicNextImage
                                field={article.data.featured_image}
                                className="w-32 h-24 md:w-48 md:h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                alt=""
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                                <Badge className={`${getCategoryColor(article.data.category)} border`}>
                                    {article.data.category}
                                </Badge>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{asDate(article.data.publication_date)?.toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{article.data.reading_time} min</span>
                                    </div>
                                </div>
                            </div>

                            <CardTitle className="text-lg lg:text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                <PrismicRichText field={article.data.title} />
                            </CardTitle>

                            <div className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                                <PrismicRichText field={article.data.excerpt} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    <span>{article.data.author}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" asChild>
                                    <PrismicNextLink field={article}>
                                        Ler mais
                                    </PrismicNextLink>
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
            className="group bg-card border transition-colors duration-200 hover:shadow-md h-full flex flex-col overflow-hidden"
        >
            <div className="relative overflow-hidden">
                <PrismicNextImage
                    field={article.data.featured_image}
                    className="w-full h-48 object-cover transition-transform duration-200"
                    alt=""
                />

                <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(article.data.category)} border`}>
                        {article.data.category}
                    </Badge>
                </div>
            </div>

            <CardContent className="flex-1 p-6 flex flex-col">
                <CardTitle className="text-lg text-foreground leading-tight mb-3 transition-colors line-clamp-2">
                    <PrismicRichText field={article.data.title} />
                </CardTitle>

                <div className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                    <PrismicRichText field={article.data.excerpt} />
                </div>

                <Separator className="my-4" />

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

                    <Button
                        variant="outline"
                        className="w-full"
                        asChild
                    >
                        <PrismicNextLink field={article}>
                            Ler Artigo Completo
                        </PrismicNextLink>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * Component for "ArticlesGrid" Slices.
 */
const ArticlesGrid: React.FC<ArticlesGridProps> = ({ slice, articles = [], pagination }) => {
    const { primary } = slice;

    // State management
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [sortOrder, setSortOrder] = React.useState(primary.default_sort || "publication_date_desc");
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

    const articlesPerPage = primary.articles_per_page || 1;

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

    // Filter and sort articles (frontend)
    const filteredAndSortedArticles = React.useMemo(() => {
        let filtered = articles;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(article => {
                const title = article.data.title?.[0]?.text || '';
                const excerpt = article.data.excerpt?.[0]?.text || '';
                const author = article.data.author || '';

                return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    author.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        // Apply category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(article =>
                article.data.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortOrder) {
                case "publication_date_desc":
                    return new Date(b.data.publication_date || 0).getTime() - new Date(a.data.publication_date || 0).getTime();
                case "publication_date_asc":
                    return new Date(a.data.publication_date || 0).getTime() - new Date(b.data.publication_date || 0).getTime();
                case "title_asc":
                    const titleA = a.data.title?.[0]?.text || '';
                    const titleB = b.data.title?.[0]?.text || '';
                    return titleA.localeCompare(titleB);
                case "title_desc":
                    const titleA2 = a.data.title?.[0]?.text || '';
                    const titleB2 = b.data.title?.[0]?.text || '';
                    return titleB2.localeCompare(titleA2);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [articles, searchTerm, selectedCategory, sortOrder]);

    // Função para navegar para uma nova página (server-side pagination)
    const navigateToPage = (newPage: number) => {
        const params = new URLSearchParams();
        params.set('page', newPage.toString());

        if (articlesPerPage !== 12) {
            params.set('pageSize', articlesPerPage.toString());
        }

        const url = params.toString() ? `?${params.toString()}` : '';
        window.location.href = `/junco-news${url}`;
    };

    return (
        <section
            className="py-8 lg:py-12"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center space-y-6 mb-12">
                    {isFilled.keyText(primary.section_title) && (
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                            {primary.section_title}
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
                                variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'secondary' : 'outline'}
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
                {filteredAndSortedArticles.length > 0 ? (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                                {filteredAndSortedArticles.map((article, index) => (
                                    <ArticleCard key={article.id} article={article} index={index} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6 mb-12">
                                {filteredAndSortedArticles.map((article, index) => (
                                    <ArticleCard key={article.id} article={article} index={index} viewMode={viewMode} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (pagination.hasPrevPage) {
                                                    navigateToPage(pagination.currentPage - 1);
                                                }
                                            }}
                                            className={!pagination.hasPrevPage ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigateToPage(page);
                                                    }}
                                                    isActive={pagination.currentPage === page}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {pagination.totalPages > 5 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (pagination.hasNextPage) {
                                                    navigateToPage(pagination.currentPage + 1);
                                                }
                                            }}
                                            className={!pagination.hasNextPage ? "pointer-events-none opacity-50" : ""}
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
