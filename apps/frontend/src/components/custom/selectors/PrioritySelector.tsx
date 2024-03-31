import { store } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Priority } from "@/enums/priority";
import { cn } from "@/lib/utils";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const priorities = Object.keys(Priority);

const PrioritySelector = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Priority>(Priority.LOW);

  const zustandStore = store((state) => state.setPriority);

  useEffect(() => {
    if (!value) return;

    zustandStore(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {priorities.find((priority) => priority === value)}
          <IconSelector stroke={1.5} size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-md p-0">
        <Command>
          <CommandInput placeholder="Search priority..." />
          <CommandEmpty>No priority found.</CommandEmpty>
          <CommandGroup>
            {priorities.map((priority) => (
              <CommandItem
                key={priority}
                value={priority}
                onSelect={(currentValue) => {
                  const selected = currentValue.toUpperCase() as Priority;

                  setValue(selected === value ? Priority.LOW : Priority[selected]);
                  setOpen(false);
                }}
              >
                <IconCheck
                  stroke={1.5}
                  size={16}
                  className={cn("mr-2", value === priority ? "opacity-100" : "opacity-0")}
                />
                {priority}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PrioritySelector;
