import api from "@/app/api";
import { store } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { useState } from "react";

const ListSelector = (props: { placeholder?: string; immediatelyMove?: boolean; listId?: string; taskId?: string }) => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [listId, setListId] = useState("");

  const lists = store((state) => state.getLists());
  const updateTask = store((state) => state.updateTask);

  const reset = store((state) => state.reset);

  async function immediatelyMoveTask(listId: string) {
    const { data, error } = await api.PATCH("/api/lists/{listId}/tasks/{id}", {
      params: { path: { id: props.taskId!, listId: props.listId } },
      body: { listId },
    });

    reset();

    if (data) return updateTask(data);

    if (!error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });

      return;
    }

    toast({
      title: error.error ?? "Something went wrong",
      description: typeof error.message === "string" ? error.message : error.message.join(", "),
      variant: "destructive",
    });
  }

  const selectorTitle = props.placeholder ?? "Select list...";
  const title = listId ? lists.find((list) => list.id === listId)?.name : selectorTitle;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {title}
          <IconSelector stroke={1.5} size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-md p-0">
        <Command>
          <CommandInput placeholder={selectorTitle} />
          <CommandEmpty>No list found.</CommandEmpty>
          <CommandGroup className="max-h-96 overflow-y-auto">
            {lists
              .filter((list) => list.id !== props?.listId)
              .map((list) => (
                <CommandItem
                  key={list.id}
                  value={list.name}
                  onSelect={() => {
                    setListId(list.id === listId ? "" : list.id);

                    if (props.immediatelyMove) {
                      immediatelyMoveTask(list.id);
                    }

                    setOpen(false);
                  }}
                >
                  <IconCheck
                    stroke={1.5}
                    size={16}
                    className={cn("mr-2", listId === list.id ? "opacity-100" : "opacity-0")}
                  />
                  {list.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ListSelector;
