"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { useLanguage } from '@/contexts/language-context';
import { Mail, CheckCircle, Clock, Star } from 'lucide-react';
import { saveEmail } from '@/lib/emailService';

export default function LandingPage() {
  const { t, config, currentLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Email'i Firebase'e kaydet
      await saveEmail({
        email: email,
        language: currentLanguage,
        source: 'landing_page'
      });
      
      console.log('Email Firebase kaydedildi:', email);
      
      // Başarı mesajı için kısa bekleme
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Email kaydetme hatası:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#FFE4E6] pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-8 py-20 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              Çok Yakında Hizmete Giriyoruz!
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
                BiMakas
              </span>
              <br />
              <span className="text-gray-800">
                {currentLanguage === 'tr' 
                  ? 'Evinize Geliyor!' 
                  : 'Coming to Your Home!'
                }
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              {currentLanguage === 'tr' 
                ? 'Berber ve güzellik uzmanlarını evinize getiren devrim niteliğindeki uygulama çok yakında!'
                : 'The revolutionary app that brings barbers and beauty professionals to your home is coming soon!'
              }
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="max-w-2xl mx-auto mb-20">
            {!isSubmitted ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-pink-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
                    {currentLanguage === 'tr' 
                      ? 'Ön kayıtta ilk kuaför hizmetiniz ücretsiz'
                      : 'Your first barber service is free with pre-registration'
                    }
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {currentLanguage === 'tr' 
                      ? 'Uygulama yayına çıktığında size haber verelim'
                      : 'We\'ll notify you when the app launches'
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentLanguage === 'tr' ? 'E-posta adresinizi girin' : 'Enter your email address'}
                      required
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    style={{ backgroundColor: config?.brand?.colors?.text || '#ff7778' }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {currentLanguage === 'tr' ? 'Kaydediliyor...' : 'Saving...'}
                      </div>
                    ) : (
                      currentLanguage === 'tr' ? 'Beni Bilgilendir' : 'Notify Me'
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-green-600">
                  {currentLanguage === 'tr' ? 'Teşekkürler!' : 'Thank You!'}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {currentLanguage === 'tr' 
                    ? 'E-posta adresiniz başarıyla kaydedildi. Uygulama yayına çıktığında size haber vereceğiz!'
                    : 'Your email has been successfully saved. We\'ll notify you when the app launches!'
                  }
                </p>
                
                {/* Free Service Notification */}
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">🎉</span>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
                      {currentLanguage === 'tr' ? 'Harika Haber!' : 'Great News!'}
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {currentLanguage === 'tr' 
                      ? 'Mailini yazıp onay aldıktan sonra ilk hizmetiniz ücretsizdir!'
                      : 'After writing your email and getting confirmation, your first service is free!'
                    }
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="px-6 py-3 text-pink-600 border-2 border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  {currentLanguage === 'tr' ? 'Yeni E-posta Ekle' : 'Add Another Email'}
                </button>
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
                {currentLanguage === 'tr' ? 'Evde Hizmet' : 'Home Service'}
              </h3>
              <p className="text-gray-600 text-lg">
                {currentLanguage === 'tr' 
                  ? 'Berber ve kuaförleri evinize getiriyoruz'
                  : 'We bring barbers and hairdressers to your home'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
                {currentLanguage === 'tr' ? 'Anında Randevu' : 'Instant Booking'}
              </h3>
              <p className="text-gray-600 text-lg">
                {currentLanguage === 'tr' 
                  ? 'Hızlı ve kolay randevu sistemi'
                  : 'Fast and easy booking system'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
                {currentLanguage === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment'}
              </h3>
              <p className="text-gray-600 text-lg">
                {currentLanguage === 'tr' 
                  ? 'Güvenli ve kolay ödeme seçenekleri'
                  : 'Secure and easy payment options'
                }
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-lg font-semibold text-gray-700 ml-2">4.9/5</span>
            </div>
            <p className="text-gray-600 text-lg">
              {currentLanguage === 'tr' 
                ? 'Beta test kullanıcıları tarafından değerlendirildi'
                : 'Rated by beta test users'
              }
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
