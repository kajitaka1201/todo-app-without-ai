import { db } from "@/firebase";
import type { ColorList, TaskType } from "@/types/firestore";
import { doc, setDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { v7 as createUUID } from "uuid";
import { useState } from "react";

async function addTask({
  name,
  color,
  uid,
}: {
  name: string;
  color: ColorList;
  uid: string;
}) {
  const taskUUID = createUUID();
  const newTask: TaskType = {
    name: name,
    color: color,
    totalDurationSeconds: 0,
    status: "todo",
  };
  const ref = doc(db, uid, "userInfo", "tasks", taskUUID);
  await setDoc(ref, newTask);
}

const formSchema = z.object({
  name: z.string(),
  color: z.string(),
});

export default function TodoButtons({ uid }: { uid: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "red",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsDialogOpen(false);
    form.reset();
    addTask({
      name: data.name,
      color: data.color as ColorList,
      uid: uid,
    });
  }
  function cancel() {
    setIsDialogOpen(false);
    form.reset();
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>タスクを追加する</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タスクの追加</DialogTitle>
            <DialogDescription>
              追加するタスクの情報を入力して下さい
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} id="task-addition">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="task-addition-name">
                      タスク名
                    </FieldLabel>
                    <Input
                      {...field}
                      id="task-addition-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="タスク名を入力して下さい"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="color"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="task-addition-color">
                      タスクの色
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="task-addition-color">
                        <SelectValue placeholder="タスクの色を選択して下さい"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="red">赤</SelectItem>
                        <SelectItem value="yellow">黃</SelectItem>
                        <SelectItem value="green">緑</SelectItem>
                        <SelectItem value="blue">青</SelectItem>
                        <SelectItem value="purple">紫</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <Field orientation="horizontal">
              <Button variant="outline" onClick={cancel}>
                キャンセル
              </Button>
              <Button type="submit" form="task-addition">
                タスクを追加する
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
