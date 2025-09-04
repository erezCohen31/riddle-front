import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { RoleContext } from "../contexts/Player.context";
import { createOrFindPlayer } from "../services/PlayerService";
import "../style/ConnectPage.css";

type FormState = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<FormState>({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setPlayer } = useContext(RoleContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { player, token } = await createOrFindPlayer(
        form.username,
        form.password
      );

      localStorage.setItem("token", token);
      setPlayer(player);
      navigate("/main-menu");
      setError("");
    } catch (err: any) {
      setError(err.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-game">
      <h1>Welcome to Riddle Game</h1>
      <form className="connect-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
