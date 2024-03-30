import api from "@/app/api";
import { store } from "@/app/store";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";

const FormSchema = z.object({
  name: z.string().trim().min(3).max(20),
});

const EditList = (props: { open: boolean; close: () => void; listId: string }) => {
  const { open, close, listId } = props;

  const { toast } = useToast();

  const getList = store((state) => state.getList(listId));
  const updateList = store((state) => state.updateList);
  const resetStore = store((state) => state.reset);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await api.PATCH("/api/lists/{id}", { body: data, params: { path: { id: getList.id } } });

    if (request.data) {
      const { data } = request;

      toast({
        title: "List updated",
        description: (
          <p>
            List name successfully updated to <b>{data.name}</b>.
          </p>
        ),
      });

      updateList(data);
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
          <DialogTitle>Edit list</DialogTitle>
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
                    defaultValue={getList.name}
                    onInput={field.onChange}
                    onChange={() => field.value}
                  />
                  <FormMessage className="font-normal" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditList;
