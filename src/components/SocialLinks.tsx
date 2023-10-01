import { SocialIcon } from 'react-social-icons';
type Props = {}

const SocialLinks = (props: Props) => {
    const iconStyles = { height: '2rem', width: '2rem' }

    return (

        <nav className='flex items-center '>
            <SocialIcon url="https://github.com/Steravy" fgColor='gray' bgColor='transparent' style={iconStyles} className='hover:animate-pulse' />
            <SocialIcon url="https://www.linkedin.com/in/stefan-vit%C3%B3ria-391924261/" fgColor='gray' bgColor='transparent' style={iconStyles} className='hover:animate-pulse' />
            <SocialIcon url="https://twitter.com/Ste_ravy" fgColor='gray' bgColor='transparent' style={iconStyles} className='hover:animate-pulse' />
        </nav>
    )
}

export default SocialLinks