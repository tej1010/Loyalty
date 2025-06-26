import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};