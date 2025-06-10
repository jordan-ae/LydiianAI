import { Button } from "@/components/ui/button";
import { ArrowRight, Ellipsis, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export type Document = {
  content: string,
  created_at: string,
  updated_at: string,
  user_id: string,
  title: string
  id: string
}

interface IDocs {
  documents: Document[]
}

const recentDocuments = [
  {
    id: "1",
    title: "Literature Review - Machine Learning Applications",
    type: "document",
    lastEdited: "1 hour ago",
    size: "245 KB",
  },
  {
    id: "2",
    title: "Research Notes - Quantum Computing",
    type: "document",
    lastEdited: "Yesterday",
    size: "128 KB",
  },
  {
    id: "3",
    title: "Meeting Notes - Research Team",
    type: "document",
    lastEdited: "2 days ago",
    size: "87 KB",
  },
  {
    id: "4",
    title: "Project Proposal - AI Ethics",
    type: "document",
    lastEdited: "1 week ago",
    size: "356 KB",
  },
];

export default function RecentDocuments(documents: IDocs) {
  if (documents.documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">You don't have any notes yet.</p>
      </div>
    );
  }

  const getLastEdited = (updatedAt: string) => {
    const updatedDate = new Date(updatedAt);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - updatedDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

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
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
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
              <Link key={doc.id} href={`/editor/${doc.id}`}>
                <div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#2B2B30] rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-[#2B2B30] rounded-lg">
                      <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                      {getLastEdited(doc.updated_at)}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
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
              <Link key={doc.id} href={`/editor/${doc.id}`}>
                <div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#2B2B30] rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-[#2B2B30] rounded-lg">
                      <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                      {getLastEdited(doc.updated_at)}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {categorizedDocuments.older.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 mt-4">
            <h2 className="ffont-semibold text-base text-gray-900 dark:text-slate-400 flex items-center gap-2">
              Older
            </h2>
          </div>
          <div className="space-y-2">
            {categorizedDocuments.older.map((doc) => (
              <Link key={doc.id} href={`/editor/${doc.id}`}>
                <div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#2B2B30] rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-[#2B2B30] rounded-lg">
                      <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                      {getLastEdited(doc.updated_at)}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
