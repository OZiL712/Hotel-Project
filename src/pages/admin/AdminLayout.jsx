import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BedDouble, Settings } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'الحجوزات', path: '/999887passR/bookings', icon: LayoutDashboard },
    { name: 'إدارة الغرف', path: '/999887passR/rooms', icon: BedDouble },
    { name: 'الإعدادات العامة', path: '/999887passR/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col shadow-xl z-20">
        <div className="p-6 text-center border-b border-white/10">
          <h2 className="text-2xl font-bold font-tajawal text-gold">إدارة الفندق</h2>
          <p className="text-sm text-gray-400 mt-1">لوحة التحكم</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-gold text-navy font-bold' : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
