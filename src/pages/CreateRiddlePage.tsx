import { useState, type FormEvent } from "react";

export default function CreateRiddlePage() {
  const [formData, setFormData] = useState({
    riddlename: "",
    question: "",
    correctAnswer: "",
    firstOption: "",
    secondOption: "",
    thirdOption: "",
    fourthOption: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted riddle:", formData);
  };

  return (
    <>
      <div>CreateRiddlePage</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="riddlename">Enter name of the riddle:</label>
          <input
            id="riddlename"
            name="riddlename"
            type="text"
            value={formData.riddlename}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="question">Enter the question:</label>
          <input
            id="question"
            name="question"
            type="text"
            value={formData.question}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="correctAnswer">Enter the correct answer:</label>
          <input
            id="correctAnswer"
            name="correctAnswer"
            type="text"
            value={formData.correctAnswer}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="firstOption">Enter the first option:</label>
          <input
            id="firstOption"
            name="firstOption"
            type="text"
            value={formData.firstOption}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="secondOption">Enter the second option:</label>
          <input
            id="secondOption"
            name="secondOption"
            type="text"
            value={formData.secondOption}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="thirdOption">Enter the third option:</label>
          <input
            id="thirdOption"
            name="thirdOption"
            type="text"
            value={formData.thirdOption}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="fourthOption">Enter the fourth option:</label>
          <input
            id="fourthOption"
            name="fourthOption"
            type="text"
            value={formData.fourthOption}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
