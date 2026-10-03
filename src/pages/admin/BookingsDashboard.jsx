import { useState, useEffect } from 'react';
import { databases, DB_ID, BOOKINGS_COLLECTION_ID, ROOMS_COLLECTION_ID } from '../../lib/appwrite';
import { MessageCircle } from 'lucide-react';

export default function BookingsDashboard() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, roomsRes] = await Promise.all([
        databases.listDocuments(DB_ID, BOOKINGS_COLLECTION_ID),
        databases.listDocuments(DB_ID, ROOMS_COLLECTION_ID)
      ]);
      
      const roomsMap = {};
      roomsRes.documents.forEach(r => {
        roomsMap[r.$id] = r.title;
      });
      setRooms(roomsMap);
      
      const sortedBookings = bookingsRes.documents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBookings(sortedBookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (phone, guest_name, roomTitle) => {
    const message = `مرحباً بك أستاذ ${guest_name} في فندقنا. بخصوص حجزك لـ ${roomTitle}...`;
    const url = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-8 font-tajawal">طلبات الحجز</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-navy border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold">الضيف</th>
              <th className="p-4 font-bold">الهاتف</th>
              <th className="p-4 font-bold">الغرفة</th>
              <th className="p-4 font-bold">التاريخ</th>
              <th className="p-4 font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500">لا توجد طلبات حجز حالياً.</td></tr>
            ) : (
              bookings.map(b => (
                <tr key={b.$id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-navy">{b.guest_name}</td>
                  <td className="p-4 text-gray-600" dir="ltr" style={{textAlign: 'right'}}>{b.phone}</td>
                  <td className="p-4 font-bold">{rooms[b.room_id] || 'غرفة غير معروفة'}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>الدخول: {new Date(b.check_in).toLocaleDateString()}</div>
                    <div>الخروج: {new Date(b.check_out).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => openWhatsApp(b.phone, b.guest_name, rooms[b.room_id] || '')}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      <MessageCircle size={16} />
                      رد عبر واتساب
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
