import { blogPageData } from "@/data/blog/page";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedLabel: string;
  category: string;
  author: string;
  authorLabel: string;
  image: string;
};

function toBlogPost(post: {
  slug: string;
  title: string;
  desc: string;
  date: string;
  category: string;
  author: string;
  image: string;
}): BlogPost {
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.desc,
    date: post.date,
    publishedLabel: `Published on :${formatPublishedDate(post.date)}`,
    category: post.category,
    author: post.author,
    authorLabel: `Author : ${post.author}`,
    image: post.image,
  };
}

function formatPublishedDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = parsed.getFullYear();

  return `${day}-${month}-${year}`;
}

const featuredPost = toBlogPost({
  slug: blogPageData.featuredBlog.slug,
  title: blogPageData.featuredBlog.heading,
  desc: blogPageData.featuredBlog.description,
  date: blogPageData.featuredBlog.date,
  category: blogPageData.featuredBlog.category,
  author: blogPageData.featuredBlog.author,
  image: "/images/blog/detail-hero.png",
});

const allPosts = blogPageData.allBlogs.map((post) => toBlogPost(post));

export const blogPosts: BlogPost[] = [featuredPost, ...allPosts];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id || post.slug === id);
}
