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
      const fetchOrCreateDocument = async () => {
        const user = await supabase.auth.getUser();
        if (!user.data.user?.id) return;

        const { data, error } = await supabase
          .from('research_documents')
          .select('id')
          .eq('user_id', user.data.user.id)
          .order('updated_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          redirect(`/editor/${data[0].id}`);
          return;
        }

        const { data: newDocument, error: createError } = await supabase
          .from('research_documents')
          .insert({ 
            title: 'Untitled Document',
            user_id: user.data.user.id
          })
          .select('id')
          .single();

        if (!createError && newDocument) {
          redirect(`/editor/${newDocument.id}`);
        } else {
          console.error('Error creating document:', createError);
        }
      };
      fetchOrCreateDocument();
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading your documents...</p>
      </div>
    </div>
  );
}

