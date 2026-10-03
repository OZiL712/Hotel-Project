import { useState, useEffect } from 'react';
import { databases, DB_ID, SETTINGS_COLLECTION_ID } from '../lib/appwrite';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import RoomsGrid from '../components/RoomsGrid';
import DynamicMap from '../components/DynamicMap';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const GithubIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const InstagramIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

export default function LandingPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await databases.listDocuments(DB_ID, SETTINGS_COLLECTION_ID);
        if (response.documents.length > 0) {
          setSettings(response.documents[0]);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <HeroSection settings={settings} />
      <AboutSection />
      <RoomsGrid />
      {settings?.map_embed_url && <DynamicMap url={settings.map_embed_url} />}

      <footer className="bg-navy py-8 text-center text-white/60 mt-12 rounded-t-[40px]">
        <div className="flex flex-col items-center">
          <Link to="/developer" className="text-[10px] text-white/50 hover:text-gold border border-white/20 hover:border-gold/50 rounded-full px-3 py-1 transition-colors mb-6 font-tajawal">
            عن المطور
          </Link>
          <div className="text-center mb-3 font-sans" translate="no">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Developed by</p>
            <p className="text-xs font-bold text-white/60 tracking-wider">Amro Al-Shurafy © 2027</p>
          </div>
          <div className="flex gap-4">
            <a href="mailto:amroalshurafy@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors opacity-70 hover:opacity-100" title="Email">
              <Mail size={14} />
            </a>
            <a href="https://github.com/OZiL712" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors opacity-70 hover:opacity-100" title="GitHub">
              <GithubIcon size={14} />
            </a>
            <a href="https://www.instagram.com/4o7.x" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors opacity-70 hover:opacity-100" title="Instagram">
              <InstagramIcon size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
