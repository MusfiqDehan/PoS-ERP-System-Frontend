export const contactData = {
  hero: {
    badge: "Contact Us",
    title: "Let's Start a Conversation",
    subtitle: "Transform your retail operations with one unified platform. Manage sales, inventory, purchases, staff, and multiple branches while gaining real-time insights to make faster, smarter decisions."
  },
  form: {
    title: "Ready to run your retail smarter?",
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
      email: { label: "Email Address *", placeholder: "Enter email address" },
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
  },
  sidebar: {
    whatsapp: {
      title: "Talk To Sales",
      value: "+880 1341-869125",
      href: "https://wa.me/8801341869125"
    },
    email: {
      title: "Email Us At",
      value: "sortorium@gmail.com",
      href: "mailto:sortorium@gmail.com"
    },
    location: {
      title: "Visit Us",
      value: "Shagufta, Pallabi, Mirpur, Dhaka 1216, Bangladesh."
    },
    support: {
      badge: "Sortorium Support",
      subtitle: "We're here to help!",
      faqs: [
        {
          question: "Is there a free trial?",
          answer: "Yes, we offer a 14-day free trial so you can explore all features before committing.",
        },
        {
          question: "Does Sortorium work offline?",
          answer: "Sortorium has an offline mode that syncs automatically once your internet connection is restored.",
        },
        {
          question: "How many branches can I manage?",
          answer: "You can manage unlimited branches from a single Sortorium dashboard.",
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. What you see is what you pay.",
        },
        {
          question: "How long does setup take?",
          answer: "Initial setup usually takes less than an hour. Our support team is available to help migrate your data.",
        },
        {
          question: "Is my data secure and backed up?",
          answer: "Yes, we use bank-level encryption and perform automated daily backups to keep your data safe.",
        },
      ],
    }
  }
};
