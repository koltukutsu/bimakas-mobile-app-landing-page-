"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/language-context';

export const Navbar: React.FC = () => {
  const { currentLanguage, setLanguage, t, config } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { key: 'coming-soon', label: 'Çok Yakında', href: '/landing_page' },
    { key: 'features', label: t('navigation.menuItems.features'), href: '#features' },
    { key: 'testimonials', label: t('navigation.menuItems.testimonials'), href: '#testimonials' },
    { key: 'reviews', label: t('navigation.menuItems.reviews'), href: '#reviews' },
    { key: 'download', label: t('navigation.menuItems.download'), href: '#download' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      // Sayfa değiştirme
      window.location.href = href;
    } else {
      // Sayfa içi scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'testimonials', 'reviews', 'download'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 ">
      <div className="container mx-auto px-6 lg:px-8 h-16 flex items-center justify-between max-w-[1400px]">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt={config.brand.logo.alt[currentLanguage] || 'BiMakas Logo'} 
            className="h-8 w-auto mr-3"
          />
          <div className="text-2xl font-bold" style={{ color: config.brand.colors.text }}>
            {t('navigation.logo')}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.href)}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.key
                  ? 'font-semibold'
                  : 'text-gray-600'
              }`}
              style={{
                color: activeSection === item.key ? config.brand.colors.text : undefined
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.color = config.brand.colors.text}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (activeSection !== item.key) {
                  e.currentTarget.style.color = '';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href={config.cta?.enrollment?.[currentLanguage]?.url || "https://listelee.vercel.app/kuaforun-gelsin"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: config.brand.colors.text }}
            >
              {config.cta?.enrollment?.[currentLanguage]?.text || "Hemen Hizmet Ver"}
            </a>
          </div>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">
                  {currentLanguage === 'en' ? t('navigation.languageSelector.english') : t('navigation.languageSelector.turkish')}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={currentLanguage === 'en' ? 'bg-gray-100' : ''}
              >
                {t('navigation.languageSelector.english')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('tr')}
                className={currentLanguage === 'tr' ? 'bg-gray-100' : ''}
              >
                {t('navigation.languageSelector.turkish')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* App Store Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {config.configuration?.isAppStoreInDev ? (
              <div className="h-10 bg-gray-300 rounded flex items-center justify-center cursor-not-allowed px-3 border border-gray-400">
                <div className="flex items-center space-x-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
                  </svg>
                  <span className="text-gray-600 text-xs font-medium">
                    {config?.comingSoon?.appStore?.[currentLanguage] || "Çok Yakında"}
                  </span>
                </div>
              </div>
            ) : (
              <a
                href={config.links.appStore.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
                aria-label="Download on the App Store"
              >
                <img
                  src={config.brand.appStoreButtons.appStore}
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
            )}
            {config.configuration?.isGooglePlayInDev ? (
              <div className="h-10 bg-gray-300 rounded flex items-center justify-center cursor-not-allowed px-3 border border-gray-400">
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
                href={config.links.appStore.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
                aria-label="Get it on Google Play"
              >
                <img
                  src={config.brand.appStoreButtons.googlePlay}
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            )}
          </div>

          {/* App Store Buttons - Tablet */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            {config.configuration?.isAppStoreInDev ? (
              <div className="h-8 bg-gray-300 rounded flex items-center justify-center cursor-not-allowed px-2 border border-gray-400">
                <div className="flex items-center space-x-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
                  </svg>
                  <span className="text-gray-600 text-xs font-medium">
                    {config?.comingSoon?.appStore?.[currentLanguage] || "Çok Yakında"}
                  </span>
                </div>
              </div>
            ) : (
              <a
                href={config.links.appStore.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
                aria-label="Download on the App Store"
              >
                <img
                  src={config.brand.appStoreButtons.appStore}
                  alt="Download on the App Store"
                  className="h-8"
                />
              </a>
            )}
            {config.configuration?.isGooglePlayInDev ? (
              <div className="h-8 bg-gray-300 rounded flex items-center justify-center cursor-not-allowed px-2 border border-gray-400">
                <div className="flex items-center space-x-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                    <path d="M3 20.5v-17c0-.35.18-.68.49-.86L12 12l-8.51 9.36c-.31-.18-.49-.51-.49-.86zM14.73 12.94L12 15.68 4.51 2.14c.07-.04.15-.08.24-.1L14.73 12.94zM19.49 11.05L16.25 9.21 13.06 12l3.19 2.79 3.24-1.84c.51-.29.51-1.06 0-1.35zM12 8.32L14.73 11.06 4.75 21.96c-.09-.02-.17-.06-.24-.1L12 8.32z"/>
                  </svg>
                  <span className="text-gray-600 text-xs font-medium">
                    {config?.comingSoon?.googlePlay?.[currentLanguage] || "Çok Yakında"}
                  </span>
                </div>
              </div>
            ) : (
              <a
                href={config.links.appStore.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
                aria-label="Get it on Google Play"
              >
                <img
                  src={config.brand.appStoreButtons.googlePlay}
                  alt="Get it on Google Play"
                  className="h-8"
                />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg">
          <div className="container mx-auto px-6 lg:px-8 py-4 space-y-4 max-w-[1400px]">
            {/* CTA Button - Mobile */}
            <div className="px-4 py-2">
              <a
                href={config.cta?.enrollment?.[currentLanguage]?.url || "https://listelee.vercel.app/kuaforun-gelsin"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 text-center text-sm font-medium text-white rounded-lg transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: config.brand.colors.text }}
              >
                {config.cta?.enrollment?.[currentLanguage]?.text || "Hemen Hizmet Ver"}
              </a>
            </div>

            {/* Navigation Items */}
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.key
                    ? 'bg-gray-100 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  color: activeSection === item.key ? config.brand.colors.text : undefined
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Language Selector - Mobile */}
            <div className="px-4 py-2">
              <div className="text-xs font-medium text-gray-500 mb-2">Language</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentLanguage === 'en'
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: currentLanguage === 'en' ? config.brand.colors.text : undefined
                  }}
                >
                  {t('navigation.languageSelector.english')}
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentLanguage === 'tr'
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: currentLanguage === 'tr' ? config.brand.colors.text : undefined
                  }}
                >
                  {t('navigation.languageSelector.turkish')}
                </button>
              </div>
            </div>

            {/* App Store Buttons - Mobile */}
            <div className="px-4 py-2">
              <div className="text-xs font-medium text-gray-500 mb-2">Download App</div>
              <div className="flex space-x-2">
                {config.configuration?.isAppStoreInDev ? (
                  <div className="h-8 bg-gray-300 rounded flex items-center justify-center cursor-not-allowed px-2 border border-gray-400">
                    <div className="flex items-center space-x-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
                      </svg>
                      <span className="text-gray-600 text-xs font-medium">
                        {config?.comingSoon?.appStore?.[currentLanguage] || "Çok Yakında"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <a
                    href={config.links.appStore.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105"
                    aria-label="Download on the App Store"
                  >
                    <img
                      src={config.brand.appStoreButtons.appStore}
                      alt="Download on the App Store"
                      className="h-8"
                    />
                  </a>
                )}
                {config.configuration?.isGooglePlayInDev ? (
                  <div className="h-8 bg-gray-300 rounded flex items-center justify-center cursor-not-allowed px-2 border border-gray-400">
                    <div className="flex items-center space-x-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                        <path d="M3 20.5v-17c0-.35.18-.68.49-.86L12 12l-8.51 9.36c-.31-.18-.49-.51-.49-.86zM14.73 12.94L12 15.68 4.51 2.14c.07-.04.15-.08.24-.1L14.73 12.94zM19.49 11.05L16.25 9.21 13.06 12l3.19 2.79 3.24-1.84c.51-.29.51-1.06 0-1.35zM12 8.32L14.73 11.06 4.75 21.96c-.09-.02-.17-.06-.24-.1L12 8.32z"/>
                      </svg>
                      <span className="text-gray-600 text-xs font-medium">
                        {config?.comingSoon?.googlePlay?.[currentLanguage] || "Çok Yakında"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <a
                    href={config.links.appStore.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105"
                    aria-label="Get it on Google Play"
                  >
                    <img
                      src={config.brand.appStoreButtons.googlePlay}
                      alt="Get it on Google Play"
                      className="h-8"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};