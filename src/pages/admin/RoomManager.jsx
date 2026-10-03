import { useState, useEffect } from 'react';
import { databases, storage, DB_ID, ROOMS_COLLECTION_ID, STORAGE_BUCKET_ID } from '../../lib/appwrite';
import { ID } from 'appwrite';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function RoomManager() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', category: '', price: 0, capacity: 2, description: '', amenities: '', is_available: true
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, ROOMS_COLLECTION_ID);
      setRooms(res.documents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let imageIds = [];
      if (imageFile) {
        const fileRes = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), imageFile);
        imageIds = [fileRes.$id];
      }

      const roomData = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        description: formData.description,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
        is_available: formData.is_available,
      };

      if (editingId) {
        if (imageIds.length > 0) {
          roomData.image_ids = imageIds;
          // Delete old images from storage
          const oldRoom = rooms.find(r => r.$id === editingId);
          if (oldRoom && oldRoom.image_ids?.length > 0) {
            for (const fileId of oldRoom.image_ids) {
              await storage.deleteFile(STORAGE_BUCKET_ID, fileId).catch(e => console.error('Failed to delete old image:', e));
            }
          }
        }
        await databases.updateDocument(DB_ID, ROOMS_COLLECTION_ID, editingId, roomData);
      } else {
        roomData.image_ids = imageIds;
        await databases.createDocument(DB_ID, ROOMS_COLLECTION_ID, ID.unique(), roomData);
      }
      
      setModalOpen(false);
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الحفظ: ' + err.message);
    }
  };

  const openEdit = (room) => {
    setEditingId(room.$id);
    setFormData({
      title: room.title,
      category: room.category,
      price: room.price,
      capacity: room.capacity,
      description: room.description,
      amenities: room.amenities?.join(', ') || '',
      is_available: room.is_available
    });
    setImageFile(null);
    setModalOpen(true);
  };

  const handleDelete = async (id, imageIds) => {
    if(window.confirm('هل أنت متأكد من الحذف؟ سيتم حذف الغرفة وصورتها نهائياً.')) {
      try {
        await databases.deleteDocument(DB_ID, ROOMS_COLLECTION_ID, id);
        if (imageIds && imageIds.length > 0) {
          for (const fileId of imageIds) {
            await storage.deleteFile(STORAGE_BUCKET_ID, fileId).catch(e => console.error('Failed to delete image:', e));
          }
        }
        fetchRooms();
      } catch (err) {
        console.error(err);
        alert('حدث خطأ أثناء الحذف.');
      }
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-navy font-tajawal">إدارة الغرف</h1>
        <button onClick={() => { setEditingId(null); setFormData({title: '', category: '', price: 0, capacity: 2, description: '', amenities: '', is_available: true}); setModalOpen(true); }} className="bg-gold hover:bg-yellow-600 text-navy font-bold py-2 px-6 rounded-lg flex items-center gap-2">
          <Plus size={20} />
          إضافة غرفة
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-navy border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold">اسم الغرفة</th>
              <th className="p-4 font-bold">الفئة</th>
              <th className="p-4 font-bold">السعر</th>
              <th className="p-4 font-bold">الحالة</th>
              <th className="p-4 font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rooms.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">لا توجد غرف مضافة حالياً.</td></tr>
            ) : (
                rooms.map(r => (
                <tr key={r.$id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-navy">{r.title}</td>
                    <td className="p-4 text-gray-600">{r.category}</td>
                    <td className="p-4 font-bold">{r.price} ريال</td>
                    <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {r.is_available ? 'متاحة' : 'محجوزة / صيانة'}
                    </span>
                    </td>
                    <td className="p-4 flex gap-2">
                    <button onClick={() => openEdit(r)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(r.$id, r.image_ids)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">{editingId ? 'تعديل غرفة' : 'إضافة غرفة جديدة'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">الاسم</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-gold outline-none" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">الفئة (مثال: جناح VIP)</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-gold outline-none" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">السعر</label>
                  <input type="number" required className="w-full px-4 py-2 border rounded-lg focus:ring-gold outline-none" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">السعة (أشخاص)</label>
                  <input type="number" required className="w-full px-4 py-2 border rounded-lg focus:ring-gold outline-none" value={formData.capacity} onChange={e=>setFormData({...formData, capacity: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">الوصف</label>
                <textarea required className="w-full px-4 py-2 border rounded-lg h-24 focus:ring-gold outline-none" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">المميزات (مفصولة بفاصلة)</label>
                <input type="text" placeholder="واي فاي, تكييف مركزي, إفطار مجاني" className="w-full px-4 py-2 border rounded-lg focus:ring-gold outline-none" value={formData.amenities} onChange={e=>setFormData({...formData, amenities: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">صورة الغرفة {editingId && '(اتركه فارغاً لعدم تغيير الصورة)'}</label>
                <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-lg focus:ring-gold outline-none" onChange={e => setImageFile(e.target.files[0])} required={!editingId} />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="avail" checked={formData.is_available} onChange={e=>setFormData({...formData, is_available: e.target.checked})} className="w-5 h-5 text-gold" />
                <label htmlFor="avail" className="font-bold text-navy">متاحة للحجز</label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">إلغاء</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-navy text-white font-bold hover:bg-navy-light">حفظ بيانات الغرفة</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
