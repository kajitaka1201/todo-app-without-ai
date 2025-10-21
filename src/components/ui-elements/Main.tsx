import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import TodoMain from "@/components/ui-elements/todo-main";

export default function Main() {
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <main className="mx-auto p-4">
      {user ? <TodoMain uid={user.uid} /> : <p>ログインしてください。</p>}
    </main>
  );
}
