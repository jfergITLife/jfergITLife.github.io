import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => {
    return data.draft !== true;
  });

  return rss({
    title: 'JFergITLife — notes.log',
    description: 'Welcome to my brain. Write-ups on new tech, old tech, opinions, deep thoughts, and the occasional rant. A thinking place that happens to be public.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}