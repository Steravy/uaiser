
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (

        <section className="h-full relative" >

            <aside className="h-full md:w-72 hidden md:flex md:flex-col md:fixed md:inset-y-0 z-30 bg-gray-900" >
                <h1>I am a nav oooooook</h1>
            </aside>

            <main className="md:pl-72" >
                main content here
            </main>
            {children}
        </section>
    )
}

export default DashboardLayout;