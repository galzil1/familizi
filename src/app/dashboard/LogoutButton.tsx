// src/app/dashboard/LogoutButton.tsx
"use client";

import { createBrowserClient } from '@supabase/ssr'; // <-- This is the new, correct import
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); 
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 p-2 text-white bg-red-500 rounded hover:bg-red-600"
    >
      Log Out
    </button>
  );
}