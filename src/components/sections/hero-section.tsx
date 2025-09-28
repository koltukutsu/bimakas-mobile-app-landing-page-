"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

const AppStoreButton = () => {
  const { config, currentLanguage } = useLanguage();
  
  const isInDev = config?.configuration?.isAppStoreInDev;
  
  if (isInDev) {
    return (
      <div className="relative inline-block">
        <div className="w-[162px] h-[49.2px] bg-gray-300 rounded-lg flex items-center justify-center cursor-not-allowed border border-gray-400">
          <div className="flex items-center space-x-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
            </svg>
            <span className="text-gray-600 text-sm font-medium">
              {config?.comingSoon?.appStore?.[currentLanguage] || "Çok Yakında"}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <a
      href={config?.links?.appStore?.ios || "https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616?ppid=0fdd527c-4a8a-4b3f-9db0-ee844938c041"}
      className="block transition-transform hover:scale-105"
      aria-label="Download on the App Store"
    >
      <img
        src={config?.brand?.appStoreButtons?.appStore || "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"}
        alt="Download on the App Store"
        width={162}
        height={49.2}
      />
    </a>
  );
};

const HeroSection = () => {
  const { t, config, currentLanguage } = useLanguage();

  const userAvatars = config?.images?.hero?.userAvatars || [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/icons/used-by-1-1.png?',
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/icons/used-by-2-2.png?',
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/icons/used-by-3-3.png?',
  ];

  return (
    <section className="bg-[#FFF8F0] pt-10">
      <main className="container grid grid-cols-1 lg:grid-cols-2 items-center max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-4 w-fit mx-auto p-5 sm:p-0 lg:-mt-10 text-center lg:text-left items-center lg:items-start">
          {/* Used by favorite fitness influencers social proof section */}
          <div className="flex items-center gap-3 text-sm text-gray-800 font-medium mb-2">
            <div className="flex -space-x-2">
              {userAvatars.map((avatar, index) => (
                <div key={index} className="relative">
                  <Image
                    src={avatar}
                    alt={`Fitness influencer ${index + 1}`}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-gray-700">
              {t('hero.socialProof')}
            </span>
          </div>

          <h1 className="text-[52px] font-bold leading-tight" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
            {t('hero.headline')} <br />
            <span className="font-medium">
              {t('hero.subheadline').split(' ').slice(0, 3).join(' ')}<br />
              {t('hero.subheadline').split(' ').slice(3).join(' ')}
            </span>
          </h1>

          <p className="text-gray-600 text-base font-normal max-w-[510px]">
            {t('hero.description')}
          </p>

          <div className="flex sm:flex-row flex-col gap-4 mt-4">
            <AppStoreButton />
            {config?.configuration?.isGooglePlayInDev ? (
              <div className="relative inline-block">
                <div className="w-[162px] h-[47.8px] bg-gray-300 rounded-lg flex items-center justify-center cursor-not-allowed border border-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                      <path d="M3 20.5v-17c0-.35.18-.68.49-.86L12 12l-8.51 9.36c-.31-.18-.49-.51-.49-.86zM14.73 12.94L12 15.68 4.51 2.14c.07-.04.15-.08.24-.1L14.73 12.94zM19.49 11.05L16.25 9.21 13.06 12l3.19 2.79 3.24-1.84c.51-.29.51-1.06 0-1.35zM12 8.32L14.73 11.06 4.75 21.96c-.09-.02-.17-.06-.24-.1L12 8.32z"/>
                    </svg>
                    <span className="text-gray-600 text-sm font-medium">
                      {config?.comingSoon?.googlePlay?.[currentLanguage] || "Çok Yakında"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <a 
                href={config?.links?.appStore?.android || "https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"} 
                className="block transition-transform hover:scale-105"
              >
                <Image
                  src={config?.brand?.appStoreButtons?.googlePlay || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/images/googleplay-1.png?"}
                  alt={t('hero.cta.secondary')}
                  width={162}
                  height={47.8}
                />
              </a>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <a
              href={config?.cta?.enrollment?.[currentLanguage]?.url || "https://listelee.vercel.app/kuaforun-gelsin"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-base font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ backgroundColor: config?.brand?.colors?.text || '#ff7778' }}
            >
              {config?.cta?.enrollment?.[currentLanguage]?.text || "Hemen Hizmet Ver"}
            </a>
          </div>

          {/* Coming Soon Button */}
          <div className="mt-4">
            <a
              href="/landing_page"
              className="inline-block px-8 py-4 text-base font-semibold text-gray-700 rounded-lg border-2 border-gray-300 transition-all duration-200 hover:border-pink-500 hover:text-pink-500 hover:scale-105"
            >
              {currentLanguage === 'tr' ? 'Çok Yakında - Haberdar Ol' : 'Coming Soon - Get Notified'}
            </a>
          </div>
         </div>

        <div className="overflow-hidden sm:overflow-visible mx-auto pb-10 sm:pb-0">
          <Image
            src={config?.images?.hero?.mobileMockup || "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4c004796-6564-41c1-bffa-6c2ecaf870e0-calai-app/assets/images/hero-image-2.webp?"}
            alt="BiMakas app preview showing beauty service booking screens"
            width={700}
            height={700}
            className="h-full max-w-[400px] sm:max-w-full"
            priority
          />
        </div>
      </main>
    </section>
  );
};

export default HeroSection;