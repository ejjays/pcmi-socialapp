import { useRouter } from 'next/router';
import React from 'react';

export default function ChatLayout({ children }) {
  const { pathname } = useRouter();
  const isChatPage = pathname.startsWith('/chat');

  return (
    <div className="h-screen w-screen bg-gray-900 text-white">
      {children}
    </div>
  );
}