import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

export type NavLinks = {
    label: string,
    icon: any,
    href: string,
    color?: string
}

export const navLinks: NavLinks[] = [

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


export const FREE_LIMIT_RANGE = 5;

export const tools = [
    {
        label: 'Chat',
        icon: MessageSquare,
        href: '/conversation',
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: 'Code Generation',
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
        href: '/code',
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: '/image',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: '/video',
    },

];