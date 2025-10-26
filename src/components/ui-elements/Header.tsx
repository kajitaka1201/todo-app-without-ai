import LoginButton from "@/components/ui-elements/login-button";

export default function Header() {
  return (
    <header className="flex flex-0 items-center justify-between border-b p-4">
      <div>
        <h1 className="text-2xl font-bold">Todo App</h1>
      </div>
      <div>
        <LoginButton />
      </div>
    </header>
  );
}
