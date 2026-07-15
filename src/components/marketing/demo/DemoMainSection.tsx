import { DemoBenefits } from "./DemoBenefits";
import { DemoForm } from "./DemoForm";

export function DemoMainSection() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1170px] grid-cols-1 items-start gap-10 px-4 md:gap-12 lg:grid-cols-[minmax(0,470px)_minmax(0,670px)] lg:gap-x-[30px] xl:px-0">
        <DemoBenefits />
        <DemoForm />
      </div>
    </section>
  );
}
