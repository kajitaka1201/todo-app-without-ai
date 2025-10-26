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

export default function Task({
  uid,
  id,
  name,
  color,
  duration,
}: {
  uid: string;
  id: string;
  name: string;
  color: ColorList;
  duration: number;
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
      <div className="algin-center flex flex-0 items-center">
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
