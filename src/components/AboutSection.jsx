import { Star, Shield, Coffee } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 px-4 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-4 font-tajawal">مرحباً بكم في قلب عتق</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-navy rounded-2xl text-center border border-navy hover:shadow-xl transition-shadow shadow-md">
            <div className="w-16 h-16 bg-white/5 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gold">خدمات VIP</h3>
            <p className="text-white/80 leading-relaxed">
              نقدم أرقى الخدمات للوفود وكبار الشخصيات لضمان إقامة مريحة وهادئة تليق بضيوفنا.
            </p>
          </div>

          <div className="p-6 bg-navy rounded-2xl text-center border border-navy hover:shadow-xl transition-shadow shadow-md">
            <div className="w-16 h-16 bg-white/5 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Coffee size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gold">الوفود والشركات</h3>
            <p className="text-white/80 leading-relaxed">
              تجهيزات كاملة لاستقبال الوفود التجارية والشركات، مع توفير قاعات اجتماعات مصغرة وخدمات أعمال متكاملة.
            </p>
          </div>

          <div className="p-6 bg-navy rounded-2xl text-center border border-navy hover:shadow-xl transition-shadow shadow-md">
            <div className="w-16 h-16 bg-white/5 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gold">موقع استراتيجي</h3>
            <p className="text-white/80 leading-relaxed">
              يقع فندقنا في أفضل أحياء مدينة عتق - شبوة، قريباً من أهم المرافق الحيوية والخدمية في المحافظة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
