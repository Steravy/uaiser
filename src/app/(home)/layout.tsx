
type HomePageLayoutProps = {
    children: React.ReactNode
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {

    return (

        <main className="h-full bg-[#212225] overflow-auto">
            {children}
        </main>
    )
}

export default HomePageLayout;