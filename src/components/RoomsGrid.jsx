import { useState, useEffect } from 'react';
import { databases, DB_ID, ROOMS_COLLECTION_ID, storage, STORAGE_BUCKET_ID } from '../lib/appwrite';
import BookingModal from './BookingModal';

export default function RoomsGrid() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await databases.listDocuments(DB_ID, ROOMS_COLLECTION_ID);
        setRooms(response.documents);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("تعذر جلب بيانات الغرف. يرجى المحاولة لاحقاً.");
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const getImageUrl = (imageId) => {
    if (!imageId) return 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop';
    return `https://fra.cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${imageId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
  };

  return (
    <section id="rooms" className="py-20 px-4 bg-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-4 font-tajawal">غرفنا وأجنحتنا</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded"></div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-xl">
            {error}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center text-gray-500 p-8">
            لا توجد غرف متاحة حالياً.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.$id} className="bg-navy rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col border border-navy">
                <div className="relative h-64">
                  <img 
                    src={getImageUrl(room.image_ids?.[0])} 
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-navy font-bold py-1 px-3 rounded-full text-sm">
                    {room.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-gold mb-2">{room.title}</h3>
                  <p className="text-white/80 mb-4 line-clamp-2">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities?.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gold">{room.price}</span>
                      <span className="text-white/60 text-sm mr-1">ريال / ليلة</span>
                    </div>
                    <button 
                      onClick={() => setSelectedRoom(room)}
                      disabled={!room.is_available}
                      className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                        room.is_available 
                        ? 'bg-navy hover:bg-navy-light text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {room.is_available ? 'حجز الآن' : 'غير متاحة'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedRoom && (
        <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </section>
  );
}
