"use client";

import * as React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled, asDate } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { NewsArticleDocument, ArticlesGridSlice } from "@/../prismicio-types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ShareButton } from "@/components/ui/share-button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/components/ui/pagination";
import { Calendar, Clock, Search, Filter, SortAsc, Grid, List } from "lucide-react";

/**
 * Props for `ArticlesGrid`.
 */
export type ArticlesGridProps = SliceComponentProps<ArticlesGridSlice> & {
    articles?: NewsArticleDocument[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        nextPage: string | null;
        prevPage: string | null;
    };
    filters?: {
        category: string;
        search: string;
        sort: string;
        pageSize: number;
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

const ArticleCard = ({ article, index, viewMode }: { article: NewsArticleDocument; index: number; viewMode: 'grid' | 'list' }) => {
    if (viewMode === 'list') {
        return (
            <PrismicNextLink document={article}>
                <Card
                    className="group bg-gradient-to-br from-card/90 via-card/70 to-primary/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border border-primary/20 hover:border-primary/40 cursor-pointer"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                >
                    <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                            {/* Image */}
                            <div className="flex-shrink-0 w-full sm:w-auto">
                                <PrismicNextImage
                                    field={article.data.featured_image}
                                    className="w-full h-32 sm:w-32 sm:h-24 md:w-48 md:h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    alt=""
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                                    <Badge className={`${getCategoryColor(article.data.category || '')} border w-fit`}>
                                        {article.data.category || 'Sem categoria'}
                                    </Badge>
                                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-muted-foreground">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-3 h-3" />
                                            <span className="truncate">{asDate(article.data.publication_date)?.toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-3 h-3" />
                                            <span className="truncate">{article.data.reading_time} min</span>
                                        </div>
                                    </div>
                                </div>

                                <CardTitle className="text-base sm:text-lg lg:text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    <PrismicRichText field={article.data.title} />
                                </CardTitle>

                                <div className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                                    <PrismicRichText field={article.data.excerpt} />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                        <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                                            {isFilled.image(article.data.author_photo) && (
                                                <AvatarImage
                                                    src={article.data.author_photo.url}
                                                    alt={article.data.author || 'Autor'}
                                                />
                                            )}
                                            <AvatarFallback className="text-xs">
                                                {article.data.author ? article.data.author.charAt(0).toUpperCase() : 'A'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="truncate">{article.data.author}</span>
                                    </div>
                                    <div className="flex w-full items-center space-x-2">
                                        <ShareButton
                                            url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/junco-news/${article.uid}`}
                                            title={article.data.title?.[0] && 'text' in article.data.title[0] ? article.data.title[0].text : 'Artigo'}
                                            description={article.data.excerpt?.[0] && 'text' in article.data.excerpt[0] ? article.data.excerpt[0].text : ''}
                                            size="sm"
                                            variant="ghost"
                                        />
                                        <div className="text-xs text-primary group-hover:text-primary/80 transition-colors">
                                            Clique para ler →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </PrismicNextLink>
        );
    }

    return (
        <PrismicNextLink document={article}>
            <Card
                className="group bg-card border transition-colors duration-200 hover:shadow-md h-full flex flex-col overflow-hidden cursor-pointer"
            >
                <div className="relative overflow-hidden">
                    <PrismicNextImage
                        field={article.data.featured_image}
                        className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                        alt=""
                    />

                    <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(article.data.category || '')} border`}>
                            {article.data.category || 'Sem categoria'}
                        </Badge>
                    </div>
                </div>

                <CardContent className="flex-1 p-6 flex flex-col">
                    <CardTitle className="text-lg text-foreground leading-tight mb-3 transition-colors line-clamp-2 group-hover:text-primary">
                        <PrismicRichText field={article.data.title} />
                    </CardTitle>

                    <div className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                        <PrismicRichText field={article.data.excerpt} />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                                        {isFilled.image(article.data.author_photo) && (
                                            <AvatarImage
                                                src={article.data.author_photo.url}
                                                alt={article.data.author || 'Autor'}
                                            />
                                        )}
                                        <AvatarFallback className="text-xs">
                                            {article.data.author ? article.data.author.charAt(0).toUpperCase() : 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="truncate max-w-[100px] sm:max-w-none">{article.data.author}</span>
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

                        <div className="flex items-center justify-center space-x-2">
                            <ShareButton
                                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/junco-news/${article.uid}`}
                                title={article.data.title?.[0] && 'text' in article.data.title[0] ? article.data.title[0].text : 'Artigo'}
                                description={article.data.excerpt?.[0] && 'text' in article.data.excerpt[0] ? article.data.excerpt[0].text : ''}
                                size="sm"
                                variant="ghost"
                            />
                            <div className="text-xs text-primary group-hover:text-primary/80 transition-colors">
                                Clique para ler o artigo completo
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </PrismicNextLink>
    );
};

/**
 * Component for "ArticlesGrid" Slices.
 */
const ArticlesGrid: React.FC<ArticlesGridProps> = ({ slice, articles = [], pagination, filters }) => {
    const { primary } = slice;

    // State management - inicializar com valores da URL
    const [searchTerm, setSearchTerm] = React.useState(filters?.search || "");
    const [selectedCategory, setSelectedCategory] = React.useState(filters?.category || "all");
    const [sortOrder, setSortOrder] = React.useState(filters?.sort || primary.default_sort || "publication_date_desc");
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

    const articlesPerPage = filters?.pageSize || primary.articles_per_page || 12;

    // Get available categories from slice or fallback to mockup
    const availableCategories = React.useMemo(() => {
        const sliceCategories = isFilled.group(primary.filter_categories) ?
            primary.filter_categories.map((cat) => ({
                name: cat.category_name || '',
                slug: cat.category_slug || ''
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

    // Função para navegar com filtros
    const navigateWithFilters = (newFilters: {
        page?: number;
        search?: string;
        category?: string;
        sort?: string;
        pageSize?: number
    }) => {
        const params = new URLSearchParams();

        // Página
        params.set('page', (newFilters.page || 1).toString());

        // Filtros
        if (newFilters.search || searchTerm) {
            params.set('search', newFilters.search || searchTerm);
        }
        if (newFilters.category || selectedCategory !== "all") {
            params.set('category', newFilters.category || selectedCategory);
        }
        if (newFilters.sort || sortOrder !== "publication_date_desc") {
            params.set('sort', newFilters.sort || sortOrder);
        }
        if (newFilters.pageSize || articlesPerPage !== 12) {
            params.set('pageSize', (newFilters.pageSize || articlesPerPage).toString());
        }

        const url = params.toString() ? `?${params.toString()}` : '';
        window.location.href = `/junco-news${url}`;
    };

    // Função para aplicar filtros (volta para página 1)
    const applyFilters = (newFilters: { search?: string; category?: string; sort?: string }) => {
        navigateWithFilters({ ...newFilters, page: 1 });
    };

    // Função para navegar para uma nova página
    const navigateToPage = (newPage: number) => {
        navigateWithFilters({ page: newPage });
    };

    return (
        <section
            className="py-6 lg:py-8"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container mx-auto px-4">
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
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                applyFilters({ search: searchTerm });
                                            }
                                        }}
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
                                    <Select value={selectedCategory} onValueChange={(value) => {
                                        setSelectedCategory(value);
                                        applyFilters({ category: value });
                                    }}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as Categorias</SelectItem>
                                            {availableCategories.map((category: { name: string; slug: string }) => (
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
                                <Select value={sortOrder} onValueChange={(value) => {
                                    setSortOrder(value);
                                    applyFilters({ sort: value });
                                }}>
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
                                {pagination?.totalResults || 0} artigo{(pagination?.totalResults || 0) !== 1 ? 's' : ''} encontrado{(pagination?.totalResults || 0) !== 1 ? 's' : ''}
                            </div>
                        </div>
                    )}
                </div>

                {/* Articles */}
                {articles.length > 0 ? (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mb-12">
                                {articles.map((article, index) => (
                                    <ArticleCard key={article.id} article={article} index={index} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid gap-3 mb-12">
                                {articles.map((article, index) => (
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
                                applyFilters({
                                    search: "",
                                    category: "all",
                                    sort: primary.default_sort || "publication_date_desc"
                                });
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
