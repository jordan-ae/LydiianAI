import { Network, FileText, FileUp, Plus, ArrowRight, Search, ExternalLink, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import KnowledgeCards from "./cards/knowledge-cards"
import RecentDocuments from "./cards/recent-documents"
import UploadedPdfs from "./cards/pdf-uploads-card"

export default function DashboardContent() {
  return (
    <div className="space-y-6 w-full">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Continue your research journey</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Network</span>
          </Button>
        </div>
      </div>

      <KnowledgeCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDocuments />

        <UploadedPdfs />
      </div>
    </div>
  )
}