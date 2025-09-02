import { useContext } from "react";
import { RoleContext } from "../contexts/Role.context";
import { useNavigate } from "react-router";

export default function ModifyRiddlePage() {
  const context = useContext(RoleContext);
  const { role } = context;
  const navigate = useNavigate();

  function handleSubmit(destination: string) {
    navigate(`/${destination}`);
  }

  return (
    <>
      <div>ModifyRiddlePage</div>

      {(role === "user" || role === "admin") && (
        <button onClick={() => handleSubmit("manage-riddles")}>
          Create a new Riddle
        </button>
      )}
      {(role === "user" || role === "admin") && (
        <button onClick={() => handleSubmit("manage-riddles")}>
          Read all Riddles
        </button>
      )}

      {role === "admin" && (
        <button onClick={() => handleSubmit("manage-players")}>
          Change Riddle
        </button>
      )}
    </>
  );
}
