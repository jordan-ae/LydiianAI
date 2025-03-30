"use client";

import { ResearchAssistant } from "@/components/research-assistant";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      const { data, error } = await supabase
        .from("research_documents")
        .select("*")
        .eq("id", unwrappedParams.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setDocument(data);
      }
      setLoading(false);
    };

    fetchDocument();
  }, [unwrappedParams.id]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Initializing Lydiian AI...</p>
        </div>
      </div>
    );

  if (!document) return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold text-primary">Document Not Found</h1>
        <p className="text-muted-foreground max-w-md">
          The document you're looking for doesn't exist or may have been deleted.
        </p>
        <Button
          variant="default"
          onClick={() => window.location.href = '/'}
          className="mt-4"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );

  return (
    <ResearchAssistant
      initialDocumentId={unwrappedParams.id}
      initialContent={document?.content}
      initialTitle={document?.title}
    />
  );
}
