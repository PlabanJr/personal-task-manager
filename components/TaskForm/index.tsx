import Button from "@/components/Button";
import { TTask } from "@/core/types/tasks";
import useTasksHook from "@/hooks/useTasksHook";
import { useUser } from "@/hooks/useUser";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

type TaskFormProps = {
  onTaskComplete: (...args: any[]) => void;
  task?: TTask;
};

const TaskForm: React.FC<TaskFormProps> = (props) => {
  const { onTaskComplete, task } = props;
  const { accessToken, onLogout, user } = useUser();
  const { onCreateTask, isLoading, onEditTask } =
    useTasksHook();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] =
    useState<string>("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const onChangeTitle = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTitle(value);
  };

  const onChangeDescription = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);
  };

  const onCreateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && task) {
      onEditTask(
        { ...task, title, description },
        onTaskComplete
      );
    } else if (!task && user) {
      onCreateTask(title, description, onTaskComplete);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-3 "
      onSubmit={onCreateClick}
    >
      <input
        value={title}
        onChange={onChangeTitle}
        className="border rounded border-black w-full py-1 px-2"
        placeholder="Add your task title..."
        maxLength={120}
        minLength={4}
        required
      />
      <textarea
        value={description}
        onChange={onChangeDescription}
        className="border border-black rounded w-full resize-none px-2 py-1"
        placeholder="Add your task description..."
        maxLength={400}
        minLength={12}
        rows={4}
        required
      />

      <Button
        label={task ? "Edit task" : "Create Task"}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};

export default TaskForm;
