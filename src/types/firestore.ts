export type ColorList = "red" | "yellow" | "green" | "blue" | "purple";

export type TaskType = {
  name: string;
  color: ColorList;
  totalDurationSeconds: number;
  status: "todo" | "doing" | "done";
  startTime?: Date;
};

type UserFileType = {
  name: string;
  tasks: TaskFileType;
};

type TaskFileType = TaskType[];

export type FirestoreType = {
  [id: string]: {
    userInfo: UserFileType;
  };
};
