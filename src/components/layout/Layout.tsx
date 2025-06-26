import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};