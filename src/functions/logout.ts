import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export function logout() {
  signOut(auth);
}
