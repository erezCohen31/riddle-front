import { useState, type FormEvent } from "react";
import { addRiddle } from "../services/RiddlesServices";
import type { Riddle } from "../interface/RiddleType";
import type { FormRiddle } from "../interface/FormRiddleType.ts";

export default function CreateRiddlePage() {
  const [formData, setFormData] = useState<FormRiddle>({
    riddlename: "",
    question: "",
    correctAnswer: "",
    firstOption: "",
    secondOption: "",
    thirdOption: "",
    fourthOption: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        name: formData.riddlename,
        taskDescription: formData.question,
        correctAnswer: formData.correctAnswer,
        choices: [
          formData.firstOption,
          formData.secondOption,
          formData.thirdOption,
          formData.fourthOption,
        ],
      };

      await addRiddle(riddleData, token);

      alert("Riddle added successfully!");
      setFormData({
        riddlename: "",
        question: "",
        correctAnswer: "",
        firstOption: "",
        secondOption: "",
        thirdOption: "",
        fourthOption: "",
      });
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
          <label htmlFor="riddlename"></label>
          <input
            id="riddlename"
            name="riddlename"
            type="text"
            value={formData.riddlename}
            onChange={handleChange}
            placeholder="Enter name of the riddle"
            required
          />
        </div>
        <div>
          <label htmlFor="question"></label>
          <input
            id="question"
            name="question"
            type="text"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the question"
            required
          />
        </div>
        <div>
          <label htmlFor="correctAnswer"></label>
          <input
            id="correctAnswer"
            name="correctAnswer"
            type="text"
            value={formData.correctAnswer}
            onChange={handleChange}
            placeholder="Enter the correct answer"
            required
          />
        </div>
        <div>
          <label htmlFor="firstOption"></label>
          <input
            id="firstOption"
            name="firstOption"
            type="text"
            value={formData.firstOption}
            onChange={handleChange}
            placeholder="Enter the first option"
            required
          />
        </div>
        <div>
          <label htmlFor="secondOption"></label>
          <input
            id="secondOption"
            name="secondOption"
            type="text"
            value={formData.secondOption}
            onChange={handleChange}
            placeholder="Enter the second option"
            required
          />
        </div>
        <div>
          <label htmlFor="thirdOption"></label>
          <input
            id="thirdOption"
            name="thirdOption"
            type="text"
            value={formData.thirdOption}
            onChange={handleChange}
            placeholder="Enter the third option"
            required
          />
        </div>
        <div>
          <label htmlFor="fourthOption"></label>
          <input
            id="fourthOption"
            name="fourthOption"
            type="text"
            value={formData.fourthOption}
            onChange={handleChange}
            placeholder="Enter the fourth option"
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
