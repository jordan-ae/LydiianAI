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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // First fetch the requested document
      const { data: requestedDoc, error: docError } = await supabase
        .from("research_documents")
        .select("*")
        .eq("id", unwrappedParams.id)
        .single();

      // If document exists and belongs to user, use it
      if (!docError && requestedDoc && requestedDoc.user_id === user.id) {
        setDocument(requestedDoc);
        setLoading(false);
        return;
      }

      // If not, fetch the user's documents
      const { data: userDocuments, error: userDocsError } = await supabase
        .from("research_documents")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (userDocsError || !userDocuments?.length) {
        // No documents found, redirect to home
        window.location.href = '/';
        return;
      }

      // Only redirect if the current document doesn't belong to the user
      if (!requestedDoc || requestedDoc.user_id !== user.id) {
        window.location.href = `/editor/${userDocuments[0].id}`;
        return;
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
