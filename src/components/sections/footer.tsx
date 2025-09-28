"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

const SocialIcon = ({ platform, href, config }: { platform: string; href: string; config: any }) => {
  const getIcon = () => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors duration-200 hover:opacity-80"
      style={{ backgroundColor: config?.brand?.colors?.text || '#ff7778' }}
      aria-label={`Follow us on ${platform}`}
    >
      {getIcon()}
    </a>
  );
};

export default function Footer() {
  const { t, config, currentLanguage } = useLanguage();

  const footerData = t('footer');
  
  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt={config?.brand?.logo?.alt?.en || 'BiMakas Logo'} 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>{footerData.brandSection?.title}</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">{footerData.brandSection?.subtitle}</p>
            
            {/* CTA Button */}
            <div className="mb-6">
              <a
                href={config?.cta?.enrollment?.[currentLanguage]?.url || "https://listelee.vercel.app/kuaforun-gelsin"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: config?.brand?.colors?.text || '#ff7778' }}
              >
                {config?.cta?.enrollment?.[currentLanguage]?.text || "Hemen Hizmet Ver"}
              </a>
            </div>
            
            {/* App Store Buttons */}
            <div className="flex flex-col gap-3">
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

          {/* Legal Section */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>{footerData.legalSection?.title}</h3>
            <ul className="space-y-3">
              {footerData.legalSection?.links?.map((link: any, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>{footerData.companySection?.title}</h3>
            <ul className="space-y-3">
              {footerData.companySection?.links?.map((link: any, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty column for spacing */}
          <div className="md:col-span-1"></div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">{footerData.copyright}</p>
          
          {/* Social Links */}
          <div className="flex gap-3">
            {footerData.socialLinks?.map((social: any, index: number) => (
              <SocialIcon key={index} platform={social.platform} href={social.href} config={config} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
