import { cn } from "@/lib/utils";
import type { ColorList } from "@/types/firestore";
import { PiDotsThree } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask } from "@/functions/deleteTask";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { LuPlay } from "react-icons/lu";
import { LuPause } from "react-icons/lu";

async function startTask(uid: string, taskId: string) {
  const ref = doc(db, uid, "userInfo", "tasks", taskId);
  await updateDoc(ref, { status: "doing", startTime: Date.now() });
}
async function finishTask(uid: string, taskId: string) {
  const ref = doc(db, uid, "userInfo", "tasks", taskId);

  const currentDataSnap = await getDoc(
    doc(db, uid, "userInfo", "tasks", taskId),
  );
  if (currentDataSnap.exists()) {
    const currentData = currentDataSnap.data();
    if (currentData.startTime) {
      const duration =
        currentData.totalDurationSeconds +
        Math.floor((Date.now() - currentData.startTime) / 1000);
      await updateDoc(ref, {
        totalDurationSeconds: duration,
      });
    }
  }
  await updateDoc(ref, { status: "done" });
}

export default function Task({
  uid,
  id,
  name,
  color,
  duration,
  status,
}: {
  uid: string;
  id: string;
  name: string;
  color: ColorList;
  duration: number;
  status: "todo" | "doing" | "done";
}) {
  const colorVariants = {
    red: "bg-red-200",
    yellow: "bg-yellow-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
    purple: "bg-purple-200",
  };

  return (
    <div
      key={id}
      className={cn(colorVariants[color], "flex items-center rounded p-2")}
    >
      <div className="flex-1">
        <p>{name}</p>
        <p className="text-xs text-gray-500">
          Time: {Math.floor(duration / 60)}m {duration % 60}s
        </p>
      </div>
      <div className="algin-center flex flex-0 items-center gap-1">
        {status === "todo" && <LuPlay onClick={() => startTask(uid, id)} />}
        {status === "doing" && <LuPause onClick={() => finishTask(uid, id)} />}
        {status === "done" && <LuPlay onClick={() => startTask(uid, id)} />}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <PiDotsThree size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => deleteTask(uid, id)}>
              削除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
