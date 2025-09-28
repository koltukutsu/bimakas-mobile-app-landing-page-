import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

export interface EmailData {
  email: string;
  timestamp: Date;
  language: string;
  source: string; // 'landing_page', 'newsletter', etc.
}

// Email kaydetme fonksiyonu
export const saveEmail = async (emailData: Omit<EmailData, 'timestamp'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'emails'), {
      ...emailData,
      timestamp: new Date(),
      createdAt: new Date().toISOString()
    });
    
    console.log('Email başarıyla kaydedildi:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Email kaydetme hatası:', error);
    throw new Error('Email kaydedilemedi');
  }
};

// Email'leri listeleme fonksiyonu (admin için)
export const getEmails = async (): Promise<EmailData[]> => {
  try {
    const q = query(
      collection(db, 'emails'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );
    
    const querySnapshot = await getDocs(q);
    const emails: EmailData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      emails.push({
        email: data.email,
        timestamp: data.timestamp.toDate(),
        language: data.language,
        source: data.source
      });
    });
    
    return emails;
  } catch (error) {
    console.error('Email getirme hatasi:', error);
    throw new Error('Email getirilemedi');
  }
};

// Email sayısını getirme fonksiyonu
export const getEmailCount = async (): Promise<number> => {
  try {
    const q = query(collection(db, 'emails'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Email sayisi getirme hatasi:', error);
    return 0;
  }
};
