import type { TaskType } from "@/types/firestore";
import Task from "@/components/ui-elements/task";

export default function TaskList({
  uid,
  tasks,
}: {
  uid: string;
  tasks: (TaskType & { id: string })[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {tasks?.map((task) => (
        <Task
          uid={uid}
          id={task.id}
          name={task.name}
          color={task.color}
          duration={task.totalDurationSeconds}
          key={task.id}
        />
      ))}
    </div>
  );
}
