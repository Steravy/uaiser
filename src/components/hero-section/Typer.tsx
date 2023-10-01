
import { Cursor, useTypewriter } from 'react-simple-typewriter';


type Props = {}

const Typer = (props: Props) => {

    const [text, count] = useTypewriter({
        words: [
            "Chat Bot.",
            "Code Generation.",
            "Audio Generation.",
            "Video Generation.",
           
        ],
        loop: true,
        delaySpeed: 2000
    })

    return (

        <article className='text-start mt-2' >
            <h1 className='text-2xl lg:text-4xl text-center md:text-start font-semibold pr-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600' >
                <span className='mr-1 text-center md:text-start'>{text}</span>
                <Cursor cursorColor='purple' />
            </h1>
        </article>
    )
}

export default Typer;