import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";

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

export default function RecentDocuments() {
  return (
    <div className="bg-white dark:bg-[#1A1A1D] border border-gray-200 dark:border-[#2B2B30] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Documents
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm flex items-center gap-1"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-2">
        {recentDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#2B2B30] rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-[#2B2B30] rounded-lg">
                <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {doc.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {doc.size}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {doc.lastEdited}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
