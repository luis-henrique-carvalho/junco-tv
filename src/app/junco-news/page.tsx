import { Suspense } from "react";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

// Import loading component
import Loading from "./loading";

/**
 * Generates metadata for the news index page.
 */
export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();

    try {
        const page = await client.getSingle("news_index");

        return {
            title: page.data.meta_title || "Notícias - Junco TV",
            description: page.data.meta_description || "Acompanhe as principais notícias e acontecimentos da região com a cobertura completa da Junco TV.",
            openGraph: {
                title: page.data.meta_title || "Notícias - Junco TV",
                description: page.data.meta_description || "Acompanhe as principais notícias e acontecimentos da região.",
                images: page.data.meta_image?.url ? [
                    {
                        url: page.data.meta_image.url,
                        width: 1200,
                        height: 630,
                        alt: page.data.meta_image.alt || "Notícias Junco TV",
                    }
                ] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: page.data.meta_title || "Notícias - Junco TV",
                description: page.data.meta_description || "Acompanhe as principais notícias e acontecimentos da região.",
                images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
            },
        };
    } catch (error) {
        // Fallback metadata if page doesn't exist in Prismic yet
        return {
            title: "Notícias - Junco TV",
            description: "Acompanhe as principais notícias e acontecimentos da região com a cobertura completa da Junco TV.",
        };
    }
}

/**
 * News index page component that displays the SliceZone with news content.
 */
export default async function NewsIndexPage() {
    const client = createClient();

    let page;
    try {
        page = await client.getSingle("news_index");
    } catch (error) {
        // If the news_index doesn't exist yet, render a default page with slices
        return (
            <Suspense fallback={<Loading />}>
                <DefaultNewsPage />
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<Loading />}>
            <SliceZone slices={page.data.slices} components={components} />
        </Suspense>
    );
}

function DefaultNewsPage() {
    // Mock slice data that matches our implemented slices
    const mockSlices = [
        {
            slice_type: "featured_articles",
            variation: "default",
            primary: {
                section_title: "Notícias em Destaque",
                section_description: [
                    {
                        type: "paragraph",
                        text: "As principais notícias selecionadas pela nossa redação para você ficar por dentro dos acontecimentos mais importantes.",
                        spans: []
                    }
                ],
                max_articles: 6,
                show_category_filter: false,
                layout_style: "Grid"
            },
            items: []
        },
        {
            slice_type: "articles_grid",
            variation: "default",
            primary: {
                section_title: "Todas as Notícias",
                articles_per_page: 12,
                show_filters: true,
                show_search: true,
                default_sort: "publication_date_desc",
                filter_categories: [
                    { category_name: "Tecnologia", category_slug: "tecnologia" },
                    { category_name: "Economia", category_slug: "economia" },
                    { category_name: "Esportes", category_slug: "esportes" },
                    { category_name: "Política", category_slug: "politica" },
                    { category_name: "Cultura", category_slug: "cultura" },
                    { category_name: "Saúde", category_slug: "saude" }
                ]
            },
            items: []
        }
    ];

    return (
        <div>
            <SliceZone slices={mockSlices as any} components={components} />
        </div>
    );
}
