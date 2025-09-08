import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileX, ArrowLeft, Search } from "lucide-react";
import FloatingParticles from "@/components/layout/floating-particles";
import Link from "next/link";

/**
 * Not found page for individual news articles
 * Following dark theme preference [[memory:8364192]]
 */
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative overflow-hidden">
                <FloatingParticles />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <Card className="bg-gradient-to-br from-card/90 via-card/70 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-2xl">
                            <CardContent className="p-12">
                                <div className="mb-8">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mb-6">
                                        <FileX className="w-12 h-12 text-muted-foreground" />
                                    </div>

                                    <h1 className="text-4xl font-bold mb-4">
                                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            Artigo não encontrado
                                        </span>
                                    </h1>

                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        O artigo que você está procurando não existe ou foi removido.
                                        Pode ser que o link esteja incorreto ou que o conteúdo tenha sido movido.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button size="lg" asChild className="group">
                                            <Link href="/junco-news">
                                                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                                Voltar para Notícias
                                            </Link>
                                        </Button>

                                        <Button variant="outline" size="lg" asChild className="group">
                                            <Link href="/">
                                                <Search className="w-4 h-4 mr-2" />
                                                Ir para Início
                                            </Link>
                                        </Button>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        Ou use a busca na página principal para encontrar o conteúdo que procura.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
