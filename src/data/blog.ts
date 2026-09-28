import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const postUrl = (p: Post) => `/blog/${p.id}`;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

/** Turn `*[Diagram: …]*` lines into visible dashed placeholder boxes. */
export function withDiagramBoxes(html: string): string {
  return html.replace(
    /<p>\s*<em>\s*\[Diagram:\s*([^\]]+)\]\s*<\/em>\s*<\/p>/g,
    (_, desc: string) =>
      `<figure class="diagram-ph" role="img" aria-label="Diagram coming soon: ${desc.trim()}"><span>Diagram coming soon:</span> ${desc.trim()}</figure>`,
  );
}
