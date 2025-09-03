import { createContext, useState, type ReactNode } from "react";
import type { Player } from "../interface/PlayerType";

export const RoleContext = createContext<{
  player: Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}>({
  player: null,
  setPlayer: () => {},
});

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);

  return (
    <RoleContext.Provider value={{ player, setPlayer }}>
      {children}
    </RoleContext.Provider>
  );
}
