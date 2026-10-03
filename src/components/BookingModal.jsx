import { useState } from 'react';
import { databases, DB_ID, BOOKINGS_COLLECTION_ID, SETTINGS_COLLECTION_ID } from '../lib/appwrite';
import { ID } from 'appwrite';
import { X } from 'lucide-react';

export default function BookingModal({ room, onClose }) {
  const [formData, setFormData] = useState({
    guest_name: '',
    phone: '',
    check_in: '',
    check_out: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // 1. Save to Appwrite Database
      await databases.createDocument(DB_ID, BOOKINGS_COLLECTION_ID, ID.unique(), {
        guest_name: formData.guest_name,
        phone: formData.phone,
        room_id: room.$id,
        check_in: new Date(formData.check_in).toISOString(),
        check_out: new Date(formData.check_out).toISOString(),
        status: 'pending',
        created_at: new Date().toISOString()
      });

      // 2. Fetch hotel settings to get WhatsApp number
      let whatsappNumber = '';
      try {
        const settings = await databases.listDocuments(DB_ID, SETTINGS_COLLECTION_ID);
        if (settings.documents.length > 0) {
          whatsappNumber = settings.documents[0].whatsapp;
        }
      } catch (err) {
        console.error("Could not fetch settings for WhatsApp number", err);
      }

      setSuccess(true);

      // 3. Open WhatsApp link
      if (whatsappNumber) {
        const message = `مرحباً، أود حجز ${room.title}.\nالاسم: ${formData.guest_name}\nالهاتف: ${formData.phone}\nتاريخ الدخول: ${formData.check_in}\nتاريخ الخروج: ${formData.check_out}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          onClose();
        }, 2000);
      } else {
        setTimeout(() => {
            onClose();
        }, 2000);
      }

    } catch (error) {
      console.error("Booking error:", error);
      alert("حدث خطأ أثناء إرسال الحجز، يرجى المحاولة مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-navy z-10"
        >
          <X size={24} />
        </button>
        
        <div className="bg-navy p-6 text-white">
          <h3 className="text-xl font-bold mb-1">طلب حجز</h3>
          <p className="text-gold-light">{room.title}</p>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h4 className="text-xl font-bold text-navy mb-2">تم استلام طلبك بنجاح!</h4>
              <p className="text-gray-600">سيتم تحويلك إلى واتساب لإتمام الحجز...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">الاسم الكريم</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                  value={formData.guest_name}
                  onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">رقم الهاتف (الواتساب)</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none text-left"
                  dir="ltr"
                  placeholder="+967..."
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">تاريخ الدخول</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    value={formData.check_in}
                    onChange={(e) => setFormData({...formData, check_in: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">تاريخ الخروج</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    value={formData.check_out}
                    onChange={(e) => setFormData({...formData, check_out: e.target.value})}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full mt-6 bg-gold hover:bg-yellow-600 text-navy font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
              >
                {submitting ? 'جاري الإرسال...' : 'تأكيد وإرسال عبر الواتساب'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
