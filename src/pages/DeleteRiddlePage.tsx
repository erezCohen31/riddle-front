import { useEffect, useState, type FormEvent } from "react";
import { deleteRiddle } from "../services/RiddlesServices";
import { useNavigate } from "react-router";

export default function DeleteRiddlePage() {
  const [id, setID] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const idNumber = Number(id);

    setLoading(true);

    try {
      await deleteRiddle(idNumber, token || "");
      setDeleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (deleted) {
      const sendTime = async () => {
        setTimeout(() => navigate("/main-menu"), 3000);
      };
      sendTime();
    }
  }, [deleted]);

  if (deleted) {
    return (
      <div>
        <h2>Deleted</h2>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="riddleid"></label>
          <input
            id="riddleid"
            name="riddleid"
            type="text"
            value={id}
            onChange={handleChange}
            placeholder="Enter ID of the riddle"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Delete"}
        </button>
      </form>
    </>
  );
}
