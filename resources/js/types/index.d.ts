import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

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
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

type PointData = {
    id: string;
    text: {
        value: string;
        type: string;
    };
    creator_id: number;
}

type CharacterData = {
    id: string;
    first_name: { value: string, type: string };
    last_name: { value: string, type: string };
    alias: { value: string, type: string };
    description: { value: string, type: string };
    background: { value: string, type: string };
    age: { value: number, type: string };
    gender: { value: string, type: string };
    motivation: { value: string, type: string };
    story_id: number;
    setting_id: number;
}

type SettingData = {
    id: string,
    name: { value: string; type: string };
    description: { value: string; type: string };
    world?: { value: string; type: string };
    era?: { value: string; type: string; options?: { value: string; label: string }[] };
    climate?: { value: string; type: string; options?: { value: string; label: string }[] };
    story_id: BigInteger;
};

type FeatureData = {
    id: string;
    name: {value: string, type: string};
    type: {value: string, type: string};
    description: {value: string, type: string};
    story_id: BigInteger;
};

type PointData = {
    id: string;
    text: {
        value: string;
        type: string;
    };
    creator_id: BigInteger;
}

type SceneData = {
    id: string,
    title: { value: string, type: string },
    points: { points: PointData[], type: string },
    creator_id: BigInteger,
    story_id: BigInteger,
    setting_id: BigInteger
};

export type NodeData = {
    key?:  {
        id: string,
        value: string, 
        type: string, 
        options?: string,
        points?: PointData[]
    };
}
