import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import TodoMain from "@/components/ui-elements/todo-main";
import TodoButtons from "@/components/ui-elements/todo-buttons";

export default function Main() {
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <main className="mx-auto p-4">
      {user ? (
        <div>
          <TodoButtons uid={user.uid} />
          <TodoMain uid={user.uid} />
        </div>
      ) : (
        <p>ログインしてください。</p>
      )}
    </main>
  );
}
