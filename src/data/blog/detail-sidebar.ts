export type BlogTocSubItem = {
  number: string;
  label: string;
  href: string;
};

export type BlogTocItem = {
  number: string;
  label: string;
  href: string;
  active?: boolean;
  children?: BlogTocSubItem[];
};

export const blogDetailSidebarData = {
  toc: {
    title: "Table Of Content",
    items: [
      {
        number: "1.",
        label: "Introduction",
        href: "#introduction",
        active: true,
        children: [
          {
            number: "1.1",
            label: "The Hidden Cost of Fragmented Systems.",
            href: "#hidden-cost",
          },
          {
            number: "1.2",
            label: "What a Unified ERP Does Differently",
            href: "#unified-erp-differently",
          },
        ],
      },
      {
        number: "2.",
        label: "How Retailers Reduce Reporting Time by 70%",
        href: "#reduce-reporting-time",
      },
      {
        number: "3.",
        label: "What Is a Unified ERP?",
        href: "#unified-erp",
      },
      {
        number: "4.",
        label: "Key Benefits for Multi-Branch Retailers",
        href: "#key-benefits",
      },
      {
        number: "5.",
        label: "Real-World Results",
        href: "#real-world-results",
      },
      {
        number: "6.",
        label: "conclusion",
        href: "#conclusion",
      },
    ] satisfies BlogTocItem[],
  },
  share: {
    title: "Share the blog on ",
    copyLabel: "Copy link",
    socialLinks: [
      { label: "Facebook", href: "#", icon: "/images/footer/facebook.png" },
      { label: "X", href: "#", icon: "/images/footer/x.png" },
      { label: "LinkedIn", href: "#", icon: "/images/footer/linkedin.png" },
    ],
  },
};
