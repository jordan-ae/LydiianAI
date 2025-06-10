'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { supabase } from '@/lib/supabase-client';

export default function Home() {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('expires_at');
    const authStatus = Boolean(accessToken && expiresAt && Date.now() < parseInt(expiresAt) * 1000);

    if (!authStatus) {
      redirect("/login");
    } else {
      redirect("/notes")
    }
  }, []);

  return null;
}

