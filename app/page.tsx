'use client'

import { ResearchAssistant } from "@/components/research-assistant"
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('expires_at');
    const authStatus = Boolean(accessToken && expiresAt && Date.now() < parseInt(expiresAt) * 1000);
    setIsAuthenticated(authStatus);

    console.log('Token:', accessToken, 'Expires:', expiresAt, 'Now:', Date.now(), authStatus);

    if (!authStatus) {
      redirect("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return null; 
  }

  return <ResearchAssistant />
}

