// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'; // <-- The new, correct import
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for a confirmation link!');
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push('/dashboard');
      router.refresh(); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Familize</h1>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Log In
        </button>
        <button
          onClick={handleSignUp}
          className="w-full p-2 text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}