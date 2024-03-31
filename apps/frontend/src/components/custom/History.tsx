import api from "@/app/api";
import { store } from "@/app/store";
import { History as HistoryType } from "@/types/History";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

const History = (props: { open: boolean; close: () => void }) => {
  const { open, close } = props;

  const { toast } = useToast();

  const [history, setHistory] = useState<HistoryType[]>([]);

  const getList = store((state) => state.getList);

  useEffect(() => {
    if (!open) return;

    api.GET("/api/audit").then(({ data, error }) => {
      if (data) return setHistory(data);

      if (!error) {
        toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });

        return;
      }

      toast({
        title: error.error ?? "Something went wrong",
        description: typeof error.message === "string" ? error.message : error.message.join(", "),
        variant: "destructive",
      });
    });
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
        </SheetHeader>

        <div className="grid w-full gap-2 overflow-y-auto">
          {history.length > 0 &&
            history.map((item, i) => (
              <Alert key={i}>
                <AlertDescription className="flex justify-between space-x-2">
                  {item.action === "CREATE" && (
                    <p>
                      You create a new {item.relatedModel.toLowerCase()} <b>{item.newState.name}</b>
                    </p>
                  )}

                  {item.action === "DELETE" && (
                    <p>
                      You delete {item.relatedModel.toLowerCase()} <b>{item.oldState.name}</b>
                    </p>
                  )}

                  {item.action === "EDIT" && item.affectedField !== "dueAt" && item.affectedField !== "listId" && (
                    <p>
                      You edit {item.relatedModel.toLowerCase()} {item.affectedField} from {/* @ts-ignore */}
                      <b>{item.oldState[item.affectedField]}</b> to <b>{item.newState[item.affectedField]}</b>
                    </p>
                  )}

                  {item.action === "EDIT" && item.affectedField === "dueAt" && (
                    <p>
                      You edit {item.relatedModel.toLowerCase()} {item.affectedField} from {/* @ts-ignore */}
                      <b>{format(item.oldState[item.affectedField], "dd.MM.yyyy")}</b> to {/* @ts-ignore */}
                      <b>{format(item.newState[item.affectedField], "dd.MM.yyyy")}</b>
                    </p>
                  )}

                  {item.action === "EDIT" && item.affectedField === "listId" && (
                    <p>
                      You edit {item.relatedModel.toLowerCase()} {item.affectedField} <span> from </span>
                      <b>
                        {/* @ts-ignore */}
                        {getList(item.oldState[item.affectedField])?.name ?? item.oldState[item.affectedField]}
                      </b>
                      <span> to </span>
                      <b>
                        {/* @ts-ignore */}
                        {getList(item.newState[item.affectedField])?.name ?? item.newState[item.affectedField]}
                      </b>
                    </p>
                  )}
                  <p className="flex-none">{format(item.createdAt, "dd.MM.yyyy")}</p>
                </AlertDescription>
              </Alert>
            ))}

          {!history.length &&
            [...Array(6)].map((_, i) => (
              <div className="rounded-lg border p-4" key={i}>
                <div className="[&amp;_p]:leading-relaxed">
                  <Skeleton />
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default History;
