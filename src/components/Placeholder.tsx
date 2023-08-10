import Image from "next/image";
import React from "react";

interface PlaceholderProps {
    label: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ label }) => {

    return (

        <article className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72 " >
                <Image
                    alt="Placeholder"
                    fill
                    src={"/images/placeholder-img.png"}
                />
            </div>
            <span className="text-muted-foreground text-sm text-center" >
                {label}
            </span>
        </article>
    )
}

export default Placeholder;