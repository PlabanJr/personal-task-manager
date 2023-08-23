import TaskListItem from "@/components/TaskList/TaskListItem";
import { ERouteKeys } from "@/core/enums/app";
import { TTask } from "@/core/types/tasks";
import useTasksHook from "@/hooks/useTasksHook";
import { useUser } from "@/hooks/useUser";
import { useMemo } from "react";

type TaskListProps = {
  filter: ERouteKeys;
};

const TaskList: React.FC<TaskListProps> = (props) => {
  const { filter } = props;
  const { user } = useUser();

  const { tasks, onRemoveTask, onEditTask, isLoading } =
    useTasksHook();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: TTask) => {
      if (filter === ERouteKeys.DONE) return task.isDone;
      if (filter === ERouteKeys.PENDING)
        return !task.isDone;

      return task;
    });
  }, [filter, tasks]);

  if (!user) {
    return (
      <div className="flex flex-col gap-y-2 w-full h-full p-40 text-center text-2xl">
        {isLoading
          ? "Loading ⏳"
          : " 🔐 Log in to continue ..."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {tasks.length === 0 ? (
        <div className="flex flex-col gap-y-2 w-full h-full p-40 text-center text-2xl">
          {isLoading ? "Loading ⏳" : "No tasks ✅"}
        </div>
      ) : (
        filteredTasks.map((task: TTask) => {
          return (
            <TaskListItem
              key={task.id}
              task={task}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
            />
          );
        })
      )}
    </div>
  );
};

export default TaskList;
