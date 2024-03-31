import api from "@/app/api";
import { store } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Priority } from "@/enums/priority";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCalendarDue } from "@tabler/icons-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import PrioritySelector from "../selectors/PrioritySelector";

const CreateTaskSchema = z.object({
  name: z.string().trim().min(3).max(20),
  description: z.string().trim().min(1).max(3000),
  dueAt: z.date(),
  priority: z.nativeEnum(Priority),
});

const CreateTask = (props: { open: boolean; close: () => void; listId: string }) => {
  const { open, close, listId } = props;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateTaskSchema>>({ resolver: zodResolver(CreateTaskSchema), mode: "onChange" });

  const priority = store((state) => state.getPriority());
  form.setValue("priority", priority);

  const resetStore = store((state) => state.reset);
  const addTask = store((state) => state.addTask);

  async function onSubmit(data: z.infer<typeof CreateTaskSchema>) {
    const { dueAt, ...fields } = data;
    const body = { dueAt: new Date(dueAt).toISOString(), ...fields };

    const request = await api.POST("/api/lists/{listId}/tasks", { body, params: { path: { listId } } });

    if (request.data) {
      const { data } = request;

      toast({
        title: "Task created",
        description: (
          <p>
            Task with <b>{data.name}</b> successfully created.
          </p>
        ),
      });

      addTask(data);
      resetStore();

      close();
    } else {
      if (!request.error) {
        toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });

        return;
      }

      const { error } = request;

      toast({
        title: error.error ?? "Something went wrong",
        description: typeof error.message === "string" ? error.message : error.message.join(", "),
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-normal">Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Type task name here..."
                    onInput={field.onChange}
                    onChange={() => field.value}
                  />
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-normal">Description</FormLabel>
                  <Textarea
                    placeholder="Type description here..."
                    onInput={field.onChange}
                    onChange={() => field.value}
                  />
                  <p className="muted">Markdown support enabled.</p>
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-normal">Due At</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "dd.MM.yyyy") : <span>Pick a date</span>}
                        <IconCalendarDue stroke={1.5} size={16} className="ml-auto opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />

            <div className="grid w-full items-center gap-1.5">
              <Label>Priority</Label>
              <PrioritySelector />
            </div>

            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
