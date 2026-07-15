import { ContactForm } from "./ContactForm";
import { ContactSidebar } from "./ContactSidebar";

export function ContactMainSection() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1170px] grid-cols-1 items-start gap-8 px-4 md:gap-[30px] xl:grid-cols-[670px_470px] xl:gap-x-[30px] xl:px-0">
        <ContactForm />
        <ContactSidebar />
      </div>
    </section>
  );
}
