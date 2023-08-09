import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

type NavLinks = {
    label: string,
    icon: any,
    href: string,
    color?: string
}

const navLinks: NavLinks[] = [

    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Chat',
        icon: MessageSquare,
        href: '/conversation',
        color: "text-violet-500",
    },
    {
        label: 'Image Generator',
        icon: ImageIcon,
        color: "text-pink-700",
        href: '/image',
    },
    {
        label: 'Video Generator',
        icon: VideoIcon,
        color: "text-orange-700",
        href: '/video',
    },
    {
        label: 'Music Generator',
        icon: Music,
        color: "text-emerald-500",
        href: '/music',
    },
    {
        label: 'Code Generator',
        icon: Code,
        color: "text-green-700",
        href: '/code',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
]

export default navLinks;