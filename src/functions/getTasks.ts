import { db } from "@/firebase";
import type { TaskType } from "@/types/firestore";
import { doc, getDoc } from "firebase/firestore";

export async function getTasks(uid: string) {
  const docRef = doc(db, "tasks", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return Object.entries(docSnap.data()).map(([id, task]) => {
      return { id: id, ...task };
    }) as (TaskType & { id: string })[];
  }
  return [];
}
