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
      <svg width="162" height="49.2" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="135" height="40" rx="7.4" fill="black"/>
        <g transform="translate(15, 8)">
          <path d="M7.4,7.4C5.7,7.4,4.2,7.9,3,8.7C1.8,9.5,0.9,10.6,0.3,12c-0.1,0.2-0.1,0.3-0.1,0.5c0,0.2,0,0.3,0.1,0.5c-0.4,1.8,0.3,3.6,1.4,4.9c0.9,1.1,2.2,1.9,3.6,2.1c0.1,0,0.2,0,0.3,0c1.3,0,2.6-0.6,3.5-1.6c1.1-1.2,1.7-2.7,1.6-4.3c0.1-0.1,0.1-0.2,0-0.3c0,0,0-0.1,0-0.1c-0.1-1-0.5-2-1.2-2.9C8.9,7.6,8.2,7.4,7.4,7.4z M6.4,3.2C6.5,4.9,5.2,6.4,3.6,6.5c-0.1,0-0.1,0-0.2,0C1.8,6.3,0.5,4.9,0.5,3.2c0-0.1,0-0.1,0-0.2C0.6,1.4,2,0.1,3.7,0c0.1,0,0.1,0,0.2,0C5.4,0.2,6.7,1.6,6.4,3.2z" fill="white"/>
          <text fontFamily="Inter, sans-serif" fill="white" fontSize="9" y="8" x="22">Download on the</text>
          <text fontFamily="Inter, sans-serif" fill="white" fontSize="17" fontWeight="600" y="25" x="22">App Store</text>
        </g>
      </svg>
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
              Used by your favorite fitness influencers 👀
            </span>
          </div>

          <h1 className="text-[52px] font-bold leading-tight text-gray-900">
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
            alt="Cal AI app preview showing scanner and nutrition screens"
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