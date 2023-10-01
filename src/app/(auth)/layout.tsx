

const AuthLayout = ({
    children
}: { children: React.ReactNode }) => {

    return (

        <section className="flex items-center justify-center h-full p-4 bg-[#212225]" >
            {children}
        </section>
    )
}

export default AuthLayout;