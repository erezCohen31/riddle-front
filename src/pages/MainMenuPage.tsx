import { useContext } from "react";
import { RoleContext } from "../contexts/Role.context";
import { useLocation, useNavigate } from "react-router";

export default function MainMenuPage() {
  const context = useContext(RoleContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;

  const { role } = context;

  function handleSubmit(destination: string) {
    navigate(`/${destination}`);
  }

  return (
    <>
      <div>MainMenuPage</div>
      <h2>Welcome {username}</h2>
      <button onClick={() => handleSubmit("play")}>To Play</button>
      <button onClick={() => handleSubmit("score")}>Scores</button>

      {(role === "user" || role === "admin") && (
        <button onClick={() => handleSubmit("manage-riddles")}>
          Manage Riddles
        </button>
      )}

      {role === "admin" && (
        <button onClick={() => handleSubmit("manage-players")}>
          Manage Players
        </button>
      )}
    </>
  );
}
