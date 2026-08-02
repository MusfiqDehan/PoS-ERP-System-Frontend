import { BlogDetailArticle } from "./BlogDetailArticle";
import { BlogDetailPromoCard } from "./BlogDetailPromoCard";
import { BlogDetailSidebar } from "./BlogDetailSidebar";

export function BlogDetailBodySection() {
  return (
    <section className="bg-white pb-12 pt-8 md:pb-20 md:pt-14">
      <div className="mx-auto grid w-full max-w-[1170px] grid-cols-1 items-start gap-8 px-4 md:gap-10 xl:grid-cols-[270px_minmax(0,540px)_300px] xl:gap-[30px] xl:px-0">
        <div className="order-2 min-w-0 xl:order-1">
          <BlogDetailSidebar />
        </div>
        <div className="order-1 min-w-0 xl:order-2">
          <BlogDetailArticle />
        </div>
        <div className="order-3 min-w-0 xl:order-3">
          <BlogDetailPromoCard />
        </div>
      </div>
    </section>
  );
}
