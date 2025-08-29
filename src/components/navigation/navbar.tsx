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
          <div className="text-2xl font-bold text-gray-900">
            {t('navigation.logo')}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.href)}
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                activeSection === item.key
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-600'
              }`}
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
              <svg width="135" height="40" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="135" height="40" rx="7.4" fill="black"/>
                <g transform="translate(15, 8)">
                  <path d="M7.4,7.4C5.7,7.4,4.2,7.9,3,8.7C1.8,9.5,0.9,10.6,0.3,12c-0.1,0.2-0.1,0.3-0.1,0.5c0,0.2,0,0.3,0.1,0.5c-0.4,1.8,0.3,3.6,1.4,4.9c0.9,1.1,2.2,1.9,3.6,2.1c0.1,0,0.2,0,0.3,0c1.3,0,2.6-0.6,3.5-1.6c1.1-1.2,1.7-2.7,1.6-4.3c0.1-0.1,0.1-0.2,0-0.3c0,0,0-0.1,0-0.1c-0.1-1-0.5-2-1.2-2.9C8.9,7.6,8.2,7.4,7.4,7.4z M6.4,3.2C6.5,4.9,5.2,6.4,3.6,6.5c-0.1,0-0.1,0-0.2,0C1.8,6.3,0.5,4.9,0.5,3.2c0-0.1,0-0.1,0-0.2C0.6,1.4,2,0.1,3.7,0c0.1,0,0.1,0,0.2,0C5.4,0.2,6.7,1.6,6.4,3.2z" fill="white"/>
                  <text fontFamily="Inter, sans-serif" fill="white" fontSize="9" y="8" x="22">Download on the</text>
                  <text fontFamily="Inter, sans-serif" fill="white" fontSize="17" fontWeight="600" y="25" x="22">App Store</text>
                </g>
              </svg>
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
              <svg width="108" height="32" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="135" height="40" rx="7.4" fill="black"/>
                <g transform="translate(15, 8)">
                  <path d="M7.4,7.4C5.7,7.4,4.2,7.9,3,8.7C1.8,9.5,0.9,10.6,0.3,12c-0.1,0.2-0.1,0.3-0.1,0.5c0,0.2,0,0.3,0.1,0.5c-0.4,1.8,0.3,3.6,1.4,4.9c0.9,1.1,2.2,1.9,3.6,2.1c0.1,0,0.2,0,0.3,0c1.3,0,2.6-0.6,3.5-1.6c1.1-1.2,1.7-2.7,1.6-4.3c0.1-0.1,0.1-0.2,0-0.3c0,0,0-0.1,0-0.1c-0.1-1-0.5-2-1.2-2.9C8.9,7.6,8.2,7.4,7.4,7.4z M6.4,3.2C6.5,4.9,5.2,6.4,3.6,6.5c-0.1,0-0.1,0-0.2,0C1.8,6.3,0.5,4.9,0.5,3.2c0-0.1,0-0.1,0-0.2C0.6,1.4,2,0.1,3.7,0c0.1,0,0.1,0,0.2,0C5.4,0.2,6.7,1.6,6.4,3.2z" fill="white"/>
                  <text fontFamily="Inter, sans-serif" fill="white" fontSize="7" y="7" x="22">Download on the</text>
                  <text fontFamily="Inter, sans-serif" fill="white" fontSize="14" fontWeight="600" y="22" x="22">App Store</text>
                </g>
              </svg>
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
                    ? 'text-gray-900 bg-gray-100 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
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
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t('navigation.languageSelector.english')}
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentLanguage === 'tr'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
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
                  <svg width="108" height="32" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="135" height="40" rx="7.4" fill="black"/>
                    <g transform="translate(15, 8)">
                      <path d="M7.4,7.4C5.7,7.4,4.2,7.9,3,8.7C1.8,9.5,0.9,10.6,0.3,12c-0.1,0.2-0.1,0.3-0.1,0.5c0,0.2,0,0.3,0.1,0.5c-0.4,1.8,0.3,3.6,1.4,4.9c0.9,1.1,2.2,1.9,3.6,2.1c0.1,0,0.2,0,0.3,0c1.3,0,2.6-0.6,3.5-1.6c1.1-1.2,1.7-2.7,1.6-4.3c0.1-0.1,0.1-0.2,0-0.3c0,0,0-0.1,0-0.1c-0.1-1-0.5-2-1.2-2.9C8.9,7.6,8.2,7.4,7.4,7.4z M6.4,3.2C6.5,4.9,5.2,6.4,3.6,6.5c-0.1,0-0.1,0-0.2,0C1.8,6.3,0.5,4.9,0.5,3.2c0-0.1,0-0.1,0-0.2C0.6,1.4,2,0.1,3.7,0c0.1,0,0.1,0,0.2,0C5.4,0.2,6.7,1.6,6.4,3.2z" fill="white"/>
                      <text fontFamily="Inter, sans-serif" fill="white" fontSize="7" y="7" x="22">Download on the</text>
                      <text fontFamily="Inter, sans-serif" fill="white" fontSize="14" fontWeight="600" y="22" x="22">App Store</text>
                    </g>
                  </svg>
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