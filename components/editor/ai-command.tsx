import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
  interface AICommandProps {
    onClose: () => void
  }
  
  export function AICommand({ onClose }: AICommandProps) {
    return (
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Edit">
            <CommandItem>
              <Calendar />
              <span>Improve Fluency</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Parapharse</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Simplify</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Make Longer</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Translate</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Generate from selection">
            <CommandItem>
              <User />
              <span>Summarize</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Write opposing argument</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Write with more depth</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem>
                <span>Continue Writing</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }
  