import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "What's My Problem?",
    description: 'A monthly notebook of disturbances.',
    site: context.site ?? 'https://whatsmyproblem.blog',
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.pull_quote,
      link: `/posts/${p.id}`,
    })),
  });
}
