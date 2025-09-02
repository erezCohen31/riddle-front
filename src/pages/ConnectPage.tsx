import { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { RoleContext } from "../contexts/Role.context";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const context = useContext(RoleContext);

  const { setRole } = context;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form.username === "admin" && form.password === "1234") {
      navigate("/main-menu", {
        state: { username: form.username },
      });
      setRole("admin");
    } else {
      alert("Login incorrect !");
    }
  };

  return (
    <div>
      <h1>Welcome to Riddle Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Enter your username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Enter your password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
