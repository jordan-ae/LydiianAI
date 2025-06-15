import { DropdownActionMenu } from "@/components/modal/actions";
import { Button } from "@/components/ui/button";
import { getLastEdited } from "@/lib/date-helpers";
import { Ellipsis, FileText } from "lucide-react";
import Link from "next/link";

interface ICardProps {
  id: string;
  title: string;
  updated_at: string;
}

export function RecentDocumentCard({ id, title, updated_at }: ICardProps) {
  return (
    <a
      href={`/editor/${id}`}
      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#2B2B30] rounded-lg transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 dark:bg-[#2B2B30] rounded-lg">
          <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
          {getLastEdited(updated_at)}
        </span>
        <DropdownActionMenu />
      </div>
    </a>
  );
}
