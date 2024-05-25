import { HTMLAttributes, ReactNode } from "react";

export function Button({
  children,
  onClick,
}: { children: ReactNode } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="border p-2 bg-gray-200" onClick={onClick}>
      {children}
    </button>
  );
}
