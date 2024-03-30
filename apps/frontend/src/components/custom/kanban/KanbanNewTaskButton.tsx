import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import NewTask from "../task/NewTask";

const KanbanNewTaskButton = (props: { listId: string }) => {
  const { listId } = props;

  const [openNewTask, setOpenNewTask] = useState(false);

  return (
    <div>
      <div className="hover:bg-muted cursor-pointer rounded-md border border-dashed p-0.5 py-2 transition-all duration-150 hover:border-black">
        <div className="flex items-center justify-center" onClick={() => setOpenNewTask(!openNewTask)}>
          <IconPlus stroke={1.5} className="mr-2" />
          <p className="large">Add new task</p>
        </div>
      </div>

      <NewTask open={openNewTask} close={() => setOpenNewTask(false)} listId={listId} />
    </div>
  );
};

export default KanbanNewTaskButton;
