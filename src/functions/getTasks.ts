import { db } from "@/firebase";
import type { TaskType } from "@/types/firestore";
import { collection, getDocs, query } from "firebase/firestore";

export async function getTasks(uid: string) {
  const q = query(collection(db, uid, "userInfo", "tasks"));
  const querySnapshot = await getDocs(q);
  const tasksArray: (TaskType & { id: string })[] = [];
  querySnapshot.forEach((doc) => {
    tasksArray.push({ id: doc.id, ...doc.data() } as TaskType & { id: string });
  });
  return tasksArray;
}
