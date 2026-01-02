import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { index as indexAbout } from '@/routes/about';
import { index as indexProject } from '@/routes/project';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Briefcase, Github, Linkedin, User } from 'lucide-react';
import AppLogo from './app-logo';
import { home } from '@/routes';

const mainNavItems: NavItem[] = [
    {
        title: 'About',
        href: indexAbout(),
        icon: User
    },
    {
        title: 'Project',
        href: indexProject(),
        icon: Briefcase
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/MevlanaDimas',
        icon: Github,
    },
    {
        title: 'Linkedin',
        href: 'https://linkedin.com/in/maulana-arbi',
        icon: Linkedin,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
