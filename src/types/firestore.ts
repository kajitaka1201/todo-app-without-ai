export type ColorList = "red" | "yellow" | "green" | "blue" | "purple";

export type TaskType = {
  name: string;
  color: ColorList;
  totalDurationSeconds: number;
  status: "todo" | "doing" | "done";
};

export type FirestoreType = {
  users: {
    [id: string]: {
      name: string;
    };
  };
  tasks: {
    [id: string]: {
      [id: string]: TaskType;
    };
  };
};
