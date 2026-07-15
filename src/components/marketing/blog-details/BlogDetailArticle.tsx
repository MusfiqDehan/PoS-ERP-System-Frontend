import { blogDetailArticleData } from "@/data/blog/detail-content";

function ArticleList({
  items,
  lineHeight = "leading-[1.8]",
}: Readonly<{ items: string[]; lineHeight?: string }>) {
  return (
    <ul className={`mb-0 list-disc ps-6 text-[16px]! font-normal text-[#666666] ${lineHeight}`}>
      {items.map((item) => (
        <li key={item} className="mb-0">
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({
  children,
  size = "large",
}: Readonly<{ children: string; size?: "large" | "medium" }>) {
  const className =
    size === "large"
      ? "mb-0 text-[22px]! font-semibold leading-[1.3]! text-[#212121] sm:text-[26px]! md:text-[28px]!"
      : "mb-0 text-[18px]! font-semibold leading-[1.3]! text-[#212121] sm:text-[20px]!";

  return <h2 className={className}>{children}</h2>;
}

export function BlogDetailArticle() {
  const { blocks } = blogDetailArticleData;

  return (
    <article className="flex w-full max-w-[570px] flex-col gap-4">
      {blocks.map((block, index) => {
        if (block.type === "section") {
          return (
            <section key={block.id} id={block.id} className="flex flex-col gap-4">
              <SectionTitle>{block.title}</SectionTitle>
              {block.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-0 text-[16px]! font-normal leading-[1.5]! text-[#666666]"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          );
        }

        if (block.type === "subsection-group") {
          return (
            <div key={`subsection-group-${index}`} className="flex flex-col gap-4">
              {block.items.map((item) => (
                <section key={item.id} id={item.id} className="flex flex-col gap-4">
                  <SectionTitle size="medium">{item.title}</SectionTitle>
                  <div className="text-[16px]! font-normal text-[#666666]">
                    <p className="mb-0 leading-[1.8]!">{item.intro}</p>
                    <ArticleList items={[...item.bullets]} />
                    {item.outro ? (
                      <p className="mb-0 mt-0 leading-[1.5]!">{item.outro}</p>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <div
              key={block.src}
              className="relative h-[200px] w-full overflow-hidden rounded-[8px] border-solid border-[#089B7C] border-b-2 border-l-4 border-r-2 border-t-4 bg-[#F5F5F5] sm:h-[240px] md:h-[280px]"
            >
              <img
                src={block.src}
                alt={block.alt}
                className="size-full object-cover"
                width={570}
                height={280}
              />
            </div>
          );
        }

        if (block.type === "rich-section") {
          return (
            <section key={block.id} id={block.id} className="flex flex-col gap-4">
              <SectionTitle>{block.title}</SectionTitle>
              {block.parts.map((part) => {
                if (part.kind === "text-block") {
                  return (
                    <div
                      key={part.heading}
                      className="text-[16px]! leading-[1.5]! text-[#212121]"
                    >
                      <p className="mb-0 font-semibold text-[#212121]">{part.heading}</p>
                      <p className="mb-0 font-normal text-[#666666]">{part.body}</p>
                    </div>
                  );
                }

                return (
                  <div
                    key={part.heading}
                    className="text-[16px]! font-normal text-[#666666]"
                  >
                    <p className="mb-0 font-semibold leading-[1.5]! text-[#212121]">
                      {part.heading}
                    </p>
                    {part.intro ? (
                      <p className="mb-0 leading-[1.5]!">{part.intro}</p>
                    ) : null}
                    <ArticleList items={[...part.bullets]} lineHeight="leading-[1.5]" />
                    {part.outro ? (
                      <p className="mb-0 leading-[1.5]!">{part.outro}</p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={block.text}
              className="flex min-h-[174px] items-center justify-center rounded-[8px] border-solid border-[#089B7C] border-b border-l-2 border-r border-t-2 bg-[#D2F9E9] px-9 py-8"
            >
              <div className="flex max-w-[498px] flex-col gap-2 text-center">
                <p className="mb-0 text-[18px]! font-medium leading-[1.5]! text-[#089B7C]">
                  {block.text}
                </p>
                <cite className="mb-0 text-[14px]! font-normal not-italic leading-[1.5]! text-[#666666]">
                  {block.author}
                </cite>
              </div>
            </blockquote>
          );
        }

        return null;
      })}
    </article>
  );
}
