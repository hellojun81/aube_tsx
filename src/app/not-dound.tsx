// app/not-found.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist. You will be redirected to the home page.</p>
    </div>
  );
}
