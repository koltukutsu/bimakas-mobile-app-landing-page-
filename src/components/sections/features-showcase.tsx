"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "@/contexts/language-context";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FeaturesShowcase = () => {
  const { t, config } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Get feature data from config with fallback
  const featureData = t('features.items') || [];
  
  // Mobile screen images that correspond to each feature
  const mobileScreens = config?.images?.features?.mobileScreens || [];

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView) {
            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq("track", "ViewContent", {
                content_name: "Features Section",
                content_category: "Engagement"
              });
            }
            setHasTrackedView(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  // Fallback if no feature data is available
  if (!Array.isArray(featureData) || featureData.length === 0) {
    return (
      <section id="features" className="py-16 lg:py-24 px-6 lg:px-8 bg-[#FFF8F0]">
        <div className="text-center text-gray-500">Loading features...</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="features" className="py-16 lg:py-24 px-6 lg:px-8 bg-[#FFF8F0]">
      <h2 className="text-center text-4xl mt-16 lg:mt-36 lg:text-[48px] font-medium mb-12 lg:mb-16" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
        {t('features.title')}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[1400px] mx-auto">
        <div className="relative mx-auto lg:mx-0">
          <Image
            src={mobileScreens[activeIndex]?.image || mobileScreens[0]?.image || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/images/hero-image-2.webp?"}
            alt={`${featureData[activeIndex]?.title || featureData[0]?.title || "Feature"} preview`}
            width={350}
            height={700}
            className="w-[300px] lg:w-[350px] h-auto transition-all duration-500 ease-in-out mx-auto transform"
            key={activeIndex} // Force re-render when image changes
          />
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex space-x-2 lg:hidden">
            {featureData.map((feature: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq("track", "ViewContent", {
                      content_name: `Feature Interaction - ${feature.title}`,
                      content_category: "Feature Engagement"
                    });
                  }
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-gray-800 scale-110" : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to feature: ${feature.title}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          {featureData.map((feature: any, index: number) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg",
                activeIndex === index
                  ? "scale-105 border-gray-800 bg-white shadow-xl ring-2 ring-gray-800/10"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:scale-102"
              )}
            >
              <h3 className={cn(
                "text-lg lg:text-xl font-semibold mb-3 transition-colors duration-300",
                activeIndex === index ? "text-gray-900" : "text-gray-800"
              )}>
                {feature.title}
              </h3>
              <p className={cn(
                "text-sm lg:text-base leading-relaxed transition-colors duration-300",
                activeIndex === index ? "text-gray-700" : "text-gray-600"
              )}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;