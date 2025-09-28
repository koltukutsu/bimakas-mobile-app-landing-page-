"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/navbar';
import Footer from '@/components/sections/footer';
import { getEmails, getEmailCount, EmailData } from '@/lib/emailService';
import { Mail, Users, Calendar, Globe } from 'lucide-react';

export default function AdminPage() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [emailCount, setEmailCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [emailsData, count] = await Promise.all([
          getEmails(),
          getEmailCount()
        ]);
        setEmails(emailsData);
        setEmailCount(count);
      } catch (err) {
        setError('Veriler yüklenirken hata oluştu');
        console.error('Admin sayfası hatası:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FFF8F0] pt-16">
          <div className="container mx-auto px-6 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0] pt-16">
        <div className="container mx-auto px-6 lg:px-8 py-20 max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#ff7778' }}>
              Email Yönetimi
            </h1>
            <p className="text-gray-600 text-lg">
              Kaydedilen email adreslerini görüntüleyin ve yönetin
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* İstatistikler */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-pink-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#ff7778' }}>
                    {emailCount}
                  </p>
                  <p className="text-gray-600">Toplam Email</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#ff7778' }}>
                    {emails.filter(e => e.source === 'landing_page').length}
                  </p>
                  <p className="text-gray-600">Landing Page</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#ff7778' }}>
                    {emails.filter(e => e.language === 'tr').length}
                  </p>
                  <p className="text-gray-600">Türkçe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Listesi */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Email Listesi</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dil
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kaynak
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emails.map((email, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {email.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          email.language === 'tr' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {email.language === 'tr' ? 'Türkçe' : 'English'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {email.source}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(email.timestamp)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {emails.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Henüz kaydedilmiş email bulunmuyor</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
