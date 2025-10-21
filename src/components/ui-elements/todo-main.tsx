"use client";

import { Separator } from "@/components/ui/separator";
import { getTasks } from "@/functions/getTasks";
import Task from "@/components/ui-elements/task";
import { useEffect, useState } from "react";
import type { TaskType } from "@/types/firestore";

export default function TodoMain({ uid }: { uid: string }) {
  const [tasks, setTasks] = useState<(TaskType & { id: string })[]>([]);
  useEffect(() => {
    getTasks(uid).then((tasks) => setTasks(tasks));
  }, [uid]);
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex h-full">
      <div className="w-1/3 p-2">
        <h2 className="text-xl font-bold">Todo</h2>
        <div>
          {todoTasks.map((task) => (
            <Task
              id={task.id}
              name={task.name}
              color={task.color}
              duration={task.totalDurationSeconds}
            />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/3 p-2">
        <h2 className="text-xl font-bold">Doing</h2>
        <div>
          {doingTasks.map((task) => (
            <Task
              id={task.id}
              name={task.name}
              color={task.color}
              duration={task.totalDurationSeconds}
            />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/3 p-2">
        <h2 className="text-xl font-bold">Done</h2>
        <div>
          {doneTasks.map((task) => (
            <Task
              id={task.id}
              name={task.name}
              color={task.color}
              duration={task.totalDurationSeconds}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
