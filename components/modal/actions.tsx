import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, EllipsisIcon, PinIcon, Send, Trash } from "lucide-react"
import { DialogDemo } from "./delete"

export function DropdownActionMenu() {
  const handleDelete = () => {
    // Add your delete logic here
    console.log("Document deleted");
    // You might want to call an API or update the state to remove the document
  };

  const handlePin = () => {
    // Add your pin logic here
    console.log("Document pinned");
    // You might want to call an API or update the state to pin the document
  };

  const handleShare = () => {
    // Add your share logic here
    console.log("Document shared");
    // You might want to call an API or update the state to share the document
  };

  const handleCopyLink = () => {
    // Add your copy link logic here
    console.log("Link copied");
    // You might want to copy the document link to the clipboard
    navigator.clipboard.writeText("https://example.com/document-link");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleShare()}>
            <Send />
            Share
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopyLink()}>
            <Copy />
            Copy Link
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handlePin()}>
          <PinIcon />
          Pin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete()}>
          <span className="text-red-700 flex items-center gap-2">
            <Trash />
            Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
