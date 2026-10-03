import { useState, useEffect } from 'react';
import { databases, DB_ID, SETTINGS_COLLECTION_ID } from '../../lib/appwrite';
import { ID } from 'appwrite';
import { Save } from 'lucide-react';

export default function SettingsManager() {
  const [settings, setSettings] = useState({
    name: '',
    tagline: '',
    phone: '',
    whatsapp: '',
    address: '',
    map_embed_url: ''
  });
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await databases.listDocuments(DB_ID, SETTINGS_COLLECTION_ID);
        if (response.documents.length > 0) {
          const doc = response.documents[0];
          setDocId(doc.$id);
          setSettings({
            name: doc.name || '',
            tagline: doc.tagline || '',
            phone: doc.phone || '',
            whatsapp: doc.whatsapp || '',
            address: doc.address || '',
            map_embed_url: doc.map_embed_url || ''
          });
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (docId) {
        await databases.updateDocument(DB_ID, SETTINGS_COLLECTION_ID, docId, settings);
      } else {
        const res = await databases.createDocument(DB_ID, SETTINGS_COLLECTION_ID, ID.unique(), settings);
        setDocId(res.$id);
      }
      alert('تم الحفظ بنجاح!');
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الحفظ.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-navy mb-8 font-tajawal">الإعدادات العامة</h1>
      
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-navy mb-2">اسم الفندق</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold outline-none" 
              value={settings.name} onChange={(e)=>setSettings({...settings, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-2">الشعار اللفظي (Tagline)</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold outline-none" 
              value={settings.tagline} onChange={(e)=>setSettings({...settings, tagline: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-2">رقم الهاتف العام</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold outline-none text-left" dir="ltr"
              value={settings.phone} onChange={(e)=>setSettings({...settings, phone: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-2">رقم الواتساب (للحجوزات)</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold outline-none text-left" dir="ltr"
              placeholder="+967..." value={settings.whatsapp} onChange={(e)=>setSettings({...settings, whatsapp: e.target.value})} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-navy mb-2">العنوان بالتفصيل</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold outline-none" 
              value={settings.address} onChange={(e)=>setSettings({...settings, address: e.target.value})} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-navy mb-2">رابط تضمين خريطة جوجل (Embed URL)</label>
            <input type="url" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold outline-none text-left" dir="ltr"
              value={settings.map_embed_url} onChange={(e)=>setSettings({...settings, map_embed_url: e.target.value})} />
          </div>
        </div>

        {settings.map_embed_url && (
          <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 h-64">
            <iframe src={settings.map_embed_url} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        )}

        <button type="submit" disabled={saving} className="bg-gold hover:bg-yellow-600 text-navy font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
          <Save size={20} />
          {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
        </button>
      </form>
    </div>
  );
}
