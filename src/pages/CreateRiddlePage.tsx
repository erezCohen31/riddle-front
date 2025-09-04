import { useState, type FormEvent } from "react";
import { addRiddle } from "../services/RiddlesServices";
import type { Riddle } from "../interface/RiddleType";
import type { FormRiddle } from "../interface/FormRiddleType.ts";
import InputCreate from "../components/InputCreate.tsx";
import { useNavigate } from "react-router";

export default function CreateRiddlePage() {
  const [formData, setFormData] = useState<FormRiddle>({
    name: "",
    taskDescription: "",
    correctAnswer: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputs = [
    { name: "name", placeholder: "Enter name of the riddle" },
    { name: "taskDescription", placeholder: "Enter the riddle description" },
    { name: "correctAnswer", placeholder: "Enter the correct answer" },
    { name: "choice1", placeholder: "Enter first choice" },
    { name: "choice2", placeholder: "Enter second choice" },
    { name: "choice3", placeholder: "Enter third choice" },
    { name: "choice4", placeholder: "Enter fourth choice" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token") || "";

      const riddleData: Riddle = {
        id: Date.now(),
        name: formData.name,
        taskDescription: formData.taskDescription,
        correctAnswer: formData.correctAnswer,
        choices: [
          formData.choice1,
          formData.choice2,
          formData.choice3,
          formData.choice4,
        ],
      };

      await addRiddle(riddleData, token);

      setFormData({
        name: "",
        taskDescription: "",
        correctAnswer: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
      });
      navigate("/main-menu");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-game">
      <form onSubmit={handleSubmit}>
        <div>
          {inputs.map((input) => (
            <InputCreate
              key={input.name}
              name={input.name}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={input.placeholder}
            />
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
