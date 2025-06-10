"use client"

import { Notebook, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import RecentDocuments, { Document } from "./cards/recent-documents"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function DashboardContent() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const router = useRouter();

  const handleNewNote = async () => {
    const { data, error } = await supabase
      .from('research_documents')
      .insert([{ title: 'New Note', content: '' }])
      .select();

    if (error) {
      console.error("Error creating new note:", error);
    } else if (data && data.length > 0) {
      const newNoteId = data[0].id;
      router.push(`/editor/${newNoteId}`);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from('research_documents')
        .select('*');

      if (error) {
        console.error("Error fetching documents:", error);
      } else {
        setDocuments(data);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="space-y-6 w-full">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex gap-3 justify-between items-center  w-full">
          <div className="text-3xl flex flex-row items-center font-bold gap-2">
            <Notebook />
            Notes
          </div>
          <Button className="flex items-center gap-2" onClick={handleNewNote}>
            <Plus className="h-4 w-4" />
            <span>New Note</span>
          </Button>
        </div>
      </div>
      <RecentDocuments documents={documents}/>
    </div>
  )
}