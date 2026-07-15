export const demoData = {
  hero: {
    badge: "Request For Demo",
    title: "Request A Free Demo",
    subtitle: "See how Sortorium simplifies sales, inventory, purchases, and branch management from one powerful platform. Schedule your personalized demo today."
  },
  leftColumn: {
    title: "Sell More, Manage Smarter, And Grow Your Retail Business.",
    description: "Run every branch, every product, and every team from one powerful ERP platform.",
    subtitle: "Book A Free Demo To See How Sortorium Can Help You:",
    features: [
      "Manage all your branches from a single Super Admin dashboard live, in real time.",
      "Process transactions in under 34ms with a POS your cashiers will actually enjoy using.",
      "Track inventory, stock alerts, and expiry dates across every location automatically.",
      "Cut reporting time by 70% and make faster decisions backed by live sales data.",
      "Grow your business with purchase management, HR, loyalty programs, and 50+ integrations."
    ],
    footerText: "Questions? Call Us At ",
    footerPhone: "+880 1341-869125",
    footerSuffix: "-SORTORIUM"
  },
  form: {
    title: "Ready To Run Your Retail Smarter?",
    subtitle: "Give us some info so the right person can get back to you.",
    fields: {
      firstName: { label: "First Name *", placeholder: "Enter your first name" },
      lastName: { label: "Last Name *", placeholder: "Enter your last name" },
      company: { label: "Company *", placeholder: "Enter company name" },
      companySize: { 
        label: "Company Size", 
        placeholder: "Select company size",
        options: ["1-10 employees", "11-50 employees", "51-200 employees", "201+ employees"]
      },
      jobRole: {
        label: "Job Role *",
        placeholder: "Select role",
        options: ["Owner / Founder", "Store Manager", "Operations Director", "IT Administrator", "Other"]
      },
      workEmail: { label: "Work Email *", placeholder: "Enter email address" },
      country: { 
        label: "Country / Region *", 
        placeholder: "Select country",
        options: ["United States", "United Kingdom", "Canada", "Australia", "Bangladesh", "India"]
      },
      phoneCode: {
        options: ["+1", "+44", "+880", "+91", "+61"]
      },
      phone: { label: "Phone Number *", placeholder: "" },
      note: { label: "Note", placeholder: "Share your thought about project" }
    },
    checkboxText: "Yes, I would like to receive marketing communications regarding Sortorium products, services, and events. I can unsubscribe at any time.",
    privacyText: "We value your privacy. To learn more, visit our ",
    privacyLinkText: "Privacy Policy",
    privacyHref: "/privacy",
    submitButton: "Submit"
  }
};
