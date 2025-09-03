"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

const AppStoreButton = () => {
  const { config } = useLanguage();
  
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
  const { t, config } = useLanguage();

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