import type { Metadata } from "next";

import BlogDetailsPage from "@/components/marketing/blog-details/BlogDetailsPage";
import { blogPosts, getBlogPostById } from "@/data/blog/posts";

type BlogDetailPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  return <BlogDetailsPage id={id} />;
}
