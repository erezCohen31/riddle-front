import { createContext, useState, type ReactNode } from "react";

export const RoleContext = createContext<{
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}>({
  role: "",
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string>("");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
