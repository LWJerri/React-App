import api from "@/app/api";
import { store } from "@/app/store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Task } from "@/types/Task";
import { IconCalendarDue } from "@tabler/icons-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ListSelector from "../selectors/ListSelector";
import TaskDropdown from "../task/TaskDropdown";

const KanbanTask = (props: { listId: string }) => {
  const { listId } = props;

  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);

  store.subscribe(({ tasks }) => setTasks(tasks));

  const loadTasksToStore = store((state) => state.loadTasks);

  useEffect(() => {
    api.GET("/api/lists/{listId}/tasks", { params: { path: { listId } } }).then(({ data, error }) => {
      if (data) return loadTasksToStore(data);

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
  }, []);

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card
          className={cn(
            "transition-all duration-150 hover:cursor-pointer hover:border-dashed",
            task.priority === "CRITICAL" || task.priority === "HIGH" ? "hover:bg-red-300" : "hover:bg-muted ",
          )}
          key={task.id}
        >
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <CardTitle>{task.name}</CardTitle>
              <TaskDropdown task={task} />
            </div>
          </CardHeader>

          <CardContent className="small max-h-96 font-normal">
            <Markdown remarkPlugins={[remarkGfm]}>
              {task.description.length > 500 ? task.description.slice(0, 500) + "..." : task.description}
            </Markdown>
          </CardContent>

          <CardFooter>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <IconCalendarDue stroke={1.5} />
                  <Label htmlFor="name">{format(task.dueAt, "dd.MM.yyyy")}</Label>
                </div>

                <Badge variant={task.priority === "CRITICAL" || task.priority === "HIGH" ? "destructive" : "secondary"}>
                  {task.priority}
                </Badge>
              </div>

              <ListSelector placeholder="Move to..." />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default KanbanTask;
