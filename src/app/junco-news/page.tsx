import { Suspense } from "react";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

// Import loading component
import Loading from "./loading";
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

    // Parâmetros de paginação
    const currentPage = parseInt(searchParams.page as string) || 1;
    const pageSize = parseInt(searchParams.pageSize as string) || 1;

    // Buscar artigos com paginação do Prismic
    const articlesResponse = await client.getByType("news_article", {
        fetchLinks: ["news_article.category", "news_article.author"],
        pageSize: pageSize,
        page: currentPage,
        orderings: [{ field: "document.first_publication_date", direction: "desc" }]
    });

    // Buscar todos os artigos para FeaturedArticles (primeiros 4)
    const featuredArticles = await client.getAllByType("news_article", {
        fetchLinks: ["news_article.category", "news_article.author"],
        pageSize: 4,
        orderings: [{ field: "document.first_publication_date", direction: "desc" }]
    });

    // Passar os artigos e metadados de paginação para os componentes
    const componentsWithArticles = {
        ...components,
        featured_articles: (props: any) => {
            const FeaturedArticlesComponent = components.featured_articles;
            return <FeaturedArticlesComponent {...props} articles={featuredArticles} />;
        },
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
            />;
        }
    };

    return <SliceZone slices={page.data.slices} components={componentsWithArticles} />;
}
