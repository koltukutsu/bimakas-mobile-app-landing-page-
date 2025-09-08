"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const AppStoreButton = () => {
  const { config, currentLanguage } = useLanguage();
  
  const isInDev = config?.configuration?.isAppStoreInDev;
  
  if (isInDev) {
    return (
      <div className="w-[135px] h-[40px] bg-gray-300 rounded-lg flex items-center justify-center cursor-not-allowed border border-gray-400">
        <div className="flex items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-600">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
          </svg>
          <span className="text-gray-600 text-xs font-medium">
            {config?.comingSoon?.appStore?.[currentLanguage] || "Çok Yakında"}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <a
      href={config?.links?.appStore?.ios || "https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616"}
      className="block transition-transform hover:scale-105"
      aria-label="Download on the App Store"
    >
      <img
        src={config?.brand?.appStoreButtons?.appStore || "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"}
        alt="Download on the App Store"
        width={135}
        height={40}
      />
    </a>
  );
};

export default function RatingsCta() {
  const { t, config, currentLanguage } = useLanguage();

  return (
    <section id="download" className="relative overflow-hidden bg-[#F5F0E8] py-16 text-center text-gray-900 sm:py-20 lg:py-24">
      {/* Left Wreath */}
      <div className="absolute left-[3%] top-1/2 -translate-y-1/2 transform opacity-40 hidden md:block lg:opacity-60">
        <Image
          src="/wreath.svg"
          alt="Decorative wreath"
          width={42}
          height={120}
          className="w-8 lg:w-10 xl:w-12"
        />
      </div>
      
      {/* Right Wreath - Mirrored */}
      <div className="absolute right-[3%] top-1/2 -translate-y-1/2 transform opacity-40 hidden md:block lg:opacity-60">
        <Image
          src="/wreath.svg"
          alt="Decorative wreath"
          width={42}
          height={120}
          className="w-8 lg:w-10 xl:w-12 scale-x-[-1]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-8">
        {/* Large Stars */}
        <div className="mb-6 flex justify-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mx-0.5 sm:mx-1">
              <svg width="48" height="48" viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FCD34D"/>
              </svg>
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
          {t('ratingsCta.title')}
        </h2>

        <div className="mb-6 flex items-center justify-center text-base sm:text-lg font-medium text-gray-700 gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#1f2937"/>
            </svg>
            <span>{t('ratingsCta.ratings.appStore')}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#1f2937"/>
            </svg>
            <span>{t('ratingsCta.ratings.googlePlay')}</span>
          </div>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <AppStoreButton />
          {config?.configuration?.isGooglePlayInDev ? (
            <div className="w-[135px] h-[40px] bg-gray-300 rounded-lg flex items-center justify-center cursor-not-allowed border border-gray-400">
              <div className="flex items-center space-x-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                  <path d="M3 20.5v-17c0-.35.18-.68.49-.86L12 12l-8.51 9.36c-.31-.18-.49-.51-.49-.86zM14.73 12.94L12 15.68 4.51 2.14c.07-.04.15-.08.24-.1L14.73 12.94zM19.49 11.05L16.25 9.21 13.06 12l3.19 2.79 3.24-1.84c.51-.29.51-1.06 0-1.35zM12 8.32L14.73 11.06 4.75 21.96c-.09-.02-.17-.06-.24-.1L12 8.32z"/>
                </svg>
                <span className="text-gray-600 text-xs font-medium">
                  {config?.comingSoon?.googlePlay?.[currentLanguage] || "Çok Yakında"}
                </span>
              </div>
            </div>
          ) : (
            <a 
              href={config?.links?.appStore?.android || "https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"} 
              className="block transition-transform hover:scale-105"
            >
              <Image
                src={config?.brand?.appStoreButtons?.googlePlay || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/images/googleplay-1.png?"}
                alt="Get it on Google Play"
                width={135}
                height={40}
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}