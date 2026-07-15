import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/marketing/ui/Button';

export interface SimpleCtaProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function SimpleCta({ title, description, buttonText, buttonHref }: SimpleCtaProps) {
  return (
    <section className="pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-[#069D7A] rounded-[24px] md:rounded-[32px] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-[32px] sm:text-[36px] md:text-[48px] font-[800] text-white leading-[1.1] mb-4 md:mb-6">
              {title}
            </h2>
            <p className="text-[15px] md:text-[18px] text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
              {description}
            </p>
            <Link href={buttonHref} className="block w-full sm:w-auto">
              <Button 
                variant="secondary"
                size="lg" 
                className="bg-white text-[#069D7A] hover:bg-gray-50 text-[15px] md:text-[16px] font-bold rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl border-none w-full sm:w-auto py-6 sm:py-0 h-auto sm:h-11"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
