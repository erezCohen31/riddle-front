import { useContext } from "react";
import { RoleContext } from "../contexts/Role.context";
import { Outlet, useNavigate } from "react-router";

export default function ModifyRiddlePage() {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Modify Riddle Page</h1>

      {(role === "user" || role === "admin") && (
        <>
          <button onClick={() => handleNavigate("add")}>
            Create a new Riddle
          </button>
          <button onClick={() => handleNavigate("read")}>
            Read all Riddles
          </button>
        </>
      )}

      {role === "admin" && (
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
