import Modal from "@/components/Modal";
import TaskForm from "@/components/TaskForm";
import { TTask } from "@/core/types/tasks";
import useTaskModal from "@/hooks/useTaskModal";
import {
  CgCheckO,
  CgCloseO,
  CgPen,
  CgTrash,
} from "react-icons/cg";

type TaskListItemProps = {
  task: TTask;
  onRemoveTask: (...args: any[]) => void;
  onEditTask: (...args: any[]) => void;
};

const TaskListItem: React.FC<TaskListItemProps> = (
  props
) => {
  const { task, onRemoveTask, onEditTask } = props;
  const { title, isDone, id, description } = task;
  const { isOpen, onClose, onOpen } = useTaskModal();

  const onDeleteClick = () => {
    onRemoveTask(id);
  };

  const onMarkClick = () => {
    const newTask = {
      ...task,
      isDone: !isDone,
    };
    onEditTask(newTask);
  };

  return (
    <div className="flex items-center flex-row gap-x-4 text-black bg-neutral-100 p-3 rounded">
      <div className="flex flex-1 flex-col items-start ">
        <label
          htmlFor={id}
          className={`font-medium text-lg ${
            isDone && "text-neutral-400 line-through"
          }`}
        >
          {title}
        </label>
        <p
          className={`font-light line-clamp-2 ${
            isDone && "text-neutral-400 line-through"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="flex gap-x-2 items-center w-fit   ">
        <button
          className={`text-neutral-500  transition ${
            isDone
              ? "hover:text-red-700"
              : "hover:text-green-700"
          }`}
          onClick={onMarkClick}
        >
          {isDone ? (
            <CgCloseO size={24} />
          ) : (
            <CgCheckO size={24} />
          )}
        </button>
        <button
          className="text-neutral-500 hover:text-black transition"
          onClick={onOpen}
        >
          <CgPen size={24} />
        </button>
        <button
          className="text-neutral-500 hover:text-black transition"
          onClick={onDeleteClick}
        >
          <CgTrash size={24} />
        </button>
      </div>

      {isOpen && (
        <Modal title="Edit Task" onCloseModal={onClose}>
          <TaskForm onTaskComplete={onClose} task={task} />
        </Modal>
      )}
    </div>
  );
};

export default TaskListItem;
