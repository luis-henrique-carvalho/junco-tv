import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

// Import loading component
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/**
 * Generates metadata for the news index page.
 */
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


export default async function Page(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    const client = createClient();
    const page = await client.getSingle("junco_news").catch(() => notFound());

    // Parâmetros de paginação e filtros
    const currentPage = parseInt(searchParams.page as string) || 1;
    const pageSize = parseInt(searchParams.pageSize as string) || 12;
    const category = searchParams.category as string || "all";
    const search = searchParams.search as string || "";
    const sort = searchParams.sort as string || "publication_date_desc";

    // Ordenação
    const orderings = [
        sort === "publication_date_desc" ? { field: "document.first_publication_date", direction: "desc" as const } :
            sort === "publication_date_asc" ? { field: "document.first_publication_date", direction: "asc" as const } :
                sort === "title_asc" ? { field: "document.title", direction: "asc" as const } :
                    sort === "title_desc" ? { field: "document.title", direction: "desc" as const } :
                        { field: "document.first_publication_date", direction: "desc" as const }
    ];

    // Buscar artigos com paginação e filtros do Prismic
    let articlesResponse;

    if (category !== "all" && search) {
        // Filtro por categoria E busca
        articlesResponse = await client.getByType("news_article", {
            fetchLinks: ["news_article.category", "news_article.author"],
            pageSize: pageSize,
            page: currentPage,
            orderings: orderings,
            filters: [
                `[at(my.news_article.category, "${category}")]`,
                `[fulltext(document, "${search}")]`
            ]
        });
    } else if (category !== "all") {
        // Filtro apenas por categoria
        articlesResponse = await client.getByType("news_article", {
            fetchLinks: ["news_article.category", "news_article.author"],
            pageSize: pageSize,
            page: currentPage,
            orderings: orderings,
            filters: [`[at(my.news_article.category, "${category}")]`]
        });
    } else if (search) {
        // Filtro apenas por busca
        articlesResponse = await client.getByType("news_article", {
            fetchLinks: ["news_article.category", "news_article.author"],
            pageSize: pageSize,
            page: currentPage,
            orderings: orderings,
            filters: [`[fulltext(document, "${search}")]`]
        });
    } else {
        // Sem filtros
        articlesResponse = await client.getByType("news_article", {
            fetchLinks: ["news_article.category", "news_article.author"],
            pageSize: pageSize,
            page: currentPage,
            orderings: orderings
        });
    }

    // Buscar artigos destacados para FeaturedArticles
    const featuredArticles = await client.getAllByType("news_article", {
        filters: [
            prismic.filter.at("my.news_article.featured", true)
        ],
        fetchLinks: ["news_article.category", "news_article.author"],
        pageSize: 10, // Buscar mais para ter opções de ordenação
        orderings: [
            { field: "my.news_article.featured_order", direction: "asc" },
            { field: "document.first_publication_date", direction: "desc" }
        ]
    });

    // Passar os artigos e metadados de paginação para os componentes
    const componentsWithArticles = {
        ...components,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        featured_articles: (props: any) => {
            const FeaturedArticlesComponent = components.featured_articles;
            return <FeaturedArticlesComponent {...props} articles={featuredArticles} />;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        articles_grid: (props: any) => {
            const ArticlesGridComponent = components.articles_grid;
            return <ArticlesGridComponent
                {...props}
                articles={articlesResponse.results}
                pagination={{
                    currentPage,
                    totalPages: articlesResponse.total_pages,
                    totalResults: articlesResponse.total_results_size,
                    hasNextPage: articlesResponse.next_page !== null,
                    hasPrevPage: articlesResponse.prev_page !== null,
                    nextPage: articlesResponse.next_page,
                    prevPage: articlesResponse.prev_page
                }}
                filters={{
                    category,
                    search,
                    sort,
                    pageSize
                }}
            />;
        }
    };

    return <SliceZone slices={page.data.slices} components={componentsWithArticles} />;
}
