"use client";

import { Separator } from "@/components/ui/separator";
import { useGetTasks } from "@/hooks/useGetTasks";
import type { TaskType } from "@/types/firestore";
import TaskList from "@/components/ui-elements/task-list";

export default function TodoMain({ uid }: { uid: string }) {
  const tasks: (TaskType & { id: string })[] = useGetTasks(uid) || [];
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex h-full">
      <div className="w-1/3 p-2">
        <h2 className="text-xl font-bold">Todo</h2>
        <TaskList uid={uid} tasks={todoTasks} />
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/3 p-2">
        <h2 className="text-xl font-bold">Doing</h2>
        <TaskList uid={uid} tasks={doingTasks} />
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/3 p-2">
        <h2 className="text-xl font-bold">Done</h2>
        <TaskList uid={uid} tasks={doneTasks} />
      </div>
    </div>
  );
}
