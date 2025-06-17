import { Button } from "@/components/ui/button";
import { ArrowRight, Ellipsis, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { RecentDocumentCard } from "./recent-documents-card";

export type Document = {
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  title: string;
  id: string;
};

interface IDocs {
  documents: Document[];
}

export default function RecentDocuments(documents: IDocs) {
  if (documents.documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">
          You don't have any notes yet.
        </p>
      </div>
    );
  }

  const categorizeDocuments = (docs: Document[]) => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const categorized = {
      today: [] as Document[],
      lastWeek: [] as Document[],
      older: [] as Document[],
    };

    docs.forEach((doc) => {
      const updatedDate = new Date(doc.updated_at);
      if (updatedDate.toDateString() === today.toDateString()) {
        categorized.today.push(doc);
      } else if (updatedDate > lastWeek) {
        categorized.lastWeek.push(doc);
      } else {
        categorized.older.push(doc);
      }
    });

    return categorized;
  };

  const sortedDocuments = documents.documents.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const categorizedDocuments = categorizeDocuments(sortedDocuments);

  return (
    <div>
      {categorizedDocuments.today.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-base text-gray-900 dark:text-slate-400 flex items-center gap-2">
              Today
            </h2>
          </div>
          <div className="space-y-2">
            {categorizedDocuments.today.map((doc) => (
              <RecentDocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                updated_at={doc.updated_at}
              />
            ))}
          </div>
        </div>
      )}

      {categorizedDocuments.lastWeek.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 mt-4">
            <h2 className="font-semibold text-base text-gray-900 dark:text-slate-400 flex items-center gap-2">
              Last Week
            </h2>
          </div>
          <div className="space-y-2">
            {categorizedDocuments.lastWeek.map((doc) => (
              <RecentDocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                updated_at={doc.updated_at}
              />
            ))}
          </div>
        </div>
      )}

      {categorizedDocuments.older.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 mt-4">
            <h2 className="font-semibold text-base text-gray-900 dark:text-slate-400 flex items-center gap-2">
              Older
            </h2>
          </div>
          <div className="space-y-2">
            {categorizedDocuments.older.map((doc) => (
              <RecentDocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                updated_at={doc.updated_at}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
