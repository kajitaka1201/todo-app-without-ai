import { cn } from "@/lib/utils";
import type { ColorList } from "@/types/firestore";

export default function Task({
  id,
  name,
  color,
  duration,
}: {
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
    <div id={id} className={cn(colorVariants[color])}>
      <p>{name}</p>
      <p>時間:{duration}秒</p>
    </div>
  );
}
