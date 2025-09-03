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
    { key: 'features', label: t('navigation.menuItems.features'), href: '#features' },
    { key: 'testimonials', label: t('navigation.menuItems.testimonials'), href: '#testimonials' },
    { key: 'reviews', label: t('navigation.menuItems.reviews'), href: '#reviews' },
    { key: 'download', label: t('navigation.menuItems.download'), href: '#download' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          </div>

          {/* App Store Buttons - Tablet */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};