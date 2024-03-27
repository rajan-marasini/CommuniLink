import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
    imageUrl?: string;
}

export default function AvatarDemo({ imageUrl }: Props) {
    return (
        <Avatar>
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>
                <img src="/img/user.png" alt="" />
            </AvatarFallback>
        </Avatar>
    );
}
