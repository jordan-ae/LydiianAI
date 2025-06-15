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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Send />
            Share
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            Copy Link
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PinIcon />
          Pin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash />
            Delete
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
