import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, FileUp } from "lucide-react";
import Image from "next/image";

const pdfUploads = [
    {
      id: "1",
      title: "Quantum Computing: Recent Advances",
      pages: 24,
      uploadDate: "Apr 15, 2023",
      thumbnail: "/placeholder.svg?height=120&width=90",
    },
    {
      id: "2",
      title: "Machine Learning Ethics",
      pages: 18,
      uploadDate: "Mar 28, 2023",
      thumbnail: "/placeholder.svg?height=120&width=90",
    },
    {
      id: "3",
      title: "Climate Change: A Comprehensive Review",
      pages: 42,
      uploadDate: "Feb 12, 2023",
      thumbnail: "/placeholder.svg?height=120&width=90",
    },
    {
      id: "4",
      title: "Artificial Intelligence in Healthcare",
      pages: 36,
      uploadDate: "Jan 5, 2023",
      thumbnail: "/placeholder.svg?height=120&width=90",
    },
  ]


export default function UploadedPdfs(){
    return         <section className="bg-white dark:bg-[#1A1A1D] border border-gray-200 dark:border-[#2B2B30] rounded-xl p-5">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <FileUp className="h-5 w-5" />
        PDF Uploads
      </h2>
      <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1">
        View All <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {pdfUploads.map((pdf) => (
        <div
          key={pdf.id}
          className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#2B2B30] rounded-lg transition-colors"
        >
          <div className="relative h-16 w-12 flex-shrink-0 bg-gray-100 dark:bg-[#2B2B30] rounded-md overflow-hidden">
            <Image src={pdf.thumbnail || "/placeholder.svg"} alt={pdf.title} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{pdf.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-600 dark:text-gray-400">{pdf.pages} pages</span>
              <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {pdf.uploadDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#2B2B30]">
      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
        <FileUp className="h-4 w-4" />
        Upload New PDF
      </Button>
    </div>
  </section>
}