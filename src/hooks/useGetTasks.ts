import { db } from "@/firebase";
import type { TaskType } from "@/types/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";

export function useGetTasks(uid: string) {
  const [tasks, setTasks] = useState<(TaskType & { id: string })[]>();
  const q = query(collection(db, uid, "userInfo", "tasks"));
  onSnapshot(q, (querySnapshot) => {
    const newTasks: (TaskType & { id: string })[] = [];
    querySnapshot.forEach((doc) => {
      newTasks.push({ id: doc.id, ...doc.data() } as TaskType & { id: string });
    });
    setTasks(newTasks);
  });
  return tasks;
}
