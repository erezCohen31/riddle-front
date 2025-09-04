import { useRef, useState } from "react";
import type { Riddle } from "../interface/RiddleType";
import { getRiddleById, updateRiddle } from "../services/RiddlesServices";
import "../style/ReadRiddlePage.css";
import { useNavigate } from "react-router";
import InputField from "../components/InputField.tsx";

export default function EditRiddlePage() {
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const idRiddleRef = useRef<HTMLInputElement>(null);
  const [fieldToEdit, setFieldToEdit] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fields = ["name", "taskDescription", "correctAnswer", "choices"];

  const handleFetch = async () => {
    try {
      if (idRiddleRef.current?.value) {
        const data = await getRiddleById(
          Number(idRiddleRef.current.value),
          token || ""
        );
        if (data) {
          setRiddle(data);
          setFieldToEdit("");
          setNewValue("");
          setChoices(data.choices || []);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <div>
      <h2>Edit Riddle Page</h2>

      <div>
        <input type="text" ref={idRiddleRef} placeholder="Enter ID" />
        <button type="button" onClick={handleFetch}>
          Sumbit
        </button>
      </div>

      {riddle && (
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
            <p>Chosse the field to edit :</p>

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
                <p>Modify the choices :</p>
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
        </div>
      )}
    </div>
  );
}
