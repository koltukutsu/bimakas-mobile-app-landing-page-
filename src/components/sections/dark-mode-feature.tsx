"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const DarkModeFeature = () => {
  const { t, config } = useLanguage();

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-[#FFF8F0]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              {t('darkMode.badge')}
            </div>
            
            <h2 className="text-4xl lg:text-[48px] font-bold text-gray-900 mb-4 leading-tight">
              {t('darkMode.title')}
            </h2>
            
            <p className="text-xl text-gray-600">
              {t('darkMode.subtitle')}
            </p>
          </div>

          {/* Mobile Mockup */}
          <div className="relative mx-auto lg:mx-0 flex justify-center">
            <div className="relative">
              <Image
                src={config?.images?.darkMode?.mobileMockup || "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=600&fit=crop"}
                alt="Dark mode app preview"
                width={300}
                height={600}
                className="w-[300px] h-auto rounded-[2.5rem] shadow-2xl"
              />
              {/* Phone bezel effect */}
              <div className="absolute inset-0 rounded-[2.5rem] ring-8 ring-gray-800 ring-opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkModeFeature;