import { getCollection } from 'astro:content';

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export const num = (i: number) => String(i + 1).padStart(2, '0');
export const statusLabel = (s: string) => s[0].toUpperCase() + s.slice(1);
