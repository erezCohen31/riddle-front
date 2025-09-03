import { useContext } from "react";
import { RoleContext } from "../contexts/Player.context";
import { Outlet, useNavigate } from "react-router";

export default function ModifyRiddlePage() {
  const { player } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Modify Riddle Page</h1>

      {(player?.role === "user" || player?.role === "admin") && (
        <>
          <button onClick={() => handleNavigate("add")}>
            Create a new Riddle
          </button>
          <button onClick={() => handleNavigate("read")}>
            Read all Riddles
          </button>
        </>
      )}

      {player?.role === "admin" && (
        <>
          <button onClick={() => handleNavigate("edit")}>Change Riddle</button>
          <button onClick={() => handleNavigate("delete")}>
            Delete Riddle
          </button>
        </>
      )}

      <Outlet />
    </div>
  );
}
