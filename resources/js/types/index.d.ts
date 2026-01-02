import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Links {
    url: string;
    label: string;
    active: boolean;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Links[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface About {
    id: number;
    photo_url: string;
    photo_name: string;
    bio: string;
    active: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ProjectImages {
    id: number;
    project_id: number;
    image_url: string;
    image_name: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Project {
    id: number;
    images: ProjectImages[];
    title: string;
    description: string;
    link: string;
    github: string;
    tags: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}