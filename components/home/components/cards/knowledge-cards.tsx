import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Plus } from "lucide-react";
import Image from "next/image";

const networks = [
  {
    id: "1",
    title: "Research on Quantum Computing",
    nodes: 42,
    connections: 78,
    lastEdited: "2 hours ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Climate Change Literature Review",
    nodes: 67,
    connections: 124,
    lastEdited: "Yesterday",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "AI Ethics Framework",
    nodes: 31,
    connections: 52,
    lastEdited: "3 days ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
];

export default function KnowledgeCards() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          Networks
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm flex items-center gap-1"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {networks.map((network) => (
          <div
            key={network.id}
            className="bg-white dark:bg-[#1A1A1D] border border-gray-200 dark:border-[#2B2B30] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-40 bg-gray-100 dark:bg-[#2B2B30]">
              <Image
                src={network.thumbnail || "/placeholder.svg"}
                alt={network.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {network.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span>{network.nodes} nodes</span>
                  <span>{network.connections} connections</span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {network.lastEdited}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 dark:bg-[#1A1A1D] border border-dashed border-gray-300 dark:border-[#2B2B30] rounded-xl flex flex-col items-center justify-center p-6 h-full">
          <Button variant="outline" className="mb-3">
            <Plus className="h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Create a new knowledge network
          </p>
        </div>
      </div>
    </section>
  );
}
