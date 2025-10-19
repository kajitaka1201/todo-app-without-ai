import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/functions/login";
import { auth } from "@/firebase";
import { LuCircleUserRound } from "react-icons/lu";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/functions/logout";

export default function LoginButton() {
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LuCircleUserRound />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={logout}>
            ログアウト
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={loginWithGoogle}>ログイン</Button>
  );
}
