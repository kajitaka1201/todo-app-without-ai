import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteTask(uid: string, taskId: string) {
  await deleteDoc(doc(db, uid, "userInfo", "tasks", taskId));
}
