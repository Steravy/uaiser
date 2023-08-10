import Image from "next/image";


const Loader = () => {

    return (

        <article className="h-full flex flex-col gap-y-4 items-center justify-center" >
            <div className="w-10 h-10 relative animate-spin" >
                <Image
                    alt="logo"
                    fill
                    src={"/images/logo.png"}
                />
            </div>
            <span className="text-sm text-muted-foreground" >
                Uaiser is thinking...
            </span>
        </article>
    )
}

export default Loader;