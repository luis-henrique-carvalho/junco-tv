"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Copy, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
    size?: "sm" | "default" | "lg";
    variant?: "default" | "ghost" | "outline";
}

export function ShareButton({
    url,
    title,
    description = "",
    className = "",
    size = "sm",
    variant = "ghost"
}: ShareButtonProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copiado para a área de transferência!");
        } catch (err) {
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            toast.success("Link copiado para a área de transferência!");
        }
        setIsOpen(false);
    };

    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        const encodedDescription = encodeURIComponent(description);

        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, "_blank", "width=600,height=400");
        setIsOpen(false);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url,
                });
                setIsOpen(false);
            } catch (err) {
                // Usuário cancelou o compartilhamento
            }
        } else {
            // Fallback para copiar link
            handleCopyLink();
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={`text-muted-foreground hover:text-foreground ${className}`}
                >
                    <Share2 className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleNativeShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyLink}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")}>
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("twitter")}>
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
