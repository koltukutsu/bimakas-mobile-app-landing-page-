"use client";

import { Clock, Zap, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useRef, useState } from "react";

const BenefitsSection = () => {
  const { t, config } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Get benefits from translations
  const benefitItems = t('benefits.items') || [];

  // Icon mapping for each benefit
  const icons = [Clock, Zap, TrendingDown];

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView) {
            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq("track", "ViewContent", {
                content_name: "Benefits Section",
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

  if (!Array.isArray(benefitItems) || benefitItems.length === 0) {
    return (
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-[#FFF8F0]">
        <div className="text-center text-gray-500">Loading benefits...</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 px-6 lg:px-8 bg-[#FFF8F0]">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="text-4xl lg:text-[48px] font-medium mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
          {t('benefits.title')}
        </h2>
        <p className="text-xl text-gray-600 mb-16">
          {t('benefits.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefitItems.map((benefit: any, index: number) => {
            const IconComponent = icons[index] || Clock;
            
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;