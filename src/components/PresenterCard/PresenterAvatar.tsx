import * as React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { isFilled } from "@prismicio/client";
import type { ImageField, KeyTextField } from "@prismicio/client";

interface PresenterAvatarProps {
    photo: ImageField;
    name: KeyTextField;
    role: KeyTextField;
    variant?: "default" | "single";
}

const PresenterAvatar: React.FC<PresenterAvatarProps> = ({
    photo,
    name,
    role,
    variant = "default"
}) => {
    const isSingleVariant = variant === "single";

    return (
        <CardHeader className={`text-center ${isSingleVariant ? "pb-4 lg:pb-6 px-0" : "pb-6 flex-shrink-0 px-4"}`}>
            {/* Avatar */}
            {isFilled.image(photo) && (
                <div className="mx-auto mb-4">
                    <Avatar className={`${isSingleVariant ? "w-24 h-24 lg:w-32 lg:h-32" : "w-20 h-20 md:w-24 md:h-24"} ring-2 ring-primary/10`}>
                        <AvatarImage
                            src={photo.url}
                            alt={photo.alt || ""}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                            {isFilled.keyText(name)
                                ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                                : 'PR'
                            }
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}

            {/* Name */}
            {isFilled.keyText(name) && (
                <CardTitle className={`${isSingleVariant ? "text-xl lg:text-2xl xl:text-3xl" : "text-lg md:text-xl"} font-bold text-foreground mb-2 leading-tight px-2`}>
                    {name}
                </CardTitle>
            )}

            {/* Role */}
            {isFilled.keyText(role) && (
                <div className="px-2 flex justify-center items-center">
                    <Badge
                        variant="secondary"
                        className={`${isSingleVariant ? "text-sm px-3 py-1" : "text-xs px-2 py-1"} font-medium max-w-full truncate`}
                    >
                        {role}
                    </Badge>
                </div>
            )}
        </CardHeader>
    );
};

export default PresenterAvatar;
