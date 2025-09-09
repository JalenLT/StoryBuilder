import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getXsrfToken() {
    const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
}

export async function ensureCsrf() {
    // sets XSRF-TOKEN + laravel_session
    await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
}
