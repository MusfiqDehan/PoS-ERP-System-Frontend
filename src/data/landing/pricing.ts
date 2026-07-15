export const pricingContent = {
  badge: "Pricing",
  title: "Simple, Predictable Pricing",
  description: "Start free, scale as you grow. No hidden fees, no per-transaction charges.",
  monthlyLabel: "Monthly",
  annuallyLabel: "Annually",
  discountBadge: "20%",
  plans: [
    {
      name: "Basic",
      monthlyPrice: "$39",
      annualPrice: "$29",
      subtitle: "1 branch",
      desc: "Perfect for small retailers ready to streamline their daily sales, stock, and customer management in one place.",
      buttonText: "Get Started",
      features: [
        "POS & Inventory",
        "Up to 5 staff accounts",
        "Basic sales reports",
        "Email support",
        "Mobile app access"
      ],
      isPopular: false,
    },
    {
      name: "Business",
      monthlyPrice: "$119",
      annualPrice: "$99",
      subtitle: "Up to 5 branch",
      desc: "Perfect for growing retail businesses managing multiple branches, teams, and higher sales volumes under one roof.",
      buttonText: "Get Started",
      features: [
        "Everything in Basic",
        "Multi-branch management",
        "Purchase & supplier module",
        "Advanced analytics",
        "Priority support",
        "HR & attendance tools",
        "Customer loyalty module",
        "Stock transfer between branches",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      subtitle: "",
      desc: "Tailored for large retail chains and enterprises that need unlimited branches, custom integrations, and dedicated support.",
      buttonText: "Talk To Sales",
      features: [
        "Everything in Business",
        "Custom integrations & API",
        "Dedicated onboarding",
        "SLA guarantee (99.9%)",
        "On-premise option",
        "Unlimited branches & users",
        "Custom roles & permissions",
        "Dedicated account manager",
      ],
      isPopular: false,
    }
  ]
};
