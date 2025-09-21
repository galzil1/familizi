// src/app/dashboard/page.tsx
import { createServerClient } from '@supabase/ssr'; // <-- UPDATED IMPORT
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const supabase = createServerClient( // <-- UPDATED FUNCTION NAME
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
      <p>Your email: {session.user.email}</p>
      <LogoutButton />
    </div>
  );
}