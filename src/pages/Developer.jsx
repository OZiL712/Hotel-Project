import { useState } from 'react';
import { Mail, ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import amroImg from '../assets/amro.jpeg';

const GithubIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const InstagramIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

export default function Developer() {
  const [lang, setLang] = useState('ar');

  const content = {
    ar: {
      name: "عمرو خالد الشرافي",
      title: "مطور تطبيقات ومواقع ويب",
      bio1: "شغوف بتقنية المعلومات، متخصص في تطوير تطبيقات Flutter وبناء حلول رقمية عملية تلبي احتياجات المستخدمين. أمتلك خبرة في تصميم وتطوير تطبيقات متكاملة، تشمل أنظمة إدارة، تطبيقات خدمية، ومشاريع ويب تفاعلية.",
      bio2: "عملت على عدة مشاريع واقعية مثل تطبيقات تنظيم المراسلات، الأدلة السياحية، وأنظمة معالجة الصور، بالإضافة إلى العديد من المشاريع البرمجية التي تعكس مهاراتي في البرمجة وتصميم واجهات المستخدم.",
      bio3: "أسعى دائماً إلى تقديم تجارب استخدام بسيطة، سريعة، وفعالة، مع التركيز على الجودة والأداء العالي. أؤمن أن التقنية ليست مجرد أكواد، بل أدوات لصنع حلول حقيقية تُحدث فرقاً في حياة الناس.",
      back: "العودة للرئيسية",
      translate: "English"
    },
    en: {
      name: "Amro Alshurafy",
      title: "App & Web Developer",
      bio1: "A passionate IT professional specializing in Flutter applications and building practical digital solutions that meet user needs. I have experience designing and developing integrated applications, including management systems, service apps, and interactive web projects.",
      bio2: "I have worked on several real-world projects such as messaging organizers, tourist guides, and image processing systems, in addition to many software projects that reflect my programming and UI design skills.",
      bio3: "I always strive to deliver simple, fast, and effective user experiences, focusing on quality and high performance. I believe technology is not just code, but a tool to create real solutions that make a difference in people's lives.",
      back: "Back to Home",
      translate: "العربية"
    }
  };

  const t = content[lang];

  return (
    <div className={`min-h-screen bg-gray-50 text-navy ${lang === 'ar' ? 'font-cairo' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="flex items-center gap-2 text-navy hover:text-gold transition-colors font-bold">
            <ArrowLeft className={lang === 'ar' ? '' : 'rotate-180'} />
            {t.back}
          </Link>
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all font-bold text-sm"
          >
            <Globe size={18} />
            {t.translate}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="h-48 bg-navy relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          
          <div className="px-8 pb-12 relative">
            {/* Profile Image */}
            <div className="flex justify-center -mt-24 mb-6">
              <div className="w-48 h-48 rounded-full border-8 border-white overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                <img 
                  src={amroImg} 
                  alt={t.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Amro+Alshurafy&background=0a192f&color=d4af37&size=200'; }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-2 font-tajawal">{t.name}</h1>
              <p className="text-gold font-bold text-lg mb-6">{t.title}</p>
              
              <div className="flex justify-center gap-4">
                <a href="mailto:amroalshurafy@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-gray-50 p-3 rounded-full hover:bg-navy hover:text-gold transition-colors text-navy shadow-sm">
                  <Mail size={24} />
                </a>
                <a href="https://github.com/OZiL712" target="_blank" rel="noopener noreferrer" className="bg-gray-50 p-3 rounded-full hover:bg-navy hover:text-gold transition-colors text-navy shadow-sm">
                  <GithubIcon size={24} />
                </a>
                <a href="https://www.instagram.com/4o7.x" target="_blank" rel="noopener noreferrer" className="bg-gray-50 p-3 rounded-full hover:bg-navy hover:text-gold transition-colors text-navy shadow-sm">
                  <InstagramIcon size={24} />
                </a>
              </div>
            </div>

            {/* Bio Sections */}
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
              <p className="bg-gray-50 p-6 rounded-2xl border-r-4 border-gold">{t.bio1}</p>
              <p className="bg-gray-50 p-6 rounded-2xl border-r-4 border-gold">{t.bio2}</p>
              <p className="bg-gray-50 p-6 rounded-2xl border-r-4 border-gold">{t.bio3}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
