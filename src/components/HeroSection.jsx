export default function HeroSection({ settings }) {
  const name = settings?.name || 'فندق أوسان السياحي';
  const tagline = settings?.tagline || 'نقدم لكم مزيجاً من الأصالة اليمنية مع أعلى معايير الجودة';

  return (
    <div className="relative h-[80vh] flex items-center justify-center bg-navy">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-c6a4d14cece2?q=80&w=2000&auto=format&fit=crop")' }}
      ></div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tajawal tracking-tight drop-shadow-lg">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-gold-light mb-8 drop-shadow-md">
          {tagline}
        </p>
        <a 
          href="#rooms"
          className="inline-block bg-gold hover:bg-yellow-600 text-navy font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          احجز غرفتك
        </a>
      </div>
    </div>
  );
}
