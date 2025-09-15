import Image from "next/image";

interface AvatarProps {
    image: string;
    name: string;
}

export default function Avatar({ image, name }: AvatarProps) {
    return (
        <Image
            width={40}
            height={40}
            src={image}
            alt={name ?? "User avatar"}
            className="rounded-full"
        />
    );
}
