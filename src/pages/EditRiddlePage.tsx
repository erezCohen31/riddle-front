import { useEffect, useState } from "react";
import type { Riddle } from "../interface/RiddleType";
import {
  getRiddleById,
  updateRiddle,
  deleteRiddle,
} from "../services/RiddlesServices";
import "../style/ReadRiddlePage.css";
import { useNavigate, useParams, useLocation } from "react-router";
import InputField from "../components/InputField.tsx";

export default function EditRiddlePage() {
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [fieldToEdit, setFieldToEdit] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const location = useLocation();
  const stateRiddle = location.state?.riddle;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fields = ["name", "taskDescription", "correctAnswer", "choices"];

  useEffect(() => {
    if (stateRiddle) {
      setRiddle(stateRiddle);
      setChoices(stateRiddle.choices || []);
    }
  }, [stateRiddle]);

  useEffect(() => {
    const fetchRiddle = async () => {
      if (riddle) return;
      if (!id) return;
      try {
        const data = await getRiddleById(Number(id), token || "");
        if (data) {
          setRiddle(data);
          setChoices(data.choices || []);
          setFieldToEdit("");
          setNewValue("");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRiddle();
  }, [id, token, riddle]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!riddle) return;

    let updated: Riddle;
    if (fieldToEdit === "choices") {
      updated = { ...riddle, choices };
    } else if (fieldToEdit && newValue) {
      updated = { ...riddle, [fieldToEdit]: newValue };
    } else {
      return;
    }

    try {
      const result = await updateRiddle(riddle.id, updated, token || "");
      setRiddle(result as Riddle);
      navigate("/main-menu");
    } catch (err) {
      console.error("Erreur update:", err);
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleDelete = async () => {
    if (!riddle) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this riddle?"
    );
    if (!confirmDelete) return;

    setLoadingDelete(true);
    try {
      await deleteRiddle(riddle.id, token || "");
      setDeleted(true);
      setTimeout(() => navigate("/main-menu"), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(false);
    }
  };

  if (deleted) {
    return (
      <div>
        <h2>Riddle deleted successfully!</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Edit Riddle Page</h2>

      {riddle ? (
        <div>
          <div className="read-riddle">
            <p>Name: {riddle.name}</p>
            <p>Description: {riddle.taskDescription}</p>
            <p>Answer: {riddle.correctAnswer}</p>
            <ul>
              {riddle.choices?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleUpdate}>
            <p>Choose the field to edit:</p>
            <div>
              {fields.map((field) => (
                <InputField
                  key={field}
                  value={field}
                  fieldToEdit={fieldToEdit}
                  setFieldToEdit={setFieldToEdit}
                />
              ))}
            </div>

            {fieldToEdit && fieldToEdit !== "choices" && (
              <div>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={`New value for ${fieldToEdit}`}
                />
              </div>
            )}

            {fieldToEdit === "choices" && (
              <div>
                <p>Modify the choices:</p>
                {choices.map((choice, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) =>
                        handleChoiceChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <button type="submit">Update</button>
          </form>

          <button
            onClick={handleDelete}
            disabled={loadingDelete}
            style={{
              marginTop: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            {loadingDelete ? "Deleting..." : "Delete Riddle"}
          </button>
        </div>
      ) : (
        <p>Loading riddle...</p>
      )}
    </div>
  );
}
