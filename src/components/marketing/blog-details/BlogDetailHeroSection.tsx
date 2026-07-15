import type { BlogPost } from "@/data/blog/posts";

type BlogDetailHeroSectionProps = Readonly<{
  post: BlogPost;
}>;

export function BlogDetailHeroSection({ post }: BlogDetailHeroSectionProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#D2F9E9] to-white pb-10 pt-[120px] md:pb-16 md:pt-[140px]">
      <div className="relative mx-auto flex w-full max-w-[1170px] flex-col gap-8 px-4 md:flex-row md:items-start md:gap-[30px] xl:px-0">
        <div className="flex w-full flex-col justify-center gap-6 md:w-[570px] md:gap-[24px]">
          <div className="flex flex-col gap-3 md:gap-[12px]">
            <h1 className="mb-0 w-full text-[28px]! font-semibold capitalize leading-[1.5]! text-[#212121] md:text-[36px]!">
              {post.title}
            </h1>
            <p className="mb-0 w-full text-[16px]! font-normal leading-[1.5]! text-[#666666]">
              {post.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <p className="mb-0 whitespace-nowrap text-[16px]! font-medium leading-[normal]! text-[#666666]">
              {post.publishedLabel}
            </p>
            <span className="inline-flex items-center justify-center rounded-[4px] bg-[#089B7C] px-3 py-1 text-[16px]! font-medium leading-[normal]! text-white">
              {post.category}
            </span>
            <p className="mb-0 whitespace-nowrap text-[16px]! font-medium leading-[normal]! text-[#085D4E]">
              {post.authorLabel}
            </p>
          </div>
        </div>

        <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[8px] border-solid border-[#089B7C] border-b-2 border-l-4 border-r-2 border-t-4 bg-[#F5F5F5] sm:h-[340px] md:h-[400px] md:w-[570px]">
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover"
            width={570}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
