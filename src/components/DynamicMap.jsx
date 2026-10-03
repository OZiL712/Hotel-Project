export default function DynamicMap({ url }) {
  if (!url) return null;

  return (
    <section className="bg-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-navy mb-4 font-tajawal">موقع الفندق</h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded"></div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-96 border border-gray-100">
          <iframe 
            src={url} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع الفندق على الخريطة"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
